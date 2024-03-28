import mongoose from "mongoose";
import Product from "./Product";
import User from "./User";

const { Schema } = mongoose;

const marketPlaceSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    margin: {
        type: Number,
        required: true,
    },
    orderID: {
        type: String,
        required: true,
    },
    listedOn: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    seller_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    seller_accountNumber: {
        type: Number,
        required: true,
    },
    buyer_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false,

    },
    buyer_accountNumber: {
        type: Number,
        required: false,
    },
    buyer_Name: {
        type: String,
        required: false,
    },
    payment_status: {
        type: String,
        default: "Unpaid",
    },
    transfer_status: {
        type: String,
        default: "-",
    },
    order_status: {
        type: String,
        default: "Unresolved",
    },
    payment_to_seller: {
        type: String,
        default: "Unresolved",
    },
    marketplace_id: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    });

export default mongoose.models.MarketPlace || mongoose.model("MarketPlace", marketPlaceSchema);