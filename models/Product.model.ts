import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    rating: { rate: Number, count: Number },
    discountedprice: Number,
    stock: { type: Boolean, required: true },
    slug: { type: String, required: true },
})

const Product  = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;