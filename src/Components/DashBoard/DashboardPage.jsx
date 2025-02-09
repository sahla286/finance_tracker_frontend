import React, { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardPage = () => {
    const [monthlySummaries, setMonthlySummaries] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        axios.get("http://127.0.0.1:8000/income/monthly_finance_summary/", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            console.log("Monthly Finance Summary API Response:", response.data);

            setMonthlySummaries(response.data.monthly_summary);
        })
        .catch(error => {
            console.error("Error fetching monthly finance summary:", error.response?.data || error);
        });
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4" style={{ marginTop: "80px" }}>
    Monthly Finance Overview
</h2>


            <div className="row">
                {monthlySummaries.map((monthData, index) => (
                    <div key={index} className="col-md-6 d-flex align-items-center mb-5 mt-4">
                        <div style={{ width: '200px', height: '200px' }}>
                            <h5>{monthData.month}</h5>
                            <Doughnut data={{
                                labels: ["Income", "Expenses"],
                                datasets: [{
                                    data: [monthData.income, monthData.expenses],
                                    backgroundColor: ["#4CAF50", "#FF5733"]
                                }]
                            }} />
                        </div>
                        
        
                        <div className="ml-4 mt-5">
                            <h6>Income: <span className="text-success">₹{monthData.income}</span></h6>
                            <h6>Expenses: <span className="text-danger">₹{monthData.expenses}</span></h6>
                            <h6>Savings: <span className="text-primary">₹{monthData.balance}</span></h6>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;
