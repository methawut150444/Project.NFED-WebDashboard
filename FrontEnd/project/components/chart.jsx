"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const color = {
  Blue_NFED_0: '#2C4C9D',
  Blue_NFED_1: '#3C82F6',
  Blue_NFED_2: '#5CB6FA',
  Blue_NFED_3: '#C4E8FF',
  Blue_NFED_4: '#AECDE2',
  Blue_NFED_5: '#C7E2F1',
  Blue_NFED_6: '#F0F9FF',
  Blue_NFED_7: '#DFE9F1',
  Blue_IMU: '#1876D2',
  CU_Gray: '#707070',
  P_Jumbo_color_0: '#80af52'
};

const Chart_AED_inDay = ({ dataToday, dataYesterday }) => {
  const chartOptions = {
    chart: {
      type: "spline",
      backgroundColor: "transparent",
    },
    title: {
      text: null,
    },
    xAxis: {
      categories: dataToday.map((d) => d.time),
      labels: {
        enabled: true,
        step: 1,
        overflow: "allow",
        formatter: function () {
          return ["04:00", "08:00", "12:00", "16:00", "20:00"].includes(this.value) ? this.value : null;
        },
      },
      title: {
        text: "Time (Hour)",
        rotation: 0,
        align: "high",
        offset: 10,
      },
    },
    tooltip: {
      shared: true,
      formatter: function () {
        if (!this.points) return "";
        const time = this.points[0].key; // ✅ ใช้ค่าเวลาแทน index ของจุด
        return `<b>${time}</b><br/>` + this.points
          .map((point) => `<span style="color:${point.color}">●</span> <b>${point.series.name}</b>: ${point.y} kW <br/>`)
          .join("");
      },
    },
    yAxis: {
      title: {
        text: "Power (kW)",
        rotation: 270,
        align: "middle",
        offset: 50,
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: "Yesterday",
        data: dataYesterday.map((d) => d.value),
        color: "#707070", // CU_Gray
        dashStyle: "Dash",
        lineWidth: 2,
        marker: {
          radius: 2,
        },
      },
      {
        name: "Today",
        data: dataToday.map((d) => d.value),
        color: "#80af52", // P_Jumbo_color_0
        lineWidth: 2,
        marker: {
          radius: 2,
        },
      },
    ],
  };

  return (
    <div className="w-full h-auto pt-3 pr-3">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export { Chart_AED_inDay };