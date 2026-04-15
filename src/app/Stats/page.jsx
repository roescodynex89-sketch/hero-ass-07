"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Stats() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("timeline");

    if (!stored) return;

    const logs = JSON.parse(stored);

    const count = {
      Call: 0,
      Text: 0,
      Video: 0,
    };

    logs.forEach((log) => {
      if (count[log.type] !== undefined) {
        count[log.type]++;
      }
    });

    setTimeout(() => {
      setData([
        { name: "Text", value: count.Text, fill: "#8b5cf6" },
        { name: "Call", value: count.Call, fill: "#0f172a" },
        { name: "Video", value: count.Video, fill: "#10b981" },
      ]);
    }, 0);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">
        Friendship Analytics
      </h1>

      <p className="text-gray-500 mb-10">
        By Interaction Type
      </p>

      <div className="w-full h-100 bg-gray-300 rounded-2xl shadow p-6">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
            />

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}