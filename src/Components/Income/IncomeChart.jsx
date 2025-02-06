
import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { Chart, registerables } from "chart.js";
import { Doughnut, Bar, Pie, Line, Radar, PolarArea } from "react-chartjs-2";

Chart.register(...registerables);

const IncomeChart = () => {
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState("doughnut"); // Default to Doughnut
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year
  const [timeRange, setTimeRange] = useState(""); // Default no range selected

  useEffect(() => {
    fetchChartData();
  }, [month, year, timeRange]);

  const fetchChartData = async () => {
    try {
      let url = `income/income_category_summary/?`;
      if (timeRange) {
        url += `time_range=${timeRange}`;
      } else {
        url += `month=${month}&year=${year}`;
      }

      const response = await axiosInstance.get(url);
      const categoryData = response.data.income_category_data;

      if (!categoryData || Object.keys(categoryData).length === 0) {
        console.error("No income data available.");
        setChartData(null);
        return;
      }

      setChartData({
        labels: Object.keys(categoryData),
        datasets: [
          {
            label: timeRange
              ? `Income Summary for ${timeRange === "6m" ? "Last 6 Months" : "Last 1 Year"}`
              : `Income Summary for ${new Date(year, month - 1).toLocaleString("default", { month: "long" })} ${year}`,
            data: Object.values(categoryData),
            backgroundColor: [
              "rgb(251, 29, 77)", "rgb(36, 129, 192)", "rgb(199, 145, 8)", 
              "rgb(60, 152, 152)", "rgb(139, 84, 249)", "rgb(237, 149, 61)"
            ],
            borderColor: [
              "rgb(251, 29, 77)", "rgb(36, 129, 192)", "rgb(199, 145, 8)", 
              "rgb(60, 152, 152)", "rgb(139, 84, 249)", "rgb(237, 149, 61)"
            ],
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  const chartComponents = {
    doughnut: Doughnut,
    bar: Bar,
    pie: Pie,
    line: Line,
    radar: Radar,
    polarArea: PolarArea,
  };

  const ChartComponent = chartComponents[chartType] || Doughnut;

  return (
    <div className="container" style={{ marginTop: "80px" }}>
      <div className="row">
        <div className="col-md-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-light p-3 rounded">
              <li className="breadcrumb-item"><a href="/income">Income Summary</a></li>
              <li className="breadcrumb-item active" aria-current="page">Summary</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-4">
          <h5>Select Time Range</h5>
          <select
            className="form-control mt-2"
            value={timeRange}
            onChange={(e) => {
              setTimeRange(e.target.value);
              if (e.target.value) {
                setMonth("");
                setYear("");
              }
            }}
          >
            <option value="">Select</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last 1 Year</option>
          </select>

          <h5 className="mt-3">Or Select Month & Year</h5>
          <div className="d-flex gap-2">
            <select
              className="form-control mt-2"
              value={month}
              onChange={(e) => {
                setMonth(Number(e.target.value));
                setTimeRange("");
              }}
              disabled={timeRange !== ""}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>

            <select
              className="form-control mt-2"
              value={year}
              onChange={(e) => {
                setYear(Number(e.target.value));
                setTimeRange("");
              }}
              disabled={timeRange !== ""}
            >
              {Array.from({ length: 5 }, (_, i) => {
                const currentYear = new Date().getFullYear();
                return (
                  <option key={currentYear - i} value={currentYear - i}>
                    {currentYear - i}
                  </option>
                );
              })}
            </select>
          </div>

          <h5 className="mt-3">Select Chart Type</h5>
          <select
            className="form-control mt-2"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="bar">Bar</option>
            <option value="pie">Pie</option>
            <option value="line">Line</option>
            <option value="radar">Radar</option>
            <option value="doughnut">Doughnut</option>
            <option value="polarArea">Polar Area</option>
          </select>
        </div>

        <div className="col-md-8">
          <div style={{ height: "300px", width: "100%" }}>
            {chartData ? (
              <ChartComponent
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "right",
                      labels: { boxWidth: 20 },
                    },
                  },
                  scales: chartType === "bar" ? {
                    x: {
                      ticks: {
                        autoSkip: false,
                        maxRotation: 90,
                        minRotation: 90,
                      },
                    },
                  } : {},
                }}
              />
            ) : (
              <p>Loading chart...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeChart;
