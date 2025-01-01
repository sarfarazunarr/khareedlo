import ConnectDB from "@/utils/ConnectDB";
import Product from "@/models/Product.model";
import { NextRequest, NextResponse } from "next/server";
import { Productschema } from "../route";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        await ConnectDB();
        const { slug } = await params;
        const productData = await Product.findOne({ slug });
        if (!productData) {
            return NextResponse.json({ message: "Product Not Found" }, { status: 404 })
        }
        return NextResponse.json({data: productData}, { status: 200 });
    } catch (error) {
        return NextResponse.json({error: error, message: "Something Went wrong! Try Again"}, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }){
    try {
        await ConnectDB();
        const {slug} = await params;
        const checkProduct = await Product.findOne({slug});
        if(!checkProduct) return NextResponse.json({message: 'Product Not Found', success: false}, {status: 404});


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
        const slug2 = data.get('slug');
        const rating = { rate, count };
        // Handle Error if any field has invalid data
        const { error } = Productschema.validate({ title, image, price, description, category, rating, discountedprice, stock, slug2 });
        if(error) return NextResponse.json({message: error.details[0].message, success: false}, {status: 400});
        

        // saving product
        const updateProduct = await Product.findOneAndUpdate(checkProduct._id, { title, image, price, description, category, rating, discountedprice, stock, slug2 });
        await updateProduct.save();
        return NextResponse.json({message: `Product updated successfully ${title}`, success: false}, {status: 200});
    } catch (error) {
        return NextResponse.json(error, {status: 500});
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        await ConnectDB();
        const { slug } = await params;
        const productData = await Product.findOne({ slug });
        if (!productData) {
            return NextResponse.json({ message: "Product Not Found" }, { status: 404 })
        }
        await Product.findOneAndDelete(productData._id);
        return NextResponse.json({message: "Product Deleted"}, { status: 200 });
    } catch (error) {
        return NextResponse.json({error: error, message: "Something Went wrong! Try Again"}, { status: 500 });
    }
}