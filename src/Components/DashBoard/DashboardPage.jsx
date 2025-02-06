import React, { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardPage = () => {
    const [data, setData] = useState({
        total_incomes: 50000,
        total_expenses: 30000,
        balance: 20000
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("Token being used:", token); // Debugging: Check if token is stored

        // Fetch income summary data
        axios.get("http://127.0.0.1:8000/income/income_category_summary", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            console.log("Income API Response:", response.data); // Debugging: Log response data
            setData(prevState => ({
                ...prevState,
                total_incomes: response.data.total_incomes
            }));
        })
        .catch(error => {
            console.error("Error fetching income summary data:", error.response?.data || error);
        });

        // Fetch expense summary data
        axios.get("http://127.0.0.1:8000/expense/expense_category_summary/", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            console.log("Expense API Response:", response.data); // Debugging: Log response data
            setData(prevState => ({
                ...prevState,
                total_expenses: response.data.total_expenses,
                balance: response.data.total_incomes - response.data.total_expenses // Assuming balance is income - expense
            }));
        })
        .catch(error => {
            console.error("Error fetching expense summary data:", error.response?.data || error);
        });
    }, []);

    const chartData = {
        labels: ["Income", "Expenses"],
        datasets: [{
            data: [data.total_incomes, data.total_expenses],
            backgroundColor: ["#4CAF50", "#FF5733"]
        }]
    };

    return (
        <div className="container mt-5">
            <h2>Dashboard</h2>
            <div className="row">
                <div className="col-md-4">
                    <div className="card p-3 text-center">
                        <h4>Total Income</h4>
                        <p className="text-success">₹{data.total_incomes}</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-3 text-center">
                        <h4>Total Expenses</h4>
                        <p className="text-danger">₹{data.total_expenses}</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-3 text-center">
                        <h4>Balance</h4>
                        <p className="text-primary">₹{data.balance}</p>
                    </div>
                </div>
            </div>
            <div className="mt-4" style={{ height:'250px',width:'250px'  }} >
                <h4>Income vs Expenses</h4>
                <Doughnut data={chartData} />
            </div>
        </div>
    );
};

export default DashboardPage;
