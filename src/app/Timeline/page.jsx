"use client";

import { useEffect, useState } from "react";
import {
  HiOutlinePhone,
  HiOutlineChatBubbleLeftEllipsis,
  HiOutlineVideoCamera,
} from "react-icons/hi2";

export default function Timeline() {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const loadLogs = () => {
      try {
        const stored = localStorage.getItem("timeline");

        if (!stored) return;

        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setLogs(parsed);
        }
      } catch (err) {
        console.log("Timeline load error");
      }
    };

    loadLogs();
  }, []);

  const filteredLogs =
    filter === "All" ? logs : logs.filter((log) => log.type === filter);

  const getIcon = (type) => {
    if (type === "Call")
      return <HiOutlinePhone size={24} className="text-emerald-600" />;

    if (type === "Text")
      return (
        <HiOutlineChatBubbleLeftEllipsis className="text-blue-600" size={24} />
      );

    return <HiOutlineVideoCamera size={24} className="text-purple-600" />;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Timeline</h1>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-2 rounded-md  bg-emerald-200  text-sm    "
      >
        <option value="All">All Interactions</option>
        <option value="Call">Call</option>
        <option value="Text">Text</option>
        <option value="Video">Video</option>
      </select>

      <div className="space-y-4 mt-6       ">
        {filteredLogs.length === 0 ? (
          <p className="text-gray-400">No interactions yet</p>
        ) : (
          filteredLogs.map((log, index) => (
            <div
              key={index}
              className="flex gap-4 border border-grey-50    p-3 rounded-2xl"
            >
              {getIcon(log.type)}

              <div>
                <p className="text-grey-800    font-semibold">
                  {log.type} with {log.name}
                </p>

                <p className="text-sm text-gray-400">{log.date}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
