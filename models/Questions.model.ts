import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    name: {
        type: String,
        requried: true
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String
    },
    isAnswered: {
        type: Boolean,
        default: false
    }
})

const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema);
export default Question;