import Chart from "react-apexcharts";

const BarCharts = () => {
  const data = {
    options: {
      chart: {
        id: "basic-bar",
        toolbar: {
          show: false, // Toolbar hide karein
        },
        zoom: {
          enabled: false,
        },
      },
      colors: ["#95C4BE"], // Bar color
      plotOptions: {
        bar: {
          borderRadius: 4, // Slightly rounded corners
          columnWidth: '80%', // Bars ki width
          dataLabels: {
            position: 'top', // Values bars ke top par
          },
        },
      },
      dataLabels: {
        enabled: false, // Values show karein
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#374151"]
        },
        formatter: function(val) {
          return val; // Just value show karein
        }
      },
      grid: {
        borderColor: '#E5E7EB',
        strokeDashArray: 4, // Dashed grid lines
        xaxis: {
          lines: {
            show: true // Vertical lines
          }
        },
        yaxis: {
          lines: {
            show: true // Horizontal lines
          }
        },
        padding: {
          top: 0,
          right: 10,
          bottom: 0,
          left: 10
        }
      },
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // Days of week
        axisBorder: {
          show: true,
          color: '#E5E7EB',
          height: 1,
          width: '100%',
        },
        axisTicks: {
          show: true,
          borderType: 'solid',
          color: '#E5E7EB',
          height: 6,
          offsetX: 0,
          offsetY: 0
        },
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '12px',
            fontFamily: 'inherit'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '12px'
          },
          formatter: function(value) {
            // Format values as 1k, 2k, etc.
            if (value >= 1000) {
              return (value / 1000) + 'k';
            }
            return value;
          }
        },
        min: 0,
        max: 4000,
        tickAmount: 5,
        axisBorder: {
          show: true,
          color: '#E5E7EB',
          offsetX: 0,
          offsetY: 0
        },
        axisTicks: {
          show: true,
          color: '#E5E7EB',
        },
        title: {
          text: '',
          style: {
            color: '#6B7280',
            fontSize: '12px'
          }
        }
      },
      tooltip: {
        enabled: true,
        x: {
          show: true
        },
        y: {
          formatter: function(value) {
            return value;
          }
        }
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
        data: [1200, 2300, 1800, 3200, 2800, 1500, 3800], // Sample data
      },
    ],
  };

  return (
    <div className="max-w-5xl w-full">
      <div className="relative">
        <div className="max-sm:hidden">
          <Chart
            options={data.options}
            series={data.series}
            type="bar"
            height="350"
          />
        </div>
        <div className="sm:hidden">
          <Chart
            options={{
              ...data.options,
              chart: {
                ...data.options.chart,
                toolbar: { show: false }
              },
              dataLabels: {
                ...data.options.dataLabels,
                enabled: false // Mobile par values hide karein
              }
            }}
            series={data.series}
            type="bar"
            height="300"
          />
        </div>
      </div>
    </div>
  );
};

export default BarCharts;