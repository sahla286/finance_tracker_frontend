import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { Chart, registerables } from "chart.js";
import { Doughnut, Bar, Pie, Line, Radar, PolarArea } from "react-chartjs-2";

Chart.register(...registerables);

const ExpenseStats = () => {
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState("doughnut");
  const [timeRange, setTimeRange] = useState("1m"); // Default: Last 1 month

  useEffect(() => {
    fetchChartData();
  }, [timeRange]); // Refetch data when time range changes

  const fetchChartData = async () => {
    try {
      const response = await axiosInstance.get(`expense/expense_category_summary/?time_range=${timeRange}`);
      const categoryData = response.data.expense_category_data;

      if (!categoryData || Object.keys(categoryData).length === 0) {
        console.error("No expense data available.");
        setChartData(null);
        return;
      }

      setChartData({
        labels: Object.keys(categoryData),
        datasets: [
          {
            label: `Expenses (${timeRange === '1m' ? 'Last 1 Month' : timeRange === '6m' ? 'Last 6 Months' : 'Last 1 Year'})`,
            data: Object.values(categoryData),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
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
    <div className="container mt-4">
      
      <div className="row">
        <div className="col-md-12">
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-light p-3 rounded">
          <li className="breadcrumb-item"><a href="/expense">Expense Summary</a></li>
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
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="1m">Last 1 Month</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last 1 Year</option>
          </select>

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
                options={{ responsive: true, maintainAspectRatio: false }} 
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

export default ExpenseStats;
