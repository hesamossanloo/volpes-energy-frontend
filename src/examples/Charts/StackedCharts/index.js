import React from "react";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const StackedPlotChart = ({ data }) => {
  const chartData = Object.entries(data?.power.power).map(([time, values]) => {
    const timeLabel = time.split(" ")[1];
    return { "time":timeLabel, ...values };
  });

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <ResponsiveContainer width="100%" height={500}>
      <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        {Object.keys(data?.power.power).map((key, index) => {
          const keyLabel = key.split(" ")[1];
          return <Area key={keyLabel} type="monotone" dataKey={index} stackId="1" stroke={colors[index]}
                       fill={colors[index]} />;
        })}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default StackedPlotChart;
