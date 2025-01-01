import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "Products",
    },
    name: {
        type: String,
        required: [true, "Please provide your name"],
    },
    rate: {
        type: Number,
        required: [true, "Please provide a rating"],
    },
    comment: {
        type: String,
        required: [true, "Please provide a comment"],
    },
})

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);
export default Review;