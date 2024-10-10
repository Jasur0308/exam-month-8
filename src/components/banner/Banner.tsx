import React from 'react';
import { useGetAllProductsQuery } from '../../api/makeupApi';
import { Link } from 'react-router-dom';
import honey from "../../assets/honey.png";
import { Product } from '../../api/makeupApi';

interface BannerProps {
  featuredProduct: Product & { price_sign?: string | null };
}

const Banner: React.FC<BannerProps> = ({ featuredProduct }) => {
  const { data: products, error, isLoading } = useGetAllProductsQuery();

  if (isLoading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Unable to retrieve products at this time.</div>;
  }

  if (featuredProduct) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-4xl p-4 font-bold mb-4 text-center text-black">Top Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products && products.length > 0 ? (
            products.slice(100, 104).map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-500 relative transform hover:scale-103"
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image_link}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </Link>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 transition">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-black font-bold text-xl">
                    {product.price_sign}{product.price}
                  </p>
                  <Link
                    to={`/product/${product.id}`}
                    className="mt-4 inline-block bg-black text-white px-4 py-2 rounded hover:bg-pink-700 transition"
                  >
                    Explore More
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">No products found.</div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-center p-8 max-w-[1600px] mx-auto mt-10 rounded-2xl">
          <div className="flex-1 flex justify-center"> 
            <img 
              src={honey} 
              alt="Beauty Essentials" 
              className="w-full h-auto max-w-md rounded-full shadow-lg border-4 border-white" 
            />
          </div>
          <div className="flex-1 p-6 text-center text-black">
            <p className="mb-6 text-lg leading-relaxed">
              Looking for premium products that won’t empty your wallet? Explore an array of skincare treasures, essential makeup items, and effective haircare solutions at BY HONEY BEAUTY, where you can discover your next favorite products.
            </p>
            <Link to="/category">
              <button className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition duration-300 shadow-md">
                Start Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Banner;