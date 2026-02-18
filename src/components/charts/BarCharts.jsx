import Chart from "react-apexcharts";

const BarCharts = ({ data = [] }) => {
  const chartData = {
    options: {
      chart: {
        id: "basic-bar",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      colors: ["#95C4BE"],
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '60%',
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: false,
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#374151"]
        },
      },
      grid: {
        borderColor: '#E5E7EB',
        strokeDashArray: 4,
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        },
      },
      xaxis: {
        categories: data.map(item => item.day),
        axisBorder: {
          show: true,
          color: '#E5E7EB',
        },
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '12px',
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '12px'
          },
          formatter: function (value) {
            if (value >= 1000) {
              return (value / 1000).toFixed(1) + 'k';
            }
            return value;
          }
        },
        min: 0,
      },
      tooltip: {
        enabled: true,
      },
      fill: {
        opacity: 1
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff']
      }
    },
    series: [
      {
        name: "Users",
        data: data.map(item => Number(item.active_count)),
      },
    ],
  };

  return (
    <div className="max-w-xl w-full">
      <div className="relative">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height="350"
          width="100%"
        />
      </div>
    </div>
  );
};

export default BarCharts;