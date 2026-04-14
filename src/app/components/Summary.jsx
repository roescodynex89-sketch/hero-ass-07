const Summary = () => {
  return (
    <div className="max-w-7xl mx-auto   bg-[#FFFFFF]        px-4 my-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/*card--1*/}
        <div className="bg-white p-8 text-center border border-gray-400 rounded-xl shadow-sm hover:shadow-xl transition-shadow">
          <h2 className="text-3xl font-bold text-gray-900">10</h2>
          <p className="text-gray-500 font-medium text-sm mt-1">
            Total Friends
          </p>
        </div>

        {/* card--2*/}
        <div className="bg-white p-8 text-center border border-gray-400 rounded-xl shadow-sm hover:shadow-xl transition-shadow">
          <h2 className="text-3xl font-bold text-gray-900">3</h2>
          <p className="text-gray-500 font-medium text-sm mt-1">On Track</p>
        </div>

        {/*3 */}
        <div className="bg-white p-8 text-center border border-gray-400 rounded-xl shadow-sm hover:shadow-xl transition-shadow">
          <h2 className="text-3xl font-bold text-gray-900">6</h2>
          <p className="text-gray-500 font-medium text-sm mt-1">
            Need Attention
          </p>
        </div>

        {/*card--4 */}
        <div className="bg-white p-8 text-center border border-gray-400 rounded-xl shadow-sm hover:shadow-xl transition-shadow">
          <h2 className="text-3xl font-bold text-gray-900">12</h2>
          <p className="text-gray-500 font-medium text-sm mt-1">
            Interactions This Month
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
