import Chart from "react-apexcharts";
const LineCharts = () => {
    const data = {
        options: {
            chart: {
                id: "basic-line"
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            }
        },
      colors: ["#95C4BE"], 
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
        ]
    };
    return (
        <div className="app ">
            <div className="row">
                <div className="mixed-chart">
                    <Chart
                        options={data.options}
                        series={data.series}
                        type="area"
                        
                        width="500"
                    />
                </div>
            </div>
        </div>
    )
}

export default LineCharts
