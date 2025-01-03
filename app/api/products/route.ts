import { NextResponse, NextRequest } from "next/server";
import ConnectDB from "@/utils/ConnectDB";
import Product from "@/models/Product.model";


export async function POST(req: NextRequest) {
    try {
        await ConnectDB();
        const data = await req.formData();
        const title = data.get('title') as string;
        const image = data.get('image') as string;
        const price = Number(data.get('price')) as number;
        const description = data.get('description') as string;
        const category = data.get('category') as string;
        const rate = Number(data.get('rate')) as number;
        const count = Number(data.get('count')) as number;
        const discountedprice = Number(data.get('discountedprice')) as number;
        const stock = data.get('stock') as unknown as boolean;
        let slug = data.get('slug') as string;
        const rating = { rate, count };

        if (!slug) {
            // Generating slug from title
            slug = title?.toLowerCase().replace(/ /g, '-');
        }


        // Checking is slug already exist
        const checkSlug = await Product.find({ slug });
        if (checkSlug.length > 0) return NextResponse.json({ message: 'Slug already exists', success: false }, { status: 400 });

        // saving product
        const newProduct = new Product({ title, image, price, description, category, rating, discountedprice, stock, slug });
        await newProduct.save();
        return NextResponse.json({ message: `Product created successfully ${title}`, success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        await ConnectDB();
        const category = req.nextUrl.searchParams.get('category');
        const limit = req.nextUrl.searchParams.get('limit');

        if (category) {
            const products = await Product.find({ category }).limit(limit ? parseInt(limit) : 20);
            return NextResponse.json(products, { status: 200 });
        }
        const products = await Product.find({}).limit(limit ? parseInt(limit) : 20);
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}