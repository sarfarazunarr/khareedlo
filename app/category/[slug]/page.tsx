import React from 'react'
import ProductCard from '@/app/components/ProductCard';
import { ProductCardType } from '@/types/ProductCard';
import Hero from '@/app/components/Hero';
import NotFound from '@/app/not-found';

const Category = async ({ params }: { params: { slug: string } }) => {
  const res = await fetch(`${process.env.PUBLIC_ORIGIN}/api/products?category=${params.slug}`);
  if(res.status == 404){
    return NotFound();
  }
  const data: ProductCardType[] = await res.json();

  return (
    <div className='w-full'>
      <Hero title={`Explore ${params.slug.replace(/%20/g, ' ')}!`} subtitle={`Find all the ${params.slug.replace(/%20/g, ' ')} you love and more!`} category={params.slug.replace(/%20/g, ' ')} />
      <div id='products' className='w-full p-10 px-2 md:px-20'>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-4">
          {!data && <p className='col-span-4 text-center text-gray-800 text-md'>Loading...</p>}
          {data.length > 0 && data.map((product) => <ProductCard key={product.id} data={product} />)}
        </div>
      </div>
    </div>
  )
}

export default Category
