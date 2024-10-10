import clinique from "../../assets/clinique.png";
import dior from "../../assets/dior.png";
import smashbox from "../../assets/smashbox.png";
import maybelline from "../../assets/maybelline.png";

const Brand = () => {
  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <h1 className="text-4xl font-bold mb-12 text-center text-black">SHOP FROM BRANDS</h1>
      <div className="flex space-x-6 overflow-x-auto py-4 rounded-[50px] justify-center">
        {[
          { img: clinique, name: "CLINIQUE" },
          { img: dior, name: "DIOR" },
          { img: smashbox, name: "SMASHBOX" },
          { img: maybelline, name: "MAYBELLINE" },
        ].map((brand, index) => (
          <div key={index} className="flex-shrink-0 flex flex-col items-center p-4 rounded-lg transition-all hover:scale-105 bg-gray-100 shadow-md">
            <img src={brand.img} alt={brand.name} className="h-[200px] w-auto object-contain mb-2" />
            <h1 className="text-lg font-semibold mt-2 text-gray-800">{brand.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brand;