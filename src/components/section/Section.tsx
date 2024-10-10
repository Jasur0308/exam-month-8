import { Link } from "react-router-dom";
import imgss from "../../assets/imgss.png"; 
import { FiArrowRight } from "react-icons/fi";

const Section = () => {
  return (
    <div className="flex items-center justify-between p-10 bg-gray-50 rounded-lg shadow-md max-w-[1500px] mx-auto mt-10">
      {/* Image Section */}
      <div className="w-1/2">
        <img 
          src={imgss} 
          alt="Beauty Products" 
          className="object-contain w-full h-[350px] rounded-lg shadow-lg" 
        />
      </div>

      {/* Text and Call to Action */}
      <div className="w-1/2 pl-10 bg-white p-10 text-gray-800 rounded-lg shadow-md h-[350px] ml-10 flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-black mb-4">DISCOVER BEAUTY LIKE NEVER BEFORE</h1>
        <p className="text-lg text-gray-600 mb-6">
          Elevate your skincare and makeup game with our exclusive collection. Sign up for early access and be the first to experience luxury beauty.
        </p>
        <div className="flex items-center justify-start">
          <Link 
            className="bg-black text-white px-6 py-3 rounded-md text-lg flex items-center hover:bg-gray-800 transition" 
            to="/category" // You can replace this with the appropriate route
          >
            Join the Waitlist 
            <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Section;