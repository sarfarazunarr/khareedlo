import React from 'react'
import ProductCard from '../components/ProductCard';
import { ProductCardType } from '@/types/ProductCard';
import Hero from '../components/Hero';
import Product from '@/models/Product.model';
import ConnectDB from '@/utils/ConnectDB';

const Store = async () => {
  let data: ProductCardType[] = [];
  try {
    await ConnectDB();
    data = await Product.find({});
  } catch (error) {
    console.log(error);
    data = [];
  }


  return (
    <div className='w-full'>
      <Hero title="Your Favourite Products in One Place" subtitle="Find all the products you love and more!" />
      <div id='products' className='w-full p-10 px-2 md:px-20'>
        <h2 className='text-3xl font-semibold text-primary-900 capitalize'>Your All Favs in one place!</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-4">
          {!data && <p className='col-span-4 text-center text-gray-800 text-md'>Loading...</p>}
          {data.length <= 0 && <p className='col-span-4 text-center text-gray-800 text-md'>No Products Available!</p>}
          {data.length > 0 && data.map((product) => <ProductCard key={product.id} data={product} />)}
        </div>
      </div>
    </div>
  )
}

export default Store
