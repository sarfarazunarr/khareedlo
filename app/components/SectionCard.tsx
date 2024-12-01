import Link from 'next/link'
import React from 'react'

const SectionCard = ({title, link}: {title: string, link:string}) => {
  
  return (
    <div className={`w-full h-full bg-[url('/sliders/slider2.png')] object-cover bg-no-repeat bg-center flex flex-col gap-y-2 p-4 justify-center items-center `}>
        <h2 className='text-xl text-center font-semibold text-white uppercase'>{title}</h2>
        <Link href={link} className='bg-white bg-opacity-10 text-white border-gray-500 border-2 rounded-md px-4 py-2 hover:border-transparent hover:text-white transition-colors duration-200'>Browse Products</Link>
    </div>
  )
}

export default SectionCard
