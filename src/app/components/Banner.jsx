import { HiPlus } from "react-icons/hi";

const Banner = () => {
  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-5xl font-bold text-gray-800 mb-4">
          Friends to keep close in your life
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto mb-8 text-sm md:text-base">
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>

        {/* Button */}
        <button className="inline-flex items-center gap-2 bg-emerald-700 text-white px-6 py-3 rounded-md hover:bg-emerald-500 transition-all mb-16">
          <HiPlus className="text-xl" />
          <span className="font-medium">Add a Friend</span>
        </button>
      </div>
    </section>
  );
};

export default Banner;
