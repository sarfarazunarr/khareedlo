import Question from "@/models/Questions.model";
import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/utils/ConnectDB";

export async function PUT(req: NextRequest) {
    try {
        await ConnectDB();
        const data = await req.formData();
        const questionId = data.get('questionId');
        const answer = data.get('answer');

        if (!questionId || !answer) return NextResponse.json({ message: "Question ID and Answer is required!" }, { status: 400 });
        const questionExist = await Question.findById(questionId);
        if (!questionExist) return NextResponse.json({ message: "Question not found!" }, { status: 404 });
        await Question.findByIdAndUpdate(questionId, {
            $set: {
                answer: answer,
                isAnswered: true
            }
        });
        return NextResponse.json({ message: "Answer posted successfully!" }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: "Sorry! Failed to POST answer! Try again!", data: e }, { status: 500 });
    }
}