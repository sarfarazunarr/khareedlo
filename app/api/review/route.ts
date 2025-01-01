import ConnectDB from "@/utils/ConnectDB";
import { NextRequest, NextResponse } from "next/server";
import Review from "@/models/Review.model";
import Joi from "joi";
import Product from "@/models/Product.model";

const ReviewSchema = Joi.object({
    productId: Joi.string().required(),
    name: Joi.string().required(),
    newRating: Joi.number().min(0).max(5).required(),
    comment: Joi.string().required(),
})

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
  
      const { error } = ReviewSchema.validate({ productId, name, newRating, comment });
      if (error) { 
        return NextResponse.json({ error: error.details[0].message }, { status: 400 }) 
      }
  
      const findProduct = await Product.findById(productId);
      if (!findProduct) return NextResponse.json({ error: "Product Not Found" }, { status: 404 })
  
      const newReview = new Review({ productId, name, rating: newRating, comment });
      await newReview.save();
  
      // Get all reviews for the product
      const reviews = await Review.find({ productId });
  
      // Calculate the average rating
      const ratings = reviews.map(review => review.rating);
      const averageRating = calculateAverageRating(ratings);
      console.log(averageRating);
  
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