"use client";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const PowerChart = () => {
  const data = [
    { time: "00:00", AED: 50 }, { time: "00:30", AED: 45 }, { time: "01:00", AED: 55 },
    { time: "01:30", AED: 60 }, { time: "02:00", AED: 52 }, { time: "02:30", AED: 48 },
    { time: "03:00", AED: 53 }, { time: "03:30", AED: 50 }, { time: "04:00", AED: 60 },
    { time: "04:30", AED: 65 }, { time: "05:00", AED: 70 }, { time: "05:30", AED: 68 },
    { time: "06:00", AED: 75 }, { time: "06:30", AED: 80 }, { time: "07:00", AED: 90 },
    { time: "07:30", AED: 95 }, { time: "08:00", AED: 110 }, { time: "08:30", AED: 120 },
    { time: "09:00", AED: 130 }, { time: "09:30", AED: 125 }, { time: "10:00", AED: 140 },
    { time: "10:30", AED: 135 }, { time: "11:00", AED: 145 }, { time: "11:30", AED: 150 },
    { time: "12:00", AED: 160 }, { time: "12:30", AED: 155 }, { time: "13:00", AED: 165 },
    { time: "13:30", AED: 170 }, { time: "14:00", AED: 180 }, { time: "14:30", AED: 175 },
    { time: "15:00", AED: 185 }, { time: "15:30", AED: 190 }, { time: "16:00", AED: 200 },
    { time: "16:30", AED: 195 }, { time: "17:00", AED: 185 }, { time: "17:30", AED: 175 },
    { time: "18:00", AED: 160 }, { time: "18:30", AED: 150 }, { time: "19:00", AED: 70 },
    { time: "19:30", AED: 60 }, { time: "20:00", AED: 55 }, { time: "20:30", AED: 40 },
    { time: "21:00", AED: 45 }, { time: "21:30", AED: 55 }, { time: "22:00", AED: 60 },
    { time: "22:30", AED: 55 }, { time: "23:00", AED: 45 }, { time: "23:30", AED: 60 },
  ];

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
        step: 1, // บังคับให้แสดงทุก label
        overflow: "allow",
        formatter: function (this: Highcharts.AxisLabelsFormatterContextObject) {
          return ["04:00", "08:00", "12:00", "16:00", "20:00"].includes(this.value as string)
            ? (this.value as string)
            : null;
        },
      },
    },
    yAxis: {
      title: {
        text: "Active Energy Delivery (kWh)",
        rotation: 270,
        align: "middle",
        offset: 60, // ปรับค่าตรงนี้เพื่อให้ text ห่างจากแกนมากขึ้น
        style: {
          writingMode: "unset", // เอา writingMode ออก
        },
      },
    },
    credits: {
      enabled: false, // ปิดเครดิต Highcharts.com
    },
    series: [
      {
        name: "", // ไม่ใส่ชื่อซีรีส์ (หรือจะใส่เป็นช่องว่างก็ได้)
        data: data.map((d) => d.AED),
        showInLegend: false, // ซ่อนเฉพาะซีรีส์นี้จาก Legend
      },
    ],
  };

  return (
    <div className="w-full h-auto">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  )
};

export default PowerChart;