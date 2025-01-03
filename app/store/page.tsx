import React from 'react'
import ProductCard from '../components/ProductCard';
import { ProductCardType } from '@/types/ProductCard';
import Hero from '../components/Hero';

const Store = async () => {
  const res = await fetch(`${process.env.PUBLIC_ORIGIN}/api/products?limit=20`);
  const data: ProductCardType[] = await res.json();

  return (
    <div className='w-full'>
      <Hero title="Your Favourite Products in One Place" subtitle="Find all the products you love and more!" />
      <div id='products' className='w-full p-10 px-2 md:px-20'>
        <h2 className='text-3xl font-semibold text-primary-900 capitalize'>Your All Favs in one place!</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-4">
          {data.map((product) => <ProductCard key={product.id} data={product} />)}
        </div>
      </div>
    </div>
  )
}

export default Store
