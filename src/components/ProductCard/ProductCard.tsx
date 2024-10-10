// src/components/ProductCard.tsx
import React from 'react';
import { Product } from '../../api/makeupApi';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image_link}
          alt={product.name}
          className="w-full h-56 object-cover filter grayscale hover:grayscale-0 transition duration-300"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-black">
          {product.name.slice(0, 50)}{product.name.length > 50 ? '...' : ''}
        </h3>
        <p className="mt-2 text-red-400 font-bold text-xl">
          {product.price_sign}{product.price}
        </p>

        <Link
          to={`/product/${product.id}`}
          className="mt-4 inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-200 hover:text-black transition"
        >
          View Details
        </Link>
      </div>
      {/* Optional new tag */}
      <div className="absolute top-2 right-2 bg-black text-white text-xs font-semibold rounded-full px-2 py-1">
        New
      </div>
    </div>
  );
};

export default ProductCard;