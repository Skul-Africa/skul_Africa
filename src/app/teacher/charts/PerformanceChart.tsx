"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface PerformanceChartProps {
  darkMode?: boolean;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ darkMode = false }) => {
  const [mounted, setMounted] = useState(false);
  const [chartData, setChartData] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);

    const fetchChartData = async () => {
      const token = localStorage.getItem("teacher_token");
      if (!token) {
        setChartData([65, 59, 80, 81, 56, 72, 88, 76, 65, 77, 85, 90]);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          "https://skul-africa.onrender.com/api/v1/teacher/performance-summary",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch performance data");
        const data = await res.json();
        setChartData(data.performance || []);
      } catch (err) {
        console.error("❌ Error loading performance data:", err);
        setChartData([65, 59, 80, 81, 56, 72, 88, 76, 65, 77, 85, 90]);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "area",
      height: 350,
      toolbar: { show: false },
      foreColor: darkMode ? "#f3f4f6" : "#1f2937", // labels color
      background: darkMode ? "#1e293b" : "#ffffff",
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 3 },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      labels: { style: { colors: darkMode ? "#f3f4f6" : "#1f2937" } },
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
      labels: { formatter: (val: number) => `${val}%`, style: { colors: darkMode ? "#f3f4f6" : "#1f2937" } },
    },
    colors: [darkMode ? "#60a5fa" : "#3b82f6"],
    grid: {
      borderColor: darkMode ? "#334155" : "#e5e7eb",
    },
  };

  const series = [
    {
      name: "Performance",
      data: chartData.length ? chartData : [65, 59, 80, 81, 56, 72, 88, 76, 65, 77, 85, 90],
    },
  ];

  if (!mounted) return null;

  return (
    <div
      className={`p-5 rounded-xl shadow-sm border ${
        darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Performance Overview</h2>
        {loading && <span className="text-sm animate-pulse">{darkMode ? "text-gray-300" : "text-gray-500"}</span>}
      </div>
      <div className="h-[300px] w-full">
        <ReactApexChart options={options} series={series} type="area" height="100%" width="100%" />
      </div>
    </div>
  );
};

export default PerformanceChart;
