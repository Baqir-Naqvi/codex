import mongoose from "mongoose";
/*
(Product name, photos and description, price, VAT amount, Weight, buyback price)
*/

const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    photos: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    VAT: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    buybackPrice: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    currency: {
        type: String,
        default: "CZK",
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    price_per_gram:{
        type:Number,
    },
    product_code:{
        type:String,
    },
    actual_price:{
        type:Number,
    },
    percentage_margin:{
        type:Number
    },
    fixed_margin:{
        type:Number
    },
    type:{
        type:String
    },
    purity:{
        type:Number,
        default:100
    },
    metal:{
        type:String
    }
});

export default mongoose.models.Product || mongoose.model("Product", productSchema);
