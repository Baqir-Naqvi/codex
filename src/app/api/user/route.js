import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Product from "@/models/Product";

export async function GET(req) {
    //get user by id
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
  await dbConnect();
  
  try {
    const users = await User.find({ _id: id });
    if (!users) {
      return Response.json({ status: 400, message: "User not found" });
    }
    // let cart= users;
    const { cart } = users[0];
    const cartProducts = await Product.find({ _id: { $in: cart } });
    users[0].cart=cartProducts
    return Response.json({ status: 200, data: users });
  } catch (e) {
    console.error(e);
    return Response.json({ status: 400, message: "Could not fetch User" });
  }
}

export async function POST(req) {
  const request = await req.json();

  await dbConnect();

  try {
    const userExists = await User.findOne({ email: request.email });
    if (userExists) {
      return Response.json({ status: 400, message: "User already exists" });
    }
    const user = await User.create(request);

    return Response.json({ status: 200, data: user });
  } catch (e) {
    console.error(e);
    return Response.json({ status: 400, message: e.message });
  }
}


// update password method
export async function PUT(req) {
  const request = await req.json();
  if (!request.email || !request.password) {
    return Response.json({ status: 400, message: "Invalid request" });
  }
  await dbConnect();
  try {
    const userExists = await
      User.findOneAndUpdate({
        email: request.email,
      }, {
        password: request.password
      });
    if (!userExists) {
      return Response.json({ status: 400, message: "User not found" });
    }
    return Response.json({ status: 200 });
  }
  catch (e) {
    console.error(e);
    return Response.json({ status: 400, message: e.message });
  }
}
