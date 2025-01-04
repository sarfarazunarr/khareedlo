import mongoose, { CallbackError } from 'mongoose'
import Product from './Product.model';

const OrderSchema = new mongoose.Schema({
    order_id: {
        type: String, unique: true
    },
    user_id: {
        type: String
    },
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


OrderSchema.pre('save', async function (next) {
    try {
      let total = 0;
  
      for (const item of this.products) {
        const product = await Product.findById(item.productId);
  
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found.`);
        }
  
        total += product.price * item.qty;
      }
  
      this.amount = total;
      next();
    } catch (error) {
      next(error as CallbackError);
    }
  });
  

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;