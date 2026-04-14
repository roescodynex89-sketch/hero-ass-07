"use client";
import { useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = {
  Call: "#10b981",
  Text: "#6366f1",
  Video: "#f59e0b",
};

export default function Stats() {
  const [chartData] = useState(() => {
    if (typeof window === "undefined") return [];

    const saved = localStorage.getItem("timeline");
    const logs = saved ? JSON.parse(saved) : [];

    const counts = { Call: 0, Text: 0, Video: 0 };
    logs.forEach((log) => {
      if (counts[log.type] !== undefined) counts[log.type]++;
    });

    return Object.entries(counts)
      .filter(([, value]) => value > 0)
      .map(([name, value]) => ({ name, value }));
  });

  const totalInteractions = chartData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Friendship Analytics</h1>

      <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
        <p className="text-sm font-semibold text-gray-500 mb-6">By Interaction Type</p>

        {totalInteractions === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <p className="text-lg">No interactions yet.</p>
            <p className="text-sm mt-1">Go to a friend page and log a Call, Text, or Video.</p>
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={130}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} interactions`, name]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {chartData.map((entry) => (
                <div
                  key={entry.name}
                  className="flex flex-col items-center p-4 rounded-xl border border-gray-100"
                >
                  <span
                    className="w-3 h-3 rounded-full mb-2"
                    style={{ backgroundColor: COLORS[entry.name] }}
                  />
                  <p className="text-2xl font-bold text-gray-800">{entry.value}</p>
                  <p className="text-sm text-gray-400">{entry.name}s</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}