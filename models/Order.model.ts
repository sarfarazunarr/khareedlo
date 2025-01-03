import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    customerName: {
        type: String, required: true
    },
    customerEmail: {
        type: String, required: true
    },
    customerPhone: {
        type: String, required: true
    },
    deliveryAddress: {
        type: String, required: true
    },
    billingAddress: {
        type: String, required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                ref: "Products"
            },
            qty: {
                type: Number,
                default: 1,
                min: 1
            }
        }

    ],
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    paymentStatus: {
        type: String,
        enum: ["unpaid", "paid", "partial paid"],
        default: "unpaid"
    },
    orderStatus: {
        type: String,
        enum: ["pending", "processing", "deliverying", "recieved"],
        default: "pending"
    },
    paymentMethod: {
        type: String,
        enum: ["cod", "stripe", "onelink"],
        default: "cod"
    }
})

const Order = mongoose.models.Order || mongoose.model("Orders", OrderSchema);

export default Order;