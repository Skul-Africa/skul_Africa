"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PerformanceChart: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [chartData, setChartData] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);

    const fetchChartData = async () => {
      const token = localStorage.getItem("teacher_token"); // 👈 make sure this key matches your login storage

      if (!token) {
        console.warn("⚠️ No teacher token found — using demo data");
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

        const text = await res.text(); // read raw response
        console.log("🟢 Raw response:", text);

        if (!res.ok) {
          console.warn("⚠️ Fetch failed:", res.status, res.statusText);
          setChartData([45, 42, 60, 70, 46, 50, 65, 62, 54, 60, 70, 75]);
          setLoading(false);
          return;
        }

        const data = JSON.parse(text);
        console.log("✅ Parsed performance data:", data);

        // Assuming data looks like { performance: [..values..] }
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
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 3 },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
      labels: { formatter: (val: number) => `${val}%` },
    },
    colors: ["#3b82f6"],
  };

  const series = [
    {
      name: "Performance",
      data: chartData.length ? chartData : [65, 59, 80, 81, 56, 72, 88, 76, 65, 77, 85, 90],
    },
  ];

  if (!mounted) return null;

  return (
    <div className="bg-white/80 backdrop-blur-md p-5 rounded-xl shadow-sm border border-gray-200">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Performance Overview</h2>
        {loading && <span className="text-sm text-gray-500 animate-pulse">Loading...</span>}
      </div>

      <div className="h-[300px] w-full">
        <ReactApexChart options={options} series={series} type="area" height="100%" width="100%" />
      </div>
    </div>
  );
};

export default PerformanceChart;
