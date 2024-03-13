import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Product from "@/models/Product";
import TransferProduct from "@/models/TransferProducts";
import ShortUniqueId from "short-unique-id";

//initiate a transfer request
//
export async function PUT(req) {
  const request = await req.json();
  const { searchParams } = new URL(req.url);
  const receiverID = searchParams.get("receiverID");
  const {
    userId,
    productId,
    weight,
    price,
    orderNumber,
    product,
    userAccountID,
  } = request;
  if (
    !userId ||
    !productId ||
    !weight ||
    !price ||
    !orderNumber ||
    !receiverID
  ) {
    return Response.json({ status: 400, message: "Invalid request" });
  }
  const transferID = new ShortUniqueId({ length: 14 }).rnd();
  await dbConnect();
  try {
    //find user that has uniqueCode same as receiverID
    const receiver = await User.findOne({
      uniqueCode: receiverID,
    });
    if (!receiver) {
      return Response.json({ status: 400, message: "User not found" });
    }
    //check whether receiver is full verified
    if (!receiver.isVerified || receiver.limitAccess) {
      return Response.json({
        status: 400,
        message: "Receiver is not verified",
      });
    }
    const { photos, name, description, VAT, buybackPrice } = product;

    //deduct the weight from the user's inventory
    const sender = await User.findById(userId);
    if (!sender) {
      return Response.json({ status: 400, message: "User not found" });
    }
    let inventory = sender.inventory;
    const productIndex = inventory.findIndex(
      (product) => product._id == productId && product.orderID == orderNumber
    );
    if (productIndex === -1) {
      return Response.json({ status: 400, message: "Product not found" });
    }
    if (inventory[productIndex].purchasedWeight < weight) {
      return Response.json({
        status: 400,
        message: "Insufficient product weight",
      });
    }

    inventory[productIndex].purchasedWeight -= weight;
    const updated = await User.findByIdAndUpdate(
      userId,
      { inventory },
      { new: true }
    );
    if (!updated) {
      return Response.json({
        status: 400,
        message: "Failed to update user inventory",
      });
    }


    //create a transfer request in TransferProduct model
    const transfer = new TransferProduct({
      productId,
      name,
      photos,
      description,
      VAT,
      weight: weight,
      buybackPrice,
      price,
      orderNumber,
      transferID,
      transferStatus: "pending",
      transferDate: new Date(),
      transferWeight: weight,
      transferTo: receiverID,
      transferFrom: userAccountID,
      transferee: userId,
      receivedBy: receiver._id,
      offerPrice: price,
    });

    await transfer.save();



    return Response.json({
      status: 200,
      message: "Transfer request initiated",
    });
  } catch (e) {
    console.error(e);
    return Response.json({ status: 400, message: e.message });
  }
}


//get all transfer requests for a user who is a receiver
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const receiverID = searchParams.get("receiverID");
  if (!receiverID) {
    return Response.json({ status: 400, message: "Invalid request" });
  }
  await dbConnect();
  try {
    const transfers = await TransferProduct.find({
      receivedBy: receiverID,
    }).sort({ transferDate: -1 });
    return Response.json({ status: 200, data: transfers });
  } catch (e) {
    console.error(e);
    return Response.json({ status: 400, message: e.message });
  }
}
