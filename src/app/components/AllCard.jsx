import Image from "next/image";
import Link from "next/link";

const AllCard = ({ friends }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-10">Your Friends</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {friends.map((friend) => (
          <Link key={friend.id} href={`/Card/${friend.id}`} className="group">
            <div className="flex flex-col items-center bg-white border border-gray-300 p-6 rounded-2xl hover:shadow-xl ">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-emerald-50 shadow-sm transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={friend.picture}
                  alt={friend.name}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>

              <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                {friend.name}
              </h3>

              <p className="text-[12px] text-blue-400 font-bold mt-1 mb-3">
                {friend.days_since_contact}d ago
              </p>

              <div className="flex flex-wrap gap-2 justify-center mb-5 h-6 overflow-hidden">
                {friend.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded text-[9px] font-extrabold uppercase tracking-tight"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="w-full">
                <span
                  className={`block w-full py-2.5 rounded-xl text-[10px] font-bold text-center text-white uppercase tracking-widest shadow-sm ${
                    friend.status === "overdue"
                      ? "bg-red-500 shadow-red-100"
                      : friend.status === "almost due"
                        ? "bg-orange-400 shadow-orange-100"
                        : "bg-emerald-500 shadow-emerald-100"
                  }`}
                >
                  {friend.status}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllCard;
