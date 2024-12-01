"use client";
import ProductCard from '@/app/components/ProductCard';
import useCartStore from '@/store/cartstore';
import { CartProduct, ProductCardType } from '@/types/ProductCard';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { BsStarFill } from 'react-icons/bs'


const ProductPage = ({ params }: { params: { slug: string } }) => {

    const [tab, setTab] = useState("about");
    const [data, setData] = useState<ProductCardType>()
    const [data2, setData2] = useState<ProductCardType[]>()

    const [qty, setQty] = useState(1);
    const [price, setPrice] = useState(0);
    const { addToCart } = useCartStore();
    const [cartbtn, setCartbtn] = useState('Add to Cart')
    useEffect(() => {
        const getData = async () => {
            const res = await fetch(`https://fakestoreapi.com/products/${params.slug}`);
            const info = await res.json();
            setData(info);
            setPrice(info.price);
            const res2 = await fetch(`https://fakestoreapi.com/products/category/${info.category}?limit=4`);
            const productsTemp = await res2.json();
            setData2(productsTemp);
        }
        getData();
    }, [params.slug])

    useEffect(() => {
        setPrice((data?.price || 0) * qty);
    }, [data?.price, qty])

    const handleAddToCart = (id: number, title: string, image: string, price: number) => {
        const cartItem: CartProduct = {
            id, title, image, price, quantity: qty, totalAmount: qty * price
        }
        addToCart(cartItem);
        setCartbtn("Item added!")
    }

    return (
        <>
            {data &&
                <div className='w-full'>
                    <div id='product_nav' className='px-2 md:px-10 py-5 flex flex-col-reverse md:flex-row justify-between items-center border-t-2 border-b-2 border-gray-100 bg-white z-0 sticky top-0'>
                        <ul className='flex list-none justify-start gap-5  text-[#666666] font-semibold border-b-2 border-transparent pt-5 md:pt-0 '>
                            <li className={`${tab == "about" ? 'text-black border-b-2 border-primary-600' : 'hover:text-black'} cursor-pointer transition-all duration-200 ease-linear`} onClick={() => setTab('about')}>About Product</li>
                            <li className={`${tab == "details" ? 'text-black border-b-2 border-primary-600' : 'hover:text-black'} cursor-pointer transition-all duration-200 ease-linear`} onClick={() => setTab('details')}>Details</li>
                        </ul>
                        <div className='flex justify-between  md:justify-start gap-5 items-center'>
                            <div className='flex flex-col md:flex-row gap-0'>
                                <h3 className='text-[#666666] '>Just For You in</h3> <span className='text-black font-semibold'>${price}</span>
                            </div>
                            <input type="number" min={0} className='border-2 border-gray-200 rounded-md py-2 px-3 bg-[#F5F7FF] outline-none w-14' value={qty} onChange={(e) => { setQty(parseInt(e.target.value)) }} />
                            <button className='px-4 py-3 md:p-3 md:px-4 rounded-full font-semibold bg-primary-700 text-white text-xs md:text-sm uppercase' onClick={() => handleAddToCart(data?.id || 0, data?.title || '', data?.image || '', data?.price || 0)}>{cartbtn}</button>
                        </div>
                    </div>

                    {/* Upper Section */}
                    <div className='w-full bg-[#F5F7FF] grid grid-cols-5'>

                        {/* First Section */}
                        {(tab == "about") && <div className="col-span-full md:col-span-3 md:pl-40 p-5 order-2 md:order-1">
                            <p className='text-[#666666] py-3'>Home / {data.category} / <span className='text-black'>{data.title.slice(0, 10)}...</span> </p>

                            <h1 className='text-black text-3xl py-2 uppercase'>{data.title}</h1>
                            <p className='text-gray-800'>Category: <span className='text-black'>{data.category}</span></p>

                            <p className='py-10 text-lg text-black'>{data.description.slice(0, 120)}...</p>

                            <div className="flex flex-col md:flex-row gap-2 items-center justify-center mt-3 md:mt-0">
                                <div id="seller" className='p-4 gap-3 flex justify-start items-center bg-white rounded-md shadow-sm'>
                                    <Image src={"/user.jpg"} alt='logo' width={75} height={75} className='rounded-full' />
                                    <div>
                                        <h5 className='text-black text-xl'>HiTech Sellers</h5>
                                        <p className='text-[#666666]'>Verified Seller | Since 2022</p>
                                        <p className='text-[#666666]'>Hala, Sindh, Pakistan</p>
                                    </div>
                                </div>
                                <div id="rating" className='p-4 px-6 gap-1 w-full md:w-auto flex flex-col justify-start items-center bg-white rounded-md shadow-sm'>
                                    <h1 className='text-black text-xl'>{data.rating.rate} Rating</h1>

                                    <div className='text-yellow-500 text-lg flex items-center gap-1'>
                                        {[...Array(Math.floor(data.rating.rate))].map((_, i) => <BsStarFill key={i} />)}
                                        <p className='text-[#666666] text-xs'>( {data.rating.count} Reviews )</p>
                                    </div>
                                    <p className='text-primary-500 underline'>View Reviews</p>

                                </div>
                            </div>

                            <div className='flex flex-col md:flex-row justify-between items-center py-5'>
                                <p className='font-medium text-black'>Have a Question? <span className='text-primary-600'>Get Answer here!</span></p>
                                <p className='text-[#666666]'>SKU D5515AI</p>
                            </div>
                        </div>}
                        {tab == "details" && <div className="col-span-full md:col-span-3 md:pl-40 p-5 order-2 md:order-1">
                            <p className='text-[#666666] py-3'>Home / {data.category} / <span className='text-black'>{data.title.slice(0, 10)}...</span> </p>


                            <h1 className='text-black text-3xl py-2 uppercase'>{data.title}</h1>

                            <p className='py-5 text-lg text-black'>
                                {data.description}
                            </p>
                            <div className='flex flex-col md:flex-row justify-between items-center py-2'>
                                <p className='font-medium text-black'>Have a Question? <span className='text-primary-600'>Get Answer here!</span></p>
                                <p className='text-[#666666]'>SKU D5515AI</p>
                            </div>
                        </div>}

                        {/* Second Section */}
                        <div className="col-span-full md:col-span-2 p-4 flex justify-center items-center order-1 md:order-2">
                            <Image src={data?.image} alt={data.title} width={300} height={300} priority />
                        </div>

                    </div>

                    {/* Review & Questions Section */}
                    <section className='w-full px-4 md:px-20 py-10 grid grid-cols-8 gap-3'>
                        {/* Reviews */}
                        <div className='flex flex-col col-span-full md:col-span-4 justify-start gap-5'>
                            <h3 className='text-3xl font-semibold text-black'>Reviews</h3>
                            <div className="conversation flex flex-col justify-start items-start bg-blue-50 rounded-md p-2">
                                <div className="review p-5 flex flex-col justify-start gap-2">
                                    <div className='flex justify-start items-center gap-2'>
                                        <Image src="/user.jpg" width={50} height={50} className='rounded-full' alt='user' />
                                        <div className="flex flex-col justify-start items-center">
                                            <p className='text-gray-600'>Sarfaraz Unar</p>
                                            <div className='text-yellow-500 flex items-center gap-1'><BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /> </div>
                                        </div>
                                    </div>
                                    <p className='text-gray-800 pl-5 text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum quibusdam pariatur nihil accusantium iure expedita cupiditate nisi vero mollitia autem.</p>
                                </div>

                                <div className="reply p-2 px-5 my-2 ml-14 bg-white flex flex-col justify-start">
                                    <p className='text-black font-semibold'>HiTech</p>
                                    <p className='text-gray-600 text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius, alias?</p>
                                </div>
                            </div>
                        </div>

                        {/* Questions */}
                        <div className='flex flex-col col-span-full md:col-span-4 justify-start gap-5'>
                            <h3 className='text-3xl font-semibold text-black'>Questions</h3>
                            <div className="conversation flex flex-col justify-start items-start bg-blue-50 rounded-md p-5 pl-10">
                                <div className="review flex justify-start items-center gap-2">
                                    <p className='text-gray-600'>Sarfaraz Unar: <span className='text-black'>Is it will run VS Code?</span></p>
                                </div>
                                <div className="reply p-2 px-5 my-3 ml-2 bg-white flex flex-col justify-start">
                                    <p className='text-black font-semibold'>HiTech</p>
                                    <p className='text-gray-600 text-sm'>Yes, you can run vs code easily with that and do other development stuff.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <h2 className='text-3xl md:text-4xl text-gray-900 font-semibold px-5 md:px-20 py-4'>Related Products</h2>
                    <div className="w-full px-5 md:px-20 py-10 grid grid-cols-2 md:grid-cols-4 gap-1">
                        {data2?.map((product: ProductCardType, index: number) => (
                            <ProductCard key={index} data={product} cartBtn={true} />

                        ))}
                    </div>
                </div>}
            {!data && <h1>Loading data...</h1>}
        </>
    )
}

export default ProductPage
