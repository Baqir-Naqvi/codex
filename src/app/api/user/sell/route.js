import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
//function to handle sell of a single product
//inventory is an array of objects with each object containing the product details

export async function PUT(req) {
  const { userId, productId, weight, sellingPrice, orderID } = await req.json();
  await dbConnect();
  try {
    const user = await User.findById(userId);
    if (!user) {
      return Response.json({ status: 404, message: "User not found" });
    }
    let inventory = user.inventory;
    const productIndex = inventory.findIndex(
      (product) => product._id == productId && product.orderID == orderID
    );
    if (productIndex === -1) {
      return Response.json({ status: 400, message: "Product not found" });
    }
    const product = inventory[productIndex];
    if (product.purchasedWeight < weight) {
      return Response.json({
        status: 400,
        message: "Insufficient product weight",
      });
    }
    inventory[productIndex].purchasedWeight -= weight;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { inventory },
      { new: true }
    );
    if (!updatedUser) {
      return Response.json({
        status: 400,
        message: "Failed to update user inventory",
      });
    }

    return Response.json({
      status: 200,
      message: "Product Listed for selling",
    });
  } catch (e) {
    console.error(e);
    return Response.json({ status: 400, message: e.message });
  }
}
