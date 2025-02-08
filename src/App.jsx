import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Registration from "./Components/Authentication/Registration";
import Login from "./Components/Authentication/Login";
import ResetPassword from "./Components/Authentication/ResetPassword";
import CompletePasswordReset from "./Components/Authentication/CompletePasswordReset";
import Sidebar from "./Components/Sidebar/Sidebar";
import ExpenseList from "./Components/Expenses/ExpenseList";
import AddExpense from "./Components/Expenses/AddExpense";
import EditExpense from "./Components/Expenses/EditExpense";
import IncomeList from "./Components/Income/IncomeList";
import AddIncome from "./Components/Income/AddIncome";
import EditIncome from "./Components/Income/EditIncome"; 
import IncomeChart from "./Components/Income/IncomeChart";
import ExpenseStats from "./Components/Expenses/ExpenseStats";
// import Dashboard from "./Components/Sidebar/Dashboard";
import LandingPage from "./Components/LandingPage/LandingPage";
import DashboardPage from "./Components/DashBoard/DashboardPage";

function App() {
  // const [sources, setSources] = useState([]);
  const location = useLocation(); 

  // useEffect(() => {
  //   fetch("/income/sources")
  //     .then((res) => res.json())
  //     .then((data) => setSources(data.sources))
  //     .catch((err) => console.error("Error fetching sources:", err));
  // }, []);

  // const fetchIncomeById = async (id) => {
  //   try {
  //     const response = await fetch(`/income/income/${id}`);
  //     const data = await response.json();
  //     return data; 
  //   } catch (error) {
  //     console.error("Error fetching income:", error);
  //     return null;
  //   }
  // };

  const hideSidebarRoutes = ["/", "/login", "/register", "/request-reset-email"];
  const showSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <div className={`app-container ${showSidebar ? "" : "no-sidebar"}`}>
      {showSidebar && <Sidebar />}
  
      <div className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/request-reset-email" element={<ResetPassword />} />
          <Route path="/reset-password/:uidb64/:token" element={<CompletePasswordReset />} />
  
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/income" element={<IncomeList />} />
          <Route path="/income/add" element={<AddIncome  />} />
          <Route path="/income/edit/:id" element={<EditIncome  />} />
          <Route path="/income-chart" element={<IncomeChart />} />
  
          <Route path="/expenses" element={<ExpenseList />} />
          <Route path="/expenses/add" element={<AddExpense />} />
          <Route path="/expenses/edit/:id" element={<EditExpense />} />
          <Route path="/expenses-chart" element={<ExpenseStats />} />
        </Routes>
      </div>
    </div>
  );
  
}

export default App;
