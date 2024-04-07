import dbConnect from "@/lib/dbConnect";
import Sales from "@/models/Sales";
import MarketPlace from "@/models/MarketPlace";
import User from "@/models/User";
//get sales of all users from Sales
export async function GET(req) {
    /*
    1- get sales of all users from Sales collection
    */
    const { searchParams } = new URL(req.url);
    const isEshop = searchParams.get("isEshop") === "true" ? true : false;
    await dbConnect();
    let sales;
    if (isEshop)
        sales = await MarketPlace.find({}).exec();
    else {
        //each sales object has seller_id, find the user with that id in Users collection and get inventory
        const sales_record= await Sales.find({}).exec();
        //use promise.all to get all user's inventory
        sales = await Promise.all(sales_record.map(async (sale) => {
            const user = await User.findOne({ _id: sale.seller_id }).exec();
            if (!user) {
                return { ...sale._doc, inventory: [] };
            }
            //ignore products with status pending
            const accountBalance = user.inventory.reduce((acc, product) => {
                if (product.status !== "pending" && product.isEshop == false) {
                    return acc + product.purchasedQuantity * product.price;
                }
                return acc;
            }, 0);

            const purchasedWeight = user.inventory.reduce((acc, product) => {
                if (product.status !== "pending" && product.isEshop == false) {
                    return acc + product.purchasedWeight * product.purchasedQuantity;
                }
                return acc;
            }  ,0);
            return {
                ...sale._doc, balance: accountBalance, account_weight: purchasedWeight}
        }));

    }
    return Response.json({ status: 200, data: sales });

}


//update purchase status , payment status and payment mode of user sale

export async function PUT(req) {
    const { product, buyer_id, status, order_status, payment_to_seller, payment_status, _id, marketplace_id } = await req.json();
    const { searchParams } = new URL(req.url);
    const isEshop = searchParams.get("isEshop") === "true" ? true : false;
    await dbConnect();
    if (isEshop) {
        const sales = await MarketPlace.findOneAndUpdate(
            { _id },
            {
                order_status,
                payment_to_seller,
                payment_status
            },
            { new: true }
        ).exec();

        if (!sales) {
            return Response.json({ statuy: 400, message: "No sales found" });
        }

        //1- find user in Users collection who is purchasing the product i.e buyer_id
        //2- find the product in user's inventory i.e marketplace_id, _id and orderID ,product_id
        //3- update the status of the product in user's inventory i.e purchased, payment_status, payment_to_seller

        const user = await User.findOne({ _id: buyer_id }).exec();
        if (!user) {
            console.log("No user found");
            return Response.json({ status: 400, message: "No user found" });
        }
        //order_status
        // let new_inventory = user.inventory;
        // let productToUpdate = new_inventory.find((_product) => _product.marketplace_id === marketplace_id
        //     && _product._id === product);
        // if (!productToUpdate) {
        //     return Response.json({ status: 400, message: "No product found in user's inventory" });
        // }
        // productToUpdate.status = order_status ? order_status : productToUpdate.status;
        // productToUpdate.payment_status = payment_status ? payment_status : productToUpdate.payment_status;
        // productToUpdate.payment_to_seller = payment_to_seller ? payment_to_seller : productToUpdate.payment_to_seller;
        // console.log("productToUpdate", productToUpdate);
        // user.inventory = new_inventory;
        // await user.save();
        let inventoryIndex = user.inventory.findIndex(_product =>
            _product.marketplace_id === marketplace_id && _product._id === product
        );

        if (inventoryIndex === -1) {
            return { status: 400, body: "No product found in user's inventory" };
        }

        // Update product details
        user.inventory[inventoryIndex].status = order_status || user.inventory[inventoryIndex].status;
        user.inventory[inventoryIndex].payment_status = payment_status || user.inventory[inventoryIndex].payment_status;
        user.inventory[inventoryIndex].payment_to_seller = payment_to_seller || user.inventory[inventoryIndex].payment_to_seller;

        // Mark inventory as modified
        user.markModified('inventory');
        await user.save();



        return Response.json({ status: 200, message: "Updated successfully" });
    }
    else {
        const sales = await Sales.findOneAndUpdate(
            { _id },
            {
                status,
                payment_to_seller
            },
            { new: true }
        ).exec();

        if (!sales) {
            return Response.json({ status: 400, message: "No sales found" });
        }
    }

    return Response.json({ status: 200, message: "Updated successfully" });
}