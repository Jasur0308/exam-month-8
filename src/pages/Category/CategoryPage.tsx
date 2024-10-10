import React, { useState, useEffect, ChangeEvent } from 'react';
import { useGetProductByIdQuery, useGetProductsByCategoryQuery } from '../../api/makeupApi';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../../api/makeupApi';
import { RiShoppingCartFill } from "react-icons/ri";
import { FcLike, FcLikePlaceholder } from "react-icons/fc"; // Import the filled heart icon
import './Category.css';

const CategoryPage: React.FC = () => {
  const { category: urlCategory } = useParams<{ category: string }>();
  const [category, setCategory] = useState<string>(urlCategory || 'all');
  const [brand, setBrand] = useState<string>('all');
  const [color, setColor] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const { id } = useParams<{ id: string }>();
  const { data: product } = useGetProductByIdQuery(Number(id));
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    if (urlCategory) {
      setCategory(urlCategory);
    } else {
      setCategory('all');
    }
  }, [urlCategory]);

  useEffect(() => {
    const savedLikes = localStorage.getItem('likedProducts');
    if (savedLikes) {
      setLikedProducts(JSON.parse(savedLikes));
    }
  }, []);

  const { data, error, isLoading } = useGetProductsByCategoryQuery({
    category: category !== 'all' ? category : '',
    brand: brand !== 'all' ? brand : '',
    product_type: color !== 'all' ? color : '',
  });

  const brands = ['all', 'colourpop', 'w3llpeople', 'dior', 'marcelle'];
  const colors = ['all', 'Red', 'Pink', 'Blue', 'Green', 'Black', 'White'];

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleBrandChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setBrand(e.target.value);
  };

  const handleColorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setColor(e.target.value);
  };

  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value ? Number(e.target.value) : '');
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value ? Number(e.target.value) : '');
  };

  const handleAddToCart = () => {
    if(!product) return
    const cartItem = {
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.image_link,
      quantity: 1,
    };

    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    savedCart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(savedCart));
  };

  const toggleLike = (product: Product) => {
    const isLiked = likedProducts.some(item => item.id === product.id);
    let updatedLikes;

    if (isLiked) {
      // Remove from liked products
      updatedLikes = likedProducts.filter(item => item.id !== product.id);
    } else {
      // Add to liked products
      updatedLikes = [...likedProducts, product];
    }

    setLikedProducts(updatedLikes);
    localStorage.setItem('likes', JSON.stringify(updatedLikes));
  };

  const uniqueProducts = data ? Array.from(new Set(data.map(p => p.id))).map(id => data.find(p => p.id === id)).slice(210, 290) : [];

  const filteredProducts = uniqueProducts.filter((product = {} as Product): product is Product => {
    const isBrandMatch = brand === 'all' || product.brand === brand;

    const isPriceMatch =
      (minPrice === '' || parseFloat(product.price) >= minPrice) &&
      (maxPrice === '' || parseFloat(product.price) <= maxPrice);

    const isSearchMatch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false; // Safeguard against undefined

    return isBrandMatch && isPriceMatch && isSearchMatch;
  });


  const displayedProducts = filteredProducts.slice(0, 80);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 capitalize text-black">
        {category === 'all' ? 'All Products' : `${category} Products`}
      </h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full"
        />
      </div>

      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
        <div className="hidden">
          <label htmlFor="category-select" className="sr-only">
            Category
          </label>
          <select
            id="category-select"
            value={category}
            onChange={handleCategoryChange}
            className="border border-gray-300 p-2 rounded-md"
          >
            <option value="all">All Categories</option>
            <option value="lipstick">Lipstick</option>
            <option value="foundation">Foundation</option>
            <option value="eyeshadow">Eyeshadow</option>
          </select>
        </div>

        <div>
          <label htmlFor="brand-select" className="block text-sm font-medium text-gray-700 mb-1">
            Brand
          </label>
          <select
            id="brand-select"
            value={brand}
            onChange={handleBrandChange}
            className="border border-gray-300 p-2 rounded-md w-full md:w-48"
          >
            {brands.map((b) => (
              <option key={b} value={b}>
                {b === 'all' ? 'All Brands' : b}
              </option>
            ))}
          </select>
        </div>

        {/* <div>
          <label htmlFor="color-select" className="block text-sm font-medium text-gray-700 mb-1">
            Color
          </label>
          <select
            id="color-select"
            value={color}
            onChange={handleColorChange}
            className="border border-gray-300 p-2 rounded-md w-full md:w-48"
          >
            {colors.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? 'All Colors' : c}
              </option>
            ))}
          </select>
        </div> */}

        <div>
          <label htmlFor="min-price" className="block text-sm font-medium text-gray-700 mb-1">
            Min Price
          </label>
          <input
            type="number"
            id="min-price"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="border border-gray-300 p-2 rounded-md w-full md:w-48"
            placeholder="Min Price"
          />
        </div>

        <div>
          <label htmlFor="max-price" className="block text-sm font-medium text-gray-700 mb-1">
            Max Price
          </label>
          <input
            type="number"
            id="max-price"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="border border-gray-300 p-2 rounded-md w-full md:w-48"
            placeholder="Max Price"
          />
        </div>
      </div>

      {isLoading && <div className="text-center">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="spinner animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <p className="text-gray-600 mt-2">Loading, please wait...</p>
        </div>
      </div>}
      {error && (
        <div className="text-center text-red-500">
          {('message' in error)
            ? `Error: ${error.message}`
            : 'Error: An unknown error occurred'}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedProducts && displayedProducts.length > 0 ? (
          displayedProducts.map((product) => {
            if (!product) return null;
            const isLiked = likedProducts.some(item => item.id === product.id); // Check if the product is liked
            return (
              <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image_link || 'https://via.placeholder.com/300'}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{product.name.substring(0, 30)}</h2>
                  <p className="text-gray-600 text-sm mb-2">
                    {product.description?.substring(0, 40) || 'No description available.'}...
                  </p>

                  <p className="text-blue-600 font-bold mb-4">Price: ${product.price}</p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={handleAddToCart}
                      className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition"
                    >
                      <RiShoppingCartFill className="mr-1" />
                      Add to Cart
                    </button>

                    <button
                      onClick={() => toggleLike(product)}
                      className="flex items-center gap-2 border-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition-colors duration-300 ease-in-out p-2 rounded-lg shadow-md"
                    >
                      <span className="text-[16px] font-medium">Like</span>
                      {isLiked ? (
                        <FcLike className="scale-150 transition-transform duration-300" />
                      ) : (
                        <FcLikePlaceholder className="scale-150 transition-transform duration-300" />
                      )}
                    </button>

                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center">
            <p className="text-gray-600">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;