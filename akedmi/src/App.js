import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Company from "./pages/Company";
import ChartOfAccount from "./pages/ChartOfAccount";
import Employee from "./pages/Employee";
import InventoryItem from "./pages/InventoryItem";
import Partner from "./pages/Partner";
import Payroll from "./pages/Payroll";
import Users from "./pages/Users";
import Project from "./pages/Project";
import NewCompany from "./pages/Company/NewCompany";
import { CompanyProvider } from "./store/CompanyContext";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <CompanyProvider>
      <Router>
        <div className="flex">
          <div>
            <Sidebar />
          </div>
          <div className="flex-1 bg-[#F3F4FF] w-full overflow-y-auto h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/company" element={<Company />} />
              <Route path="/partner" element={<Partner />} />
              <Route path="/payroll" element={<Payroll />} />
              <Route path="/project" element={<Project />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/users" element={<Users />} />
              <Route path="/chart" element={<ChartOfAccount />} />
              <Route path="/inventory" element={<InventoryItem />} />
              <Route path="/addCompany" element={<NewCompany />} />
            </Routes>
          </div>
        </div>
      </Router>
    </CompanyProvider>
  );
}

export default App;
