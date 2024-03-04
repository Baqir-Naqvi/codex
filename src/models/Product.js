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
});

export default mongoose.models.Product || mongoose.model("Product", productSchema);
