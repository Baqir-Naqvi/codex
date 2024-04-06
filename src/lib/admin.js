import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Product from "@/models/Product";
import EmailVerification from "@/models/EmailVerification";
import MarketPlace from "@/models/MarketPlace";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Sales from "@/models/Sales";
import { getUserid } from "@/lib"


export const getProducts = async () => {
    await dbConnect();
    const products = await Product.find();
    const data = JSON.parse(JSON.stringify(products));
    return {
        status: 200,
        data: data,
    }
}

export const getProduct = async (id) => {
    await dbConnect();
    const product = await Product.findById(id);
    const data = JSON.parse(JSON.stringify(product));
    return {
        status: 200,
        data: data,
    }
}