import React, { useEffect, useState } from 'react'
interface IQuestion {
    productId: string,
    name: string,
    question: string,
    answer: string,
    isAnswered: boolean,
}
const Questions = ({productId}: {productId: string}) => {
    const [questions, setQuestions] = useState<IQuestion[]>()
    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`/api/question?product=${productId}`);
            const data = await res.json();
            setQuestions(data.data);
        }
        getData();
    }, [productId])
    return (
        <div className='flex flex-col col-span-full md:col-span-4 justify-start gap-5'>
            <h3 className='text-3xl font-semibold text-black'>Questions</h3>
            {questions?.length === 0 && <p className='text-gray-500'>No questions yet</p>}
            {questions?.map((question, index) => (
                <div key={index} className="conversation flex flex-col justify-start items-start bg-blue-50 rounded-md p-5 pl-10">
                
                <div className="review flex justify-start items-center gap-2">
                    <p className='text-gray-600'>{question.name}: <span className='text-black'>{question.question}</span></p>
                </div>

                {question.isAnswered && <div className="reply p-2 px-5 my-3 ml-2 bg-white flex flex-col justify-start">
                    <p className='text-gray-600 text-sm'>{question.answer}</p>
                </div>}
            </div>
            ))}
            
        </div>
    )
}

export default Questions
