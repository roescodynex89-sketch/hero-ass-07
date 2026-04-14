// "use client";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// // Assets থেকে ইমেজ ইমপোর্ট
// import CallIcon from "../assets/call.png"; 
// import TextIcon from "../assets/text.png";
// import VideoIcon from "../assets/video.png";

// export default function Timeline() {
//   const [logs, setLogs] = useState([]);
//   const [filter, setFilter] = useState("All");

//   useEffect(() => {
//     const savedTimeline = localStorage.getItem("timeline");
//     if (savedTimeline) {
//       setLogs(JSON.parse(savedTimeline));
//     }
//   }, []);

//   const filteredLogs = filter === "All" 
//     ? logs 
//     : logs.filter(log => log.type === filter);

//   const getIcon = (type) => {
//     if (type === "Call") return CallIcon;
//     if (type === "Text") return TextIcon;
//     return VideoIcon;
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6">Timeline</h1>
      
//       {/* C2: Timeline Filter */}
//       <div className="mb-8">
//         <select 
//           onChange={(e) => setFilter(e.target.value)}
//           className="border p-2 rounded-md bg-white text-sm outline-none"
//         >
//           <option value="All">All Interactions</option>
//           <option value="Call">Calls</option>
//           <option value="Text">Texts</option>
//           <option value="Video">Videos</option>
//         </select>
//       </div>

//       <div className="space-y-4">
//         {filteredLogs.map((log, index) => (
//           <div key={index} className="flex items-center gap-4 p-4 bg-white border-b border-gray-100 group">
//             <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-full group-hover:bg-emerald-50">
//               <Image src={getIcon(log.type)} alt={log.type} width={24} height={24} />
//             </div>
//             <div>
//               <p className="font-bold text-gray-800">{log.type} with {log.name}</p>
//               <p className="text-sm text-gray-400">{log.date}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import Image from "next/image";
import CallIcon from "../assets/call.png";
import TextIcon from "../assets/text.png";
import VideoIcon from "../assets/video.png";

export default function Timeline() {
  const [logs, setLogs] = useState(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("timeline");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("All");

  const filteredLogs =
    filter === "All" ? logs : logs.filter((log) => log.type === filter);

  const getIcon = (type) => {
    if (type === "Call") return CallIcon;
    if (type === "Text") return TextIcon;
    return VideoIcon;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Timeline</h1>

      {/* C2: Timeline Filter */}
      <div className="mb-8">
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded-md bg-white text-sm outline-none"
        >
          <option value="All">All Interactions</option>
          <option value="Call">Calls</option>
          <option value="Text">Texts</option>
          <option value="Video">Videos</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredLogs.length === 0 ? (
          <p className="text-gray-400 text-sm">No interactions yet.</p>
        ) : (
          filteredLogs.map((log, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-white border-b border-gray-100 group"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-full group-hover:bg-emerald-50">
                <Image
                  src={getIcon(log.type)}
                  alt={log.type}
                  width={24}
                  height={24}
                />
              </div>
              <div>
                <p className="font-bold text-gray-800">
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