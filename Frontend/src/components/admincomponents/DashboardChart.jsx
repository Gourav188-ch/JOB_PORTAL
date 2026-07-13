import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const DashboardChart = ({ stats }) => {
  const data = [
    {
      name: "Accepted",
      value: stats?.accepted || 0,
    },
    {
      name: "Rejected",
      value: stats?.rejected || 0,
    },
    {
      name: "Pending",
      value: stats?.pending || 0,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444",
    "#f59e0b",
  ];

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">
        Applications Overview
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;