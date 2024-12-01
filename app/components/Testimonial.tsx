import React from 'react'

const Testimonial = () => {
  return (
    <div className='w-full md:w-3/4 mx-auto px-3 md:px-10 py-5 bg-primary-100'>
      <div className="flex justify-center py-5 items-start">
        <h1 className='text-3xl md:text-6xl w-1/6 font-semibold text-black text-left'>&apos;&apos;</h1>
        <p className='md:text-lg text-gray-700 py-2'>
          I recently purchased a few items from KhareedLo and I must say that I am extremely satisfied with the quality of the products. The prices are very competitive and the shipping was super fast. I would definitely recommend this store to anyone looking for a great online shopping experience.
        </p>
      </div>
      <p className='text-lg text-black mr-10 text-right'>By Javed Iqbal</p>
      <button className='bg-transparent border-2 border-primary-800 rounded-full px-4 py-2 text-primary-800 font-semibold'>Leave Us A Review</button>
    </div>
  )
}

export default Testimonial
