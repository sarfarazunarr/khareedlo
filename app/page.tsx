import ProductCard from "./components/ProductCard";
import SectionHeader from "./components/SectionHeader";
import SectionCard from "./components/SectionCard";
import Testimonial from "./components/Testimonial";
import { ProductCardType } from "@/types/ProductCard";
import Hero from "./components/Hero";

export default async function Home() {
  const res = await fetch('https://fakestoreapi.com/products?limit=5');
  const data: ProductCardType[] = await res.json();
  const categories = ['jewelery', 'electronics', 'men\'s clothing', 'women\'s clothing'];
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const res2 = await fetch(`https://fakestoreapi.com/products/category/${randomCategory}?limit=4`);
  const data2: ProductCardType[] = await res2.json();

  return (
    <div className="w-full">
      <Hero title="Your One-Stop Shop For Everything You Love" subtitle="Discover Amazing Deals and Unbeatable Prices Today!" />
      <section className="w-full p-5" id="products">
        <SectionHeader title="New Products" linkText="View All Products" link="/store" />
        <div className="grid grid-cols-2 gap-1 md:grid-cols-5">
          {data.map((item) => <ProductCard key={item.id} data={item} />)}
        </div>
      </section>
      <section className="w-full p-5">
        <div className="grid grid-cols-1 md:grid-cols-5">
          <SectionCard title={randomCategory} link={`/category/${randomCategory}`} />
          {data2.map((item) => <ProductCard key={item.id} data={item} />)}
        </div>
      </section>
      <section className="w-full p-5">
        <Testimonial />
      </section>
      <div className="stick bottom-0 w-full p-2 bg-black text-white text-center">
        Made By Sarfaraz
      </div>
    </div>

  );
}
