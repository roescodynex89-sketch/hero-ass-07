// // src/app/Card/[id]/page.jsx

// const getFriend = async (id) => {
//   const res = await fetch("http://localhost:3000/data.json", {
//     cache: "no-store",
//   });
//   const data = await res.json();
//   // id-টি যেহেতু URL থেকে আসে তাই এটি string, 
//   // কিন্তু data.json-এ id যদি number হয়, তবে == ব্যবহার করতে হবে।
//   return data.find((f) => f.id == id);
// };

// export default async function Page({ params }) {
//   // Next.js 15+ হলে params-কে await করতে হয়
//   const { id } = await params; 
//   const friend = await getFriend(id);

//   if (!friend) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen">
//         <h1 className="text-2xl font-bold text-red-500">Friend not found!</h1>
//         <p>Searching for ID: {id}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-10">
//       <h1 className="text-4xl font-bold">{friend.name}</h1>
//       {/* এখানে আপনার বাকি UI কোড দিন */}
//     </div>
//   );
// }
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { HiOutlineArrowLeft, HiOutlinePhone, HiOutlineChatBubbleLeftEllipsis, HiOutlineVideoCamera } from "react-icons/hi2";

export default function FriendDetails({ params }) {
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);
  const unwrappedParams = React.use(params); // Next.js 15 safe param unwrapping

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((f) => f.id == unwrappedParams.id);
        setFriend(found);
        setLoading(false);
      });
  }, [unwrappedParams.id]);

  const handleAction = (type) => {
    toast.success(`${type} with ${friend.name} recorded!`);
    
    // টাইমলাইনের জন্য ডাটা লোকাল স্টোরেজে সেভ করা (সিম্পল ডেমো)
    const newInteraction = {
      type: type,
      name: friend.name,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    
    const existingLogs = JSON.parse(localStorage.getItem("timeline") || "[]");
    localStorage.setItem("timeline", JSON.stringify([newInteraction, ...existingLogs]));
  };

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (!friend) return <div className="p-20 text-center text-red-500 font-bold">Friend not found!</div>;

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-emerald-700 mb-10 transition-colors">
          <HiOutlineArrowLeft /> Back to Friends
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* প্রোফাইল কার্ড */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-emerald-50 shadow-md">
              <Image src={friend.picture} alt={friend.name} width={176} height={176} className="object-cover w-full h-full" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{friend.name}</h1>
            <span className={`px-3 py-1 rounded text-[10px] font-bold text-white uppercase ${friend.status === "overdue" ? "bg-red-500" : "bg-emerald-500"}`}>
              {friend.status}
            </span>
            <div className="flex gap-2">
              {friend.tags.map((tag, i) => (
                <span key={i} className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded text-[10px] font-bold uppercase">{tag}</span>
              ))}
            </div>
            <p className="text-gray-400 italic text-sm mt-4">Former colleague, great mentor</p>
          </div>

          {/* ডিটেইলস কার্ড */}
          <div className="md:col-span-2 space-y-10">
            <div className="grid grid-cols-3 gap-4 text-center border-b border-gray-100 pb-10">
              <div><p className="text-4xl font-bold">{friend.days_since_contact}</p><p className="text-[10px] text-gray-400 uppercase mt-2">Days Since Contact</p></div>
              <div><p className="text-4xl font-bold">30</p><p className="text-[10px] text-gray-400 uppercase mt-2">Goal (Days)</p></div>
              <div><p className="text-2xl font-bold mt-2">Feb 27, 2026</p><p className="text-[10px] text-gray-400 uppercase mt-2">Next Due</p></div>
            </div>

            <div className="space-y-6">
              <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest">Quick Check-In</h3>
              <div className="flex gap-12">
                <button onClick={() => handleAction("Call")} className="flex flex-col items-center gap-2 group">
                  <div className="p-4 rounded-xl bg-gray-50 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all"><HiOutlinePhone size={24} /></div>
                  <span className="text-xs font-bold text-gray-500">Call</span>
                </button>
                <button onClick={() => handleAction("Text")} className="flex flex-col items-center gap-2 group">
                  <div className="p-4 rounded-xl bg-gray-50 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all"><HiOutlineChatBubbleLeftEllipsis size={24} /></div>
                  <span className="text-xs font-bold text-gray-500">Text</span>
                </button>
                <button onClick={() => handleAction("Video")} className="flex flex-col items-center gap-2 group">
                  <div className="p-4 rounded-xl bg-gray-50 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all"><HiOutlineVideoCamera size={24} /></div>
                  <span className="text-xs font-bold text-gray-500">Video</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}