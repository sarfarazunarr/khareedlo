import ConnectDB from "@/utils/ConnectDB";
import { NextRequest, NextResponse } from "next/server";
import Review from "@/models/Review.model";
import Product from "@/models/Product.model";

function calculateAverageRating(ratings: number[]): number {
  if (ratings.length === 0) {
    return 0;
  }

  const sum = ratings.reduce((acc, current) => acc + current, 0);

  const averageRating = sum / ratings.length;
  return Math.round(averageRating * 10) / 10;
}


export async function POST(req: NextRequest) {
  try {
    await ConnectDB();
    const data = await req.formData();
    const productId = data.get('productId');
    const name = data.get('name');
    const newRating = data.get('rate'); // Convert to float
    const comment = data.get('comment');

   

    const findProduct = await Product.findById(productId);
    if (!findProduct) return NextResponse.json({ error: "Product Not Found" }, { status: 404 })

    const newReview = new Review({ productId, name, rate: newRating, comment });
    await newReview.save();

    // Get all reviews for the product
    const reviews = await Review.find({ productId });

    // Calculate the average rating
    const ratings = reviews.map(review => review.rate);
    const averageRating = calculateAverageRating(ratings);

    // Update the product rating
    const updatedProduct = await Product.findByIdAndUpdate(findProduct._id, {
      $set: {
        rating: {
          rate: averageRating, // Update with new average rating
          count: reviews.length + 1
        }
      }
    });
    await updatedProduct.save();

    return NextResponse.json({ message: "Thanks For Kind Review!", success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function GET(req: NextRequest){
  try {
    await ConnectDB();
    const productId = req.nextUrl.searchParams.get('product');
    if(!productId) return NextResponse.json({message: "Please provide product id"}, {status: 400});
    const isProductExist = await Product.findById(productId);
    if(!isProductExist) return NextResponse.json({message: "Product not found"}, {status: 404});
    const reviews = await Review.find({productId});
    return NextResponse.json({reviews}, {status: 200});
  } catch (error) {
    return NextResponse.json(error, {status: 500});
  }
}