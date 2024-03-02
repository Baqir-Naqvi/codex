import mongoose from "mongoose";

const { Schema } = mongoose;

const EmailVerificationSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.EmailVerification ||
    mongoose.model("EmailVerification", EmailVerificationSchema);