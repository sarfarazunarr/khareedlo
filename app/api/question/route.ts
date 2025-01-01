import Product from "@/models/Product.model";
import Question from "@/models/Questions.model";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/utils/ConnectDB";

const QuestionSchema = Joi.object({
    productId: Joi.string().required(),
    name: Joi.string().required(),
    question: Joi.string().required(),
    answer: Joi.string().default(''),
    isAnswered: Joi.boolean().default(false)
})

export async function POST(req: NextRequest) {
    try {
        await ConnectDB();
        const data = await req.formData();
        const productId = data.get('productId')
        const name = data.get('name')
        const question = data.get('question')
        const { error } = QuestionSchema.validate({ productId, name, question });
        if (error) return NextResponse.json({ error: error.details }, { status: 400 });
        const product = await Product.findById(productId);
        if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        const newQuestion = new Question({
            productId,
            name,
            question
        });
        await newQuestion.save();
        return NextResponse.json(newQuestion, { status: 201 });

    } catch (e) {
        return NextResponse.json({ error: "Sorry! Question Posting Failed Try again!", data:e }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        await ConnectDB();
        const data = await req.formData();
        const questionId = data.get('questionId')
        const productId = data.get('productId')
        const name = data.get('name')
        const question = data.get('question')
        const { error } = QuestionSchema.validate({ productId, name, question });
        if (error) return NextResponse.json({ error: error.details }, { status: 400 });
        const product = await Product.findById(productId);
        if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

        const isQuestionExist = await Product.findById(questionId);
        if (!isQuestionExist) return NextResponse.json({ error: 'Question not found' }, { status: 404 });

        await Question.findByIdAndUpdate(questionId, {$set: {productId, name, question}});
        return NextResponse.json({message: "Question Updated!"}, { status: 200 });

    } catch (e) {
        return NextResponse.json({ error: "Sorry! Question Updating Failed Try again!", data:e }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await ConnectDB();
        const data = await req.formData();
        const questionId = data.get('questionId')

        await Question.findByIdAndDelete(questionId);
        return NextResponse.json({message: "Question Deleted!"}, { status: 200 });

    } catch (e) {
        return NextResponse.json({ error: "Sorry! Question Deleting Failed Try again!", data:e }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        await ConnectDB();
        const id = req.nextUrl.searchParams.get('id');

        const questions = await Question.find({productId: id});
        return NextResponse.json({data: questions}, { status: 200 });

    } catch (e) {
        return NextResponse.json({ error: "Sorry! Question fetching Failed Try again!", data:e }, { status: 500 });
    }
}