import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
//get purchases of all users
export async function GET(req) {
    /*
    1- get all users
    2- destruct each user and get inventory of each user
    3- also map user id , user firstName and lastName and uniqueCode
    */
    const { searchParams } = new URL(req.url);
    const isEshop = searchParams.get("isEshop") === "true" ? true : false;
    await dbConnect();
    const users = await User.find({}).select("inventory firstName lastName uniqueCode").exec();
    const combinedAndFilteredInventory = users.flatMap((user) => {
        return user.inventory.flatMap((item) => {
            if (item.isEshop == isEshop
            ) {
                return {
                    ...item,
                    userId: user._id,
                    fullName: user.firstName + " " + user.lastName,
                    uniqueCode: user.uniqueCode,
                };
            }
            return [];
        });
    });
    return Response.json({ status: 200, data: combinedAndFilteredInventory });

}


//update purchase status , payment status and payment mode 
//depending on the request body

export async function PUT(req) {
    const { userId, status, paymentStatus, paymentMode, orderID, _id } = await req.json();
    const { searchParams } = new URL(req.url);
    const isEshop = searchParams.get("isEshop") === "true" ? true : false;
    await dbConnect();
    const user = await User.findById(userId);
    if (!user) {
        return Response.json({ status: 404, message: "User not found" });
    }

    const item_index = user.inventory.findIndex((item) => item._id == _id && item.orderID == orderID && item.isEshop == isEshop);
    if (item_index === -1) {
        return Response.json({ status: 404, message: "Item not found" });
    }

    user.inventory[item_index].status = status;
    user.inventory[item_index].paymentStatus = paymentStatus;
    user.inventory[item_index].paymentMode = paymentMode;



    user.markModified('inventory');
    await user.save();
    return Response.json({ status: 200, message: "Updated successfully" });
}
//delete purchase