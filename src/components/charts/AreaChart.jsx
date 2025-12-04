import React from "react";
import Chart from "react-apexcharts";

const AreaChart = () => {
  const series = [
    {
      name: "Revenue",
      // scaled values (numbers in chart) — using 4 points for 4 weeks like the image
      data: [30000, 20000, 32000, 36000],
    },
  ];

  const options = {
    chart: {
      id: "revenue-area",
      toolbar: { show: false },
      zoom: { enabled: false },
      sparkline: { enabled: false },
    },
    stroke: {
      curve: "smooth",
      width: 2.5,
    },
    colors: ["#95C4BE"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.48, // top opacity -> matches rgba(149,196,190,0.48)
        opacityTo: 0,      // bottom opacity -> transparent
        stops: [0, 100],
        // gradientToColors could be set to white to ensure fade-to-white
        gradientToColors: ["#ffffff"],
      },
    },
    dataLabels: {
enabled: false,
},

    grid: {
      show: true,
      strokeDashArray: 0,
      borderColor: "#E6E6E6", // light gray horizontal lines like image
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      categories: ["Week 1", "Week 2", "week 3", "Week 4"],
      labels: {
        style: {
          colors: "#9CA3AF",
          fontSize: "13px",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      show: true,
      labels: {
        formatter: function (val) {
          // show 10k, 20k etc
          return (val / 1000).toFixed(0) + "k";
        },
        style: {
          colors: "#9CA3AF",
          fontSize: "12px",
        },
      },
    },
    markers: {
      size: 4,
      strokeWidth: 2,
      strokeColors: "#fff",
      hover: {
        size: 6,
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          // show with comma and suffix
          return "$" + val.toLocaleString();
        },
      },
    },
    legend: { show: false },
  };

  return (
    <div className="max-w-6xl min-w-xl mx-auto ">
      <div >
        <div className="w-full">
          <Chart
            options={options}
            series={series}
            type="area"
            width="100%"
            height={350}
          />
        </div>
      </div>
      <style jsx>{`
        /* outer page-like background to approximate the beige area in the screenshot */
        :global(body) {
          background-color: #f7f3ef;
        }
        /* optional: exact custom shadow using your earlier shadow value */
        .rounded-lg {
          box-shadow: 3px 4px 20.9px 6px #00000012;
        }
      `}</style>
    </div>
  );
};

export default AreaChart;
