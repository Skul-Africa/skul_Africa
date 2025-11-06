"use client";

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AttendanceChart() {
  const attendanceData = [
    { week: "Week 1", present: 90 },
    { week: "Week 2", present: 85 },
    { week: "Week 3", present: 92 },
    { week: "Week 4", present: 88 },
  ];

  return (
    <ChartContainer
      config={{
        attendance: { label: "Attendance", color: "#22C55E" },
      }}
      className="bg-white rounded-xl p-4 shadow-sm"
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={attendanceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar dataKey="present" fill="var(--color-attendance)" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
