import React, { useEffect, useState } from 'react';

const CartList: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]); // Update the type as per your Product interface

  useEffect(() => {
    // Retrieve products from local storage
    const storedCart = localStorage.getItem('cart');

    if (storedCart) {
      const parsedCartItems = JSON.parse(storedCart);
      setCartItems(parsedCartItems);
    } else {
      console.log('No products found in local storage.');
    }
  }, []);

  const removeFromCart = (id: number) => {
    // Filter out the item to be removed
    const updatedCartItems = cartItems.filter(item => item.id !== id);

    // Update local storage
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));

    // Update state
    setCartItems(updatedCartItems);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-black">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-contain mb-4 rounded-lg shadow-md"
              />
              <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-700 text-sm mb-1">Price: <span className="font-bold">${item.price}</span></p>
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 transition duration-200"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartList;