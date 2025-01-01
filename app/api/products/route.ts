import { NextResponse, NextRequest } from "next/server";
import ConnectDB from "@/utils/ConnectDB";
import Product from "@/models/Product.model";
import Joi from "joi";

export const Productschema = Joi.object({
    title: Joi.string().required(),
    image: Joi.string().uri().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    rating: Joi.object({
        rate: Joi.number().max(5.0).required(),
        count: Joi.number().required()
    }),
    discountedprice: Joi.number().required(),
    stock: Joi.boolean().required(),
    slug: Joi.string().required()
});

export async function POST(req: NextRequest){
    try {
        await ConnectDB();
        const data = await req.formData();
        const title = data.get('title');
        const image = data.get('image');
        const price = data.get('price');
        const description = data.get('description');
        const category = data.get('category');
        const rate = data.get('rate');
        const count = data.get('count');
        const discountedprice = data.get('discountedprice');
        const stock = data.get('stock');
        const slug = data.get('slug');
        const rating = { rate, count };
        // Handle Error if any field has invalid data
        const { error } = Productschema.validate({ title, image, price, description, category, rating, discountedprice, stock, slug });
        if(error) return NextResponse.json({message: error.details[0].message, success: false}, {status: 400});

        // Checking is slug already exist
        const checkSlug = await Product.find({slug});
        if(checkSlug.length > 0) return NextResponse.json({message: 'Slug already exists', success: false}, {status: 400});

        // saving product
        const newProduct = new Product({ title, image, price, description, category, rating, discountedprice, stock, slug });
        await newProduct.save();
        return NextResponse.json({message: `Product created successfully ${title}`, success: false}, {status: 200});
    } catch (error) {
        return NextResponse.json(error, {status: 500});
    }
}

export async function GET(req: NextRequest){
    try {
        await ConnectDB();
        const products = await Product.find();
        return NextResponse.json(products, {status: 200});
    } catch (error) {
        return NextResponse.json(error, {status: 500});
    }
}