import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Hero = ({ title, subtitle, category = 'default' }: { title: string, subtitle: string, category?: string }) => {
    return (
        <div className={`w-full h-auto md:h-[calc(100vh-100px)] bg-gradient-to-br from-purple-800 to-blue-800 flex flex-col md:flex-row justify-start items-center overflow-clip p-10 md:p-5 `} >
            <div className="flex md:px-10 flex-col gap-2 justify-start">
                <h3 className="text-5xl md:text-6xl text-white font-bold">{title}</h3>
                <p className="text-xl text-gray-200">{subtitle}</p>
                <Link href={'#products'} className="bg-transparent border-2 border-white rounded-full px-4 py-2 text-white font-semibold mt-5 w-1/2 md:w-3/12 hover:bg-white hover:text-primary-800 text-center" scroll={true}>Shop Now</Link>
            </div>
            <div className='hidden md:flex w-1/2 object-contain justify-center items-center overflow-clip px-5'>
                <Image src={`/category/${category}.png`} alt={category} width={950} height={950} className='object-contain' />
            </div>
        </div>
    )
}

export default Hero
