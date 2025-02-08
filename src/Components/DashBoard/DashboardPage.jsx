// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const DashboardPage = () => {
//     const [data, setData] = useState({
//         total_incomes: 0,
//         total_expenses: 0,
//         balance: 0
//     });

//     useEffect(() => {
//         const token = localStorage.getItem("access_token");
//         console.log("Token being used:", token); // Debugging: Check if token is stored

//         let incomeAmount = 0; 
//         let expenseAmount = 0;

//         // Fetch income summary data
//         axios.get("http://127.0.0.1:8000/income/income_category_summary", {
//             headers: { Authorization: `Bearer ${token}` }
//         })
//         .then(response => {
//             console.log("Income API Response:", response.data);
//             incomeAmount = response.data.total_incomes; // Store income

//             // Update state **after** getting income
//             setData(prevState => ({
//                 ...prevState,
//                 total_incomes: incomeAmount,
//                 balance: incomeAmount - expenseAmount // Ensure correct balance
//             }));
//         })
//         .catch(error => {
//             console.error("Error fetching income summary data:", error.response?.data || error);
//         });

//         // Fetch expense summary data
//         axios.get("http://127.0.0.1:8000/expense/expense_category_summary/", {
//             headers: { Authorization: `Bearer ${token}` }
//         })
//         .then(response => {
//             console.log("Expense API Response:", response.data);
//             expenseAmount = response.data.total_expenses; // Store expenses

//             // Update state **after** getting expenses
//             setData(prevState => ({
//                 ...prevState,
//                 total_expenses: expenseAmount,
//                 balance: incomeAmount - expenseAmount // Ensure correct balance
//             }));
//         })
//         .catch(error => {
//             console.error("Error fetching expense summary data:", error.response?.data || error);
//         });

//     }, []);

//     const chartData = {
//         labels: ["Income", "Expenses"],
//         datasets: [{
//             data: [data.total_incomes, data.total_expenses],
//             backgroundColor: ["#4CAF50", "#FF5733"]
//         }]
//     };

//     return (
//         <div className="container mt-5">
//             <h2>Dashboard</h2>
//             <div className="row">
//                 <div className="col-md-4">
//                     <div className="card p-3 text-center">
//                         <h4>Total Income</h4>
//                         <p className="text-success">₹{data.total_incomes}</p>
//                     </div>
//                 </div>
//                 <div className="col-md-4">
//                     <div className="card p-3 text-center">
//                         <h4>Total Expenses</h4>
//                         <p className="text-danger">₹{data.total_expenses}</p>
//                     </div>
//                 </div>
//                 <div className="col-md-4">
//                     <div className="card p-3 text-center">
//                         <h4>Balance</h4>
//                         <p className="text-primary">₹{data.balance}</p>
//                     </div>
//                 </div>
//             </div>
//             <div className="mt-4" style={{ height: '250px', width: '250px' }}>
//                 <h4>Income vs Expenses</h4>
//                 <Doughnut data={chartData} />
//             </div>
//         </div>
//     );
// };

// export default DashboardPage;



// import React, { useEffect, useState } from "react";
// import { Doughnut } from "react-chartjs-2";
// import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// Chart.register(ArcElement, Tooltip, Legend);

// const DashboardPage = () => {
//     const [financeData, setFinanceData] = useState([]);
//     const [chartData, setChartData] = useState(null);

//     useEffect(() => {
//         const token = localStorage.getItem("access_token"); // ✅ Correct key

//         console.log("Stored Token:", token); // Debugging
    
//         if (!token) {
//             console.error("No authentication token found. Please log in.");
//             return;
//         }
    
//         fetch("http://127.0.0.1:8000/income/monthly_finance_summary/", {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json",
//             },
//         })
//             .then((res) => {
//                 if (!res.ok) throw new Error("Network response was not ok");
//                 return res.json();
//             })
//             .then((data) => {
//                 setFinanceData(data.monthly_summary);
//                 prepareChartData(data.monthly_summary);
//             })
//             .catch((err) => console.error("Error fetching data:", err));
//     }, []);
    
    
//     const prepareChartData = (summary) => {
//         const months = summary.map((item) => item.month);
//         const incomeValues = summary.map((item) => item.income);
//         const expenseValues = summary.map((item) => item.expenses);

//         setChartData({
//             labels: months,
//             datasets: [
//                 {
//                     label: "Income",
//                     data: incomeValues,
//                     backgroundColor: "rgba(75, 192, 192, 0.6)",
//                 },
//                 {
//                     label: "Expenses",
//                     data: expenseValues,
//                     backgroundColor: "rgba(255, 99, 132, 0.6)",
//                 },
//             ],
//         });
//     };

//     return (
//         <div className="container">
//             <h2 className="text-center">Monthly Finance Dashboard</h2>
//             <div className="summary-table">
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Month</th>
//                             <th>Total Income</th>
//                             <th>Total Expenses</th>
//                             <th>Balance</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {financeData.map((item) => (
//                             <tr key={item.month}>
//                                 <td>{item.month}</td>
//                                 <td>${item.income.toFixed(2)}</td>
//                                 <td>${item.expenses.toFixed(2)}</td>
//                                 <td style={{ color: item.balance >= 0 ? "green" : "red" }}>
//                                     ${item.balance.toFixed(2)}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             {chartData && (
//                 <div className="chart-container">
//                     <Doughnut data={chartData} />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default DashboardPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardPage = () => {
    const [currentMonthData, setCurrentMonthData] = useState({
        total_income: 0,
        total_expense: 0,
        balance: 0
    });

    const [pastYearSummaries, setPastYearSummaries] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        axios.get("http://127.0.0.1:8000/income/monthly_finance_summary/", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            console.log("Monthly Finance Summary API Response:", response.data);

            const { current_month, monthly_summary } = response.data;
            
            // Set Current Month Data
            setCurrentMonthData({
                total_income: current_month.income,
                total_expense: current_month.expenses,
                balance: current_month.balance
            });

            // Ensure the last 11 months are shown in correct order
            setPastYearSummaries(monthly_summary.reverse());  // Reverse for chronological order
        })
        .catch(error => {
            console.error("Error fetching monthly finance summary:", error.response?.data || error);
        });

    }, []);

    const currentMonthChartData = {
        labels: ["Income", "Expenses"],
        datasets: [{
            data: [currentMonthData.total_income, currentMonthData.total_expense],
            backgroundColor: ["#4CAF50", "#FF5733"]
        }]
    };

    return (
        <div className="container mt-5">
            <h2>Dashboard</h2>

            {/* Current Month Summary */}
            <div className="row">
                <div className="col-md-4">
                    <div className="card p-3 text-center">
                        <h4>Total Income</h4>
                        <p className="text-success">₹{currentMonthData.total_income}</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-3 text-center">
                        <h4>Total Expenses</h4>
                        <p className="text-danger">₹{currentMonthData.total_expense}</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-3 text-center">
                        <h4>Balance</h4>
                        <p className="text-primary">₹{currentMonthData.balance}</p>
                    </div>
                </div>
            </div>

            {/* Current Month Doughnut Chart */}
            <div className="mt-4 d-flex justify-content-center">
                <div style={{ height: '250px', width: '250px' }}>
                    <h4>Current Month: Income vs Expenses</h4>
                    <Doughnut data={currentMonthChartData} />
                </div>
            </div>

            {/* Past 11 Months Summary */}
            <div className="mt-5">
                <h3>Past 11 Months Summary</h3>
                <div className="row">
                    {pastYearSummaries.map((monthData, index) => (
                        <div key={index} className="col-md-4 text-center mb-4">
                            <h5>{monthData.month}</h5>
                            <div style={{ height: '200px', width: '200px', margin: '0 auto' }}>
                                <Doughnut data={{
                                    labels: ["Income", "Expenses"],
                                    datasets: [{
                                        data: [monthData.income, monthData.expenses],
                                        backgroundColor: ["#4CAF50", "#FF5733"]
                                    }]
                                }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;

