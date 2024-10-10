import React, { useState, useRef } from 'react'; 
import { useGetAllProductsQuery } from '../../api/makeupApi';
import intro from '../../assets/liv.mp4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'; 
import Cards from '../../components/cards/Cards';
import Section from '../../components/section/Section';
import Banner from '../../components/banner/Banner';
import ProductCard from '../../components/ProductCard/ProductCard'; 
import "./Home.css"

const Home: React.FC = () => {
  const { data: products, error, isLoading } = useGetAllProductsQuery();
  const [isMuted, setIsMuted] = useState(true); 
  const videoRef = useRef<HTMLVideoElement>(null); 

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted; 
      setIsMuted(!isMuted); 
    }
  };

  if (error) {
    return <div className="text-center text-red-500">Error loading products.</div>;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full mt-5 mb-3">
        <div className="spinner animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="text-gray-600 mt-2">Loading, please wait...</p>
      </div>
    );
  }

  const featuredProducts = products ? products.slice(228, 232) : [];
  const featuredProduct = products ? products[1000] : null; // Select one product instead of an array

  return (
    <>
      <div>
        <section className="h-screen">
          <video
            ref={videoRef}
            src={intro}
            autoPlay
            loop
            muted={isMuted}
            className="max-w-full h-full object-contain top-0 left-0 z-[-1] video"
            style={{ filter: 'blur(0.7px)' }}
          ></video>

          <button
            onClick={toggleMute}
            className="absolute bottom-5 right-5 bg-white text-black p-2 rounded-full font-semibold hover:bg-gray-100 transition flex items-center justify-center"
          >
            <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} className="mr-2" />
            <span className="text-lg font-extrabold">{isMuted ? '' : ''}</span>
          </button>
        </section>

        {featuredProduct && <Banner featuredProduct={featuredProduct} />} {/* Single product */}

        <section id="products" className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-black mb-8">New Arrivals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} className="shadow-lg hover:shadow-xl transition-shadow duration-300" />
              ))}
            </div>
          </div>
        </section>
      </div>
      <Cards />
      <Section />
    </>
  );
};

export default Home;