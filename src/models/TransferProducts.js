import mongoose from "mongoose";
/*
(Product name, photos and description, price, VAT amount, Weight, buyback price)
*/

const { Schema } = mongoose;

const TransferproductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    photos: {
        type: [String],
        required: true,
    },
    productId: {
        type: String,
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
    buybackPrice: {
        type: Number,
        required: true,
    },
    offerPrice: {
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
    transferID: {
        type: String,
        required: true,
    },
    transferStatus: {
        type: String,
        required: true,
    },
    transferDate: {
        type: Date,
        required: true,
    },
    transferWeight: {
        type: Number,
        required: true,
    },
    transferTo: {
        type: Number,
        required: true,
    },
    transferFrom: {
        type: Number,
        required: true,
    },
    transferee: {
        type: String,
        required: true,
    },
    receivedBy: {
        type: String,
        required: true,
    },
});

export default mongoose.models.TransferProduct || mongoose.model("TransferProduct", TransferproductSchema);
