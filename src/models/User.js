import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        default: "",
    },
    firstName: {
        type: String,
        default: "",
    },
    lastName: {
        type: String,
        default: "",

    },
    address: {
        type: String,
        default: "",

    },
    phoneNumber: {
        type: String,
        default: "",

    },
    role: {
        type: String,
        required: false,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    IDFront: {
        type: String,
        required: false,
        default: "",
    },
    IDBack: {
        type: String,
        required: false,
        default: "",
    },
    accountNumber: {
        type: String,
        required: false,
        default: "",
    },
    IBAN: {
        type: String,
        required: false,
        default: "",
    },
    swiftCode: {
        type: String,
        required: false,
        default: "",
    },
    bankName: {
        type: String,
        required: false,
        default: "",
    },
    limitAccess: {
        type: Boolean,
        default: true,

    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    purchaseHistory: {
        type: Array,
        required: false,
        default: [],
    },
    transferHistory: {
        type: Array,
        required: false,
        default: [],
    },
    cart: {
        type: Array,
        required: false,
        default: [],
    },
    balance: {
        type: Number,
        required: false,
        default: 0,
    },
    uniqueCode: {
        type: Number,
        required: true,
    },
    

    });

export default mongoose.models.User || mongoose.model("User", userSchema);