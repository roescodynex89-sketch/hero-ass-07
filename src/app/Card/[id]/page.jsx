"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

import {
  HiOutlineArrowLeft,
  HiOutlinePhone,
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineVideoCamera,
  HiOutlineClock,
  HiOutlineArchiveBox,
  HiOutlineTrash,
} from "react-icons/hi2";

export default function FriendDetails({ params }) {
  const { id } = React.use(params); // ✅ correct param handling

  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data.json") // ✅ correct public folder fetch
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((f) => f.id == id);
        setFriend(found);
        setLoading(false);
      });
  }, [id]);

  const handleAction = (type) => {
    // toast notification
    toast.success(`${type} with ${friend.name} recorded!`);

    // timeline save
    const newInteraction = {
      type: type,
      name: friend.name,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    };

    const existingLogs = JSON.parse(localStorage.getItem("timeline") || "[]");

    localStorage.setItem(
      "timeline",
      JSON.stringify([newInteraction, ...existingLogs]),
    );
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  if (!friend)
    return (
      <div className="text-center py-20 text-red-500 font-bold">
        Friend not found!
      </div>
    );

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      {/* Back button */}
      <Link
        href="/"
        className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 mb-8 transition-colors"
      >
        <HiOutlineArrowLeft />
        Back to Friends
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* LEFT COLUMN */}
        <div className="flex flex-col items-center text-center p-6 border border-gray-100 rounded-3xl shadow-sm bg-white h-fit">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-emerald-50 mb-4">
            <Image
              src={friend.picture}
              alt={friend.name}
              width={160}
              height={160}
              className="object-cover w-full h-full"
            />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">{friend.name}</h1>

          {/* Status */}
          <span
            className={`mt-2 inline-block px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase ${
              friend.status === "overdue"
                ? "bg-red-500"
                : friend.status === "almost due"
                  ? "bg-orange-400"
                  : "bg-emerald-500"
            }`}
          >
            {friend.status}
          </span>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {friend.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded text-[10px] font-bold uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bio */}
          <p className="text-gray-500 italic text-sm px-4 mt-4">{friend.bio}</p>

          {/* Email */}
          <p className="text-gray-400 text-xs mt-2">{friend.email}</p>

          {/* Action buttons */}
          <div className="grid grid-cols-1 gap-2 w-full mt-8">
            <button className="flex items-center justify-center gap-2 py-2 text-xs font-semibold bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100">
              <HiOutlineClock size={16} />
              Snooze 2 Weeks
            </button>

            <button className="flex items-center justify-center gap-2 py-2 text-xs font-semibold bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100">
              <HiOutlineArchiveBox size={16} />
              Archive
            </button>

            <button className="flex items-center justify-center gap-2 py-2 text-xs font-semibold bg-red-50 text-red-500 rounded-lg hover:bg-red-100">
              <HiOutlineTrash size={16} />
              Delete
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="md:col-span-2 space-y-8">
          {/* Stats cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 p-6 rounded-2xl text-center">
              <p className="text-3xl font-bold">{friend.days_since_contact}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                Days Since Contact
              </p>
            </div>

            <div className="bg-emerald-50 p-6 rounded-2xl text-center">
              <p className="text-3xl font-bold text-emerald-700">
                {friend.goal}
              </p>
              <p className="text-[10px] text-emerald-600/60 font-bold uppercase mt-1">
                Goal (Days)
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl text-center">
              <p className="text-xl font-bold pt-1">{friend.next_due_date}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase mt-2">
                Next Due
              </p>
            </div>
          </div>

          {/* Relationship Goal Card */}
          <div className="border border-gray-100 p-6 rounded-2xl flex justify-between items-center shadow-sm">
            <div>
              <h3 className="text-sm font-bold text-emerald-500">
                Relationship Goal
              </h3>

              <p className="text-sm text-grey-800 mt-1">
                Connect every{" "}
                <span className="font-bold text-gray-800">
                  {friend.goal} days
                </span>
              </p>
            </div>

            <button className="text-xs font-bold bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50">
              Edit
            </button>
          </div>

          {/* Quick Check-In Section */}
          <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-emerald-500 mb-8 uppercase tracking-wider">
              Quick Check-In
            </h3>

            <div className="flex gap-10 md:gap-16">
              {/* Call Button */}
              <button
                onClick={() => handleAction("Call")}
                className="group flex flex-col items-center gap-3 cursor-pointer transition-all"
              >
                <div className="p-4 rounded-xl bg-gray-50 text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:shadow-md transition-all duration-300">
                  <HiOutlinePhone size={28} />
                </div>
                <span className="text-xs font-bold text-gray-500 group-hover:text-emerald-700 transition-colors">
                  Call
                </span>
              </button>

              {/* Text Button */}
              <button
                onClick={() => handleAction("Text")}
                className="group flex flex-col items-center gap-3 cursor-pointer transition-all"
              >
                <div className="p-4 rounded-xl bg-gray-50 text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:shadow-md transition-all duration-300">
                  <HiOutlineChatBubbleLeftEllipsis size={28} />
                </div>
                <span className="text-xs font-bold text-gray-500 group-hover:text-emerald-700 transition-colors">
                  Text
                </span>
              </button>

              {/* Video Button */}
              <button
                onClick={() => handleAction("Video")}
                className="group flex flex-col items-center gap-3 cursor-pointer transition-all"
              >
                <div className="p-4 rounded-xl bg-gray-50 text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:shadow-md transition-all duration-300">
                  <HiOutlineVideoCamera size={28} />
                </div>
                <span className="text-xs font-bold text-gray-500 group-hover:text-emerald-700 transition-colors">
                  Video
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
