"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface ChartProps {
  data: { time: string; value: number }[];
}

const Chart_AED_inDay = ({ data }: ChartProps) => {
  const chartOptions = {
    chart: {
      type: "line",
      backgroundColor: "transparent",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: data.map((d) => d.time),
      labels: {
        enabled: true,
        step: 1,
        overflow: "allow",
        formatter: function (this: Highcharts.AxisLabelsFormatterContextObject) {
          return ["04:00", "08:00", "12:00", "16:00", "20:00"].includes(this.value as string)
            ? (this.value as string)
            : null;
        },
      },
      title: {
        text: "Time (Hour)",
        rotation: 0,
        align: "high",
        offset: 10,
      },
    },
    yAxis: {
      title: {
        text: "Active Energy Delivery (kWh)",
        rotation: 270,
        align: "middle",
        offset: 60,
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "AED",
        data: data.map((d) => d.value),
        showInLegend: false,
      },
    ],
  };

  return (
    <div className="w-full h-auto">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export { Chart_AED_inDay };