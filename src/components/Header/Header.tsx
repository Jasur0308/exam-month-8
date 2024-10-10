import { AiFillLike } from "react-icons/ai"; 
import React, { useEffect, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { RiShoppingCartFill } from "react-icons/ri";
import { MdShoppingCart } from 'react-icons/md';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import honey from "../../assets/honey.png";
import { Product } from '../../api/makeupApi';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [currency, setCurrency] = useState<string>('USD');

  useEffect(() => {
    try {
      const cartItems: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cartItems.length);
    } catch (error) {
      console.error('Error parsing cart items from localStorage:', error);
      setCartCount(0);
    }

    try {
      const likeItems: Product[] = JSON.parse(localStorage.getItem('likes') || '[]');
      setLikeCount(likeItems.length);
    } catch (error) {
      console.error('Error parsing like items from localStorage:', error);
      setLikeCount(0);
    }

    const storedCurrency = localStorage.getItem('currency');
    if (storedCurrency) setCurrency(storedCurrency);
  }, []);

  const handleCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
    localStorage.setItem('currency', e.target.value);
  };

  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link to="/">
          <img src={honey} alt="Beauty Bay" className="w-[150px] h-[130px]" />
        </Link>
        <div className='flex items-center justify-between'>
          <div className="flex items-center space-x-4">
            <Link to="/category" aria-label="Category">
              <MdShoppingCart className="text-3xl text-gray-700 hover:text-pink-600 cursor-pointer" />
            </Link>
            <Link to="/product/carted" aria-label="Shopping Cart" className="relative">
              <RiShoppingCartFill className="text-3xl text-gray-700" /> 
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                {cartCount}
              </span>
            </Link>
            <Link to="/product/liked" aria-label="Liked Cart" className="relative">
              <AiFillLike className="text-3xl text-gray-700" />
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                {likeCount}
              </span>
            </Link>

            <div className="py-2 flex justify-center space-x-4">
              <select value={currency} onChange={handleCurrencyChange} className="border border-gray-300 p-2 rounded-md w-[80px]">
                <option value="USD">USD</option>
                <option value="UZS">UZS</option>
              </select>
            </div>
            <button
              className="md:hidden focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <XIcon className="h-6 w-6 text-gray-700" /> : <MenuIcon className="h-6 w-6 text-gray-700" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;