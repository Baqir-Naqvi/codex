import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Sales from "@/models/Sales";
import ShortUniqueId from "short-unique-id";
import MarketPlace from "@/models/MarketPlace";

//function to handle selling of products
//inventory is an array of objects with each object containing the product details

// export async function PUT(req) {
//   // const { userId, productId, weight_to_sell, sellingPrice, orderID } = await req.json();
//   const { userId, products_to_sell ,type} = await req.json();
//   const salesID = new ShortUniqueId({ length: 14 }).rnd();

//   await dbConnect();
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return Response.json({ status: 404, message: "User not found" });
//     }
//     let inventory = user.inventory;
//     if (!inventory || inventory.length === 0) {
//       return Response.json({ status: 200, message: "Inventory is empty" });
//     }
//     {
//       products_to_sell.map(async (product_to_sell) => {
//         const productIndex = inventory.findIndex(
//           (product) => product._id == product_to_sell._id && product.orderID == product_to_sell.orderID
//         );
//         if (productIndex === -1) {
//           return Response.json({ status: 400, message: "Product not found" });
//         }
//         const product = inventory[productIndex];
//         if (product.purchasedWeight < product_to_sell.weight_to_sell) {
//           return Response.json({
//             status: 400,
//             message: "Insufficient product weight",
//           });
//         }

//         inventory[productIndex].purchasedWeight -= product_to_sell.weight_to_sell;
//         inventory[productIndex].quantity -= product_to_sell.quantity_to_sell;
//           //if quantity is 0, remove the product from the inventory
//           if (inventory[productIndex].quantity === 0) {
//             inventory = inventory.filter(
//               (product) => product._id != product_to_sell._id && product.orderID != product_to_sell.orderID
//             );
//           }



//         //if type == marketplace,create a new marketPlace object for each product
//         if (type === "marketplace") {
//           const marketPlace = new MarketPlace({
//             product: product._id,
//             weight: product_to_sell.weight,
//             quantity: product_to_sell.quantity_to_sell,
//             // price: product_to_sell.sellingPrice, ((product.price + (product.price * product.margin) / 100)/rate).toFixed(2)
//             price: ((product_to_sell.price + (product_to_sell.price * product_to_sell.margin) / 100)).toFixed(2),
//             margin: product_to_sell.margin,
//             orderID: product_to_sell.orderID,
//             seller_id: userId,
//             seller_accountNumber: user.uniqueCode,
//             marketplace_id: salesID,

//           });
//           await marketPlace.save();
//         }
//         else{
//           //this will be sell immediately

//           //create a new sales object for each product
//           const sales = new Sales({
//             product: product._id,
//             weight_to_sell: product_to_sell.weight_to_sell,
//             orderID: product_to_sell.orderID,
//             paymentMode: product_to_sell.paymentMode,
//             totalAmount: product_to_sell.price * product_to_sell.weight_to_sell,
//             seller_id: userId,
//             sales_id: salesID,
//             seller_accountNumber: user.accountNumber,
//             seller_name: user.firstName + " " + user.lastName,
//           });

//           await sales.save();
//         }

//       });
//     }
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { inventory },
//       { new: true }
//     );



//     if (!updatedUser) {
//       return Response.json({
//         status: 400,
//         message: "Failed to update user inventory",
//       });
//     }



//     return Response.json({
//       status: 200,
//       message: "Product Listed for selling",
//     });
//   } catch (e) {
//     console.error(e);
//     return Response.json({ status: 400, message: e.message });
//   }
// }




export async function PUT(req) {
  await dbConnect();

  try {
    const { userId, products_to_sell, type } = await req.json();
    if (!products_to_sell || products_to_sell.length === 0) {
      // return { status: 400, body: "No products to sell" };
      return Response.json({ status: 400, message: "No products to sell" });
    }

    const user = await User.findById(userId);
    if (!user) {
      // return { status: 404, body: "User not found" };
      return Response.json({ status: 404, message: "User not found" });
    }

    if (!user.inventory || user.inventory.length === 0) {
      // return { status: 200, body: "Inventory is empty" };
      return Response.json({ status: 200, message: "Inventory is empty" });
    }

    const salesID = new ShortUniqueId({ length: 14 }).randomUUID();
    let inventory = user.inventory;

    const operations = products_to_sell.map(async (product_to_sell) => {
      const productIndex = inventory.findIndex(
        (product) => product._id.toString() === product_to_sell._id && product.orderID === product_to_sell.orderID
      );
      if (productIndex === -1) {
        throw new Error("Product not found in inventory");
      }

      const product = inventory[productIndex];
      if (product.purchasedWeight < product_to_sell.weight_to_sell || product.quantity < product_to_sell.quantity_to_sell) {
        throw new Error("Insufficient product quantity or weight");
      }
      if (type !== "marketplace")
        inventory[productIndex].purchasedWeight -= product_to_sell.weight_to_sell;
      inventory[productIndex].quantity -= product_to_sell.quantity_to_sell;
      inventory[productIndex].purchasedQuantity -= product_to_sell.quantity_to_sell;

      if (inventory[productIndex].quantity === 0) {
        inventory.splice(productIndex, 1); // Remove the product from the inventory
      }

      if (type === "marketplace") {
        const marketPlace = new MarketPlace({
          product: product._id,
          weight: product_to_sell.weight_to_sell,
          quantity: product_to_sell.quantity_to_sell,
          price: ((product_to_sell.price + (product_to_sell.price * product_to_sell.margin) / 100)).toFixed(2),
          margin: product_to_sell.margin,
          orderID: product_to_sell.orderID,
          seller_id: userId,
          seller_accountNumber: user.uniqueCode,
          marketplace_id: salesID,
        });
        return marketPlace.save();
      } else {
        const sales = new Sales({
          product: product._id,
          weight_to_sell: product_to_sell.weight_to_sell,
          orderID: product_to_sell.orderID,
          paymentMode: product_to_sell.paymentMode,
          totalAmount: product_to_sell.price * product_to_sell.weight_to_sell,
          seller_id: userId,
          sales_id: salesID,
          seller_accountNumber: user.accountNumber,
          seller_name: user.firstName + " " + user.lastName,
        });
        return sales.save();
      }
    });

    await Promise.all(operations);

    await User.findByIdAndUpdate(userId, { inventory }, { new: true });

    return Response.json({ status: 200, message: "Product(s) listed for selling successfully" });
  } catch (e) {
    console.error(e);
    if (e.message === "Product not found in inventory" || e.message === "Insufficient product quantity or weight") {
      return Response.json({ status: 400, message: e.message });
    }
    return Response.json({ status: 500, message: "Internal server error" });
  }
}