"use client";
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { BsStarFill } from 'react-icons/bs'

interface IReview {
    productId: string,
    name: string,
    rate: number,
    comment: string,
}

const Review = ({ productId }: { productId: string }) => {
    const [reviews, setReviews] = useState<IReview[]>()
    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`/api/review?product=${productId}`);
            const data = await res.json();
            setReviews(data.reviews);
        }
        getData();
    }, [productId])

    return (
        <div className='flex flex-col col-span-full md:col-span-4 justify-start gap-5'>
            <h3 className='text-3xl font-semibold text-black'>Reviews</h3>
            <div className="flex flex-col justify-start items-start bg-blue-50 rounded-md p-2">
                {reviews?.length === 0 && <p className='text-gray-500'>No reviews yet</p>}
                {reviews?.map((review, index) => {
                    return (
                        <div key={index} className="review bg-white p-5 flex flex-col justify-start gap-2">
                            <div className='flex justify-start items-center gap-2'>
                                <Image src="/user.jpg" width={50} height={50} className='rounded-full' alt='user' />
                                <div className="flex flex-col justify-start items-center">
                                    <p className='text-gray-600'>{review.name}</p>
                                    <div className={`${review.rate >= 4 ? 'text-yellow-500' : 'text-gray-500'} flex items-center gap-1`}>
                                        <BsStarFill />
                                        <BsStarFill />
                                        <BsStarFill />
                                        <BsStarFill />
                                        <BsStarFill />
                                    </div>
                                </div>
                            </div>
                            <p className='text-gray-800 pl-5 text-sm'>{review.comment}</p>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default Review
