"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PerformanceChart: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "area",
      height: 350,
      toolbar: { show: false },
      sparkline: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: { 
      curve: "smooth",
      width: 3,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 100],
      },
    },
    xaxis: {
      categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      axisBorder: { show: true, color: '#E5E7EB' },
      axisTicks: { show: true, color: '#E5E7EB' },
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '12px',
        }
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
      labels: {
        formatter: (val: number) => `${val}%`,
        style: {
          colors: '#6B7280',
          fontSize: '12px',
        }
      },
    },
    grid: {
      borderColor: '#F3F4F6',
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
      padding: { top: 0, right: 20, bottom: 0, left: 20 }
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: '12px',
      },
      x: {
        show: true,
        format: 'MMM',
      },
    },
    colors: ["#FFA500", "#FFCCB6"],
 // Blue and Green
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '13px',
      markers: {
        size: 12,
      },
      itemMargin: {
        horizontal: 10,
      },
    },
  };

  const series = [
    {
      name: "This week",
      data: [65, 59, 80, 81, 56, 72, 88, 76, 65, 77, 85, 90]
    },
    {
      name: "Last week",
      data: [45, 42, 60, 70, 46, 50, 65, 62, 54, 60, 70, 75]
    },
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">School Performance</h2>
        <p className="text-sm text-gray-500">Annual performance comparison</p>
      </div>

      {mounted && (
        <div className="h-[350px] w-full">
          <ReactApexChart 
            options={options} 
            series={series} 
            type="area" 
            height="100%" 
            width="100%" 
          />
        </div>
      )}
    </div>
  );
};

export default PerformanceChart;