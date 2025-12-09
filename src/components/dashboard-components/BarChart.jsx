import React from "react";
import ReactApexChart from "react-apexcharts";
// import dayjs from "dayjs";

const BarChart = () => {
  const series = [
    {
      name: "sales",
      data: [
        { x: "Mon", y: 500 },
        { x: "Tue", y: 400 },
        { x: "Wed", y: 448 },
        { x: "Thu", y: 470 },
        { x: "Fri", y: 540 },
        { x: "Sat", y: 540 },
        { x: "Sun", y: 500 },
      ]
    }
  ];

  const options = {
    chart: {
    type: "bar",
    height: 380,
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded',
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: "vertical",
          shadeIntensity: 0.5,
          gradientToColors: ['#95C4BE'],
          inverseColors: false,
          opacityFrom: 0.8,
          opacityTo: 0.9,
          stops: [0, 100]
        }
      }
    },
  },
  colors: ["#95C4BE"],
    tooltip: {
      x: {
        formatter: (val) =>
          "Q" + dayjs(val).quarter() + " " + dayjs(val).format("YYYY"),
      },
    },
  };

  return (
    <div>
      <ReactApexChart options={options} series={series} type="bar" height={380} />
    </div>
  );
};

export default BarChart;
