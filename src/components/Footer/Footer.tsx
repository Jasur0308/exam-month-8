import React, { useState } from 'react';
import { AiFillYoutube, AiFillTwitterCircle } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import { BsInstagram, BsFacebook, BsArrowRight } from "react-icons/bs";
import logo from '../../assets/honey.png'; // Updated logo
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [thankYou, setThankYou] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Add subscription logic here
    setThankYou(true);
    setEmail('');
  };

  return (
    <footer className="bg-gray-50 text-gray-800 py-12 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-center md:items-start">
          <img src={logo} alt="Company Logo" className="w-48 mb-4 rounded-full" />
          <p className="text-center md:text-left text-sm text-gray-600">
            Your go-to source for the latest in beauty.
          </p>
        </div>

        <div>
          <h1 className='text-black'>Customer Service</h1>
          <ul className="space-y-2">
            <li><Link to="/delivery" className="hover:text-pink-500 transition duration-200">Delivery & Returns</Link></li>
            <li><Link to="/contact" className="hover:text-pink-500 transition duration-200">Contact Us</Link></li>
            <li><Link to="/about" className="hover:text-pink-500 transition duration-200">About Us</Link></li>
            <li><Link to="/faq" className="hover:text-pink-500 transition duration-200">FAQs</Link></li>
          </ul>
        </div>

        <div>
          <h1 className='text-black'>Legal Information</h1>
          <ul className="space-y-2">
            <li><Link to="/terms" className="hover:text-pink-500 transition duration-200">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-pink-500 transition duration-200">Privacy Policy</Link></li>
            <li><Link to="/cookies" className="hover:text-pink-500 transition duration-200">Cookie Policy</Link></li>
          </ul>
        </div>

        <div>
          <h1 className='text-black'>Join Our Community</h1>
          <p className="text-sm mb-4">
            Stay connected! Sign up for exclusive offers, beauty tips, and new arrivals.
          </p>
          {thankYou && <p className="text-green-500 mb-2">Thank you for subscribing!</p>}
          <form onSubmit={handleSubscribe} className="flex items-center mb-4 gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              required
              className="border border-gray-300 p-2 rounded-l-md w-full"
            />
            <button
              type="submit"
              aria-label="Subscribe to Newsletter"
              className="p-2 rounded-r-md text-white bg-black hover:opacity-90 transition duration-500"
            >
              <BsArrowRight className="text-2xl" />
            </button>
          </form>
          <div className="flex space-x-4">
            <BsFacebook className="text-2xl cursor-pointer hover:text-blue-500 transition duration-200" />
            <BsInstagram className="text-2xl cursor-pointer hover:text-pink-500 transition duration-200" />
            <AiFillTwitterCircle className="text-3xl cursor-pointer hover:text-blue-400 transition duration-200" />
            <FaTiktok className="text-2xl cursor-pointer hover:text-black transition duration-200" />
            <AiFillYoutube className="text-3xl cursor-pointer hover:text-red-500 transition duration-200" />
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-300" />
      
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-black p-6 rounded-t-lg">
        <div className="text-sm text-gray-400 text-center md:text-left">
          <p>Copyright © 2024 HONEY BEAUTY Inc.</p>
          <p>Headquarters: 123 Beauty Lane, Suite 100, Los Angeles, CA 90001, USA. Registered in the United States, EIN: 12-3456789.</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;