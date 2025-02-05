import "./App.css";
import Registration from "./Components/Authentication/Registration";
import Login from "./Components/Authentication/Login";
import ExpenseList from "./Components/Expenses/ExpenseList";
import { Route, Routes } from "react-router-dom";
import CompletePasswordReset from "./Components/Authentication/CompletePasswordReset";
import ResetPassword from "./Components/Authentication/ResetPassword";
import Sidebar from "./Components/Sidebar/Sidebar";
import IncomeList from "./Components/Income/IncomeList";
import AddIncome from "./Components/Income/AddIncome";
import EditIncome from "./Components/Income/EditIncome"; 
import AddExpense from "./Components/Expenses/AddExpense";
import EditExpense from "./Components/Expenses/EditExpense";
import Layout from "./Components/Sidebar/Layout";
import Dashboard from "./Components/Sidebar/Dashboard";
import { useEffect, useState } from "react";

function App() {
  const [sources, setSources] = useState([]);

  useEffect(() => {
    fetch("/income/income-sources") // Adjust API endpoint
      .then((res) => res.json())
      .then((data) => setSources(data.sources))
      .catch((err) => console.error("Error fetching sources:", err));
  }, []);

  // Function to Fetch Existing Income by ID
  const fetchIncomeById = async (id) => {
    try {
      const response = await fetch(`/income/income/${id}`);
      const data = await response.json();
      return data; // Return income data
    } catch (error) {
      console.error("Error fetching income:", error);
      return null;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar stays fixed on the left */}
      <Sidebar />
     

      {/* Main content area (takes remaining width) */}
      <div className="main-content">
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/request-reset-email" element={<ResetPassword />} />
          <Route path="/reset-password/:uidb64/:token" element={<CompletePasswordReset />} />
          <Route path="/income" element={<IncomeList />} />
          <Route path="/income/add" element={<AddIncome sources={sources} />} />

         
          <Route
            path="/income/edit/:id"
            element={
              <EditIncome sources={sources} fetchIncomeById={fetchIncomeById} />
            }
          />

          <Route path="/expenses" element={<ExpenseList />} />
          <Route path="/expenses/add" element={<AddExpense/>} />
          <Route path="/expenses/edit/:id" element={<EditExpense/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
