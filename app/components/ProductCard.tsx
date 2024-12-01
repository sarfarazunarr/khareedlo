import { ProductCardType } from '@/types/ProductCard'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaStar } from 'react-icons/fa6'
import CartBtn from './CartBtn'

const ProductCard = ({ data, cartBtn = true }: { data: ProductCardType, cartBtn?: boolean }) => {
    const { image, price, rating, title, discountedprice } = data;
    return (
        <div className='w-full md:px-2 flex flex-col hover:scale-110 hover:shadow-xl bg-white shadow-sm shadow-gray-400 transition-all border-transparent border-2 hover:border-primary-800 group duration-300 ease-linear group'>

            <div className='flex flex-col'>
                <div className='flex justify-center items-center h-[150px] md:h-[200px]'> {/* Fixed height */}
                    <Image
                        width={100}
                        height={100}
                        src={image}
                        alt={title}
                        className='object-contain h-full group-hover:scale-125 transition-all duration-300 ease-in-out'
                    />
                </div>
                <div className='p-2 md:p-5 flex flex-col gap-y-1 md:gap-y-4'>
                    <div className='flex justify-start items-center gap-2'>
                        <div className='flex justify-start items-center'>
                            {Array.from({ length: 5 }, (_, index) => (
                                <FaStar
                                    key={index}
                                    className={
                                        index < rating.rate
                                            ? 'text-[#E9A426]'
                                            : 'text-[#A2A6B0]'
                                    }
                                />
                            ))}
                        </div>
                        <div className='text-[#A2A6B0] text-xs font-normal hover:underline cursor-pointer flex justify-start items-center gap-2'><span className='hidden md:block'>Reviews</span> ({rating.count})</div>
                    </div>
                    <Link href={`/products/${data.id}`} className='text-sm text-black uppercase hover:text-primary-500 transition-colors duration-150 cursor-pointer line-clamp-1'>{title}</Link>
                    <div>
                        {discountedprice && <h4 className='text-[14px] line-through text-gray-600'>{price}</h4>}
                        <h4 className='text-lg font-semibold text-black'>$.{discountedprice ? discountedprice : price}</h4>
                    </div>
                </div>
                {cartBtn && <CartBtn cartBtn={cartBtn} data={data} />}
            </div>
        </div>
    )
}

export default ProductCard
