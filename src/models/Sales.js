import mongoose from "mongoose";
import Product from "./Product";
import User from "./User";
/*
(Product name, photos and description, price, VAT amount, Weight, buyback price)
*/

const { Schema } = mongoose;

const salesSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  weight_to_sell: {
    type: Number,
    required: true,
  },
   orderID: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: "Pending",
    },
    paymentMode: {
        type: String,
        required: true,
    },
    payment_to_seller: {
        type: String,
        default: "Unresolved",
    },
    totalAmount: {
        type: Number,
        required: false,
    },
    seller_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    sales_id: {
        type: String,
        required: true,
    },
    seller_accountNumber: {
        type: String,
        required: true,
    },
    seller_name: {
        type: String,
        required: true,
    }
});


export default mongoose.models.Sales || mongoose.model("Sales", salesSchema);