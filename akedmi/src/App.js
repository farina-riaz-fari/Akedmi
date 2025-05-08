import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Company from "./pages/Company";
import ChartOfAccount from "./pages/ChartOfAccount";
import Employee from "./pages/Employee";
import InventoryItem from "./pages/InventoryItem";
import Payroll from "./pages/Payroll";
import Project from "./pages/Project";
import { CompanyProvider } from "./store/CompanyContext";
import Sidebar from "./components/Sidebar";
import Users from "./pages/Users/Users";
import { UserProvider } from "./store/UserContext";
import NewCompany from "./pages/Company/NewCompany";
import { EmployeeProvider } from "./store/EmployeeContext";
import { PartnerProvider } from "./store/PartnerContext";
import AddEmployee from "./pages/Employee/AddEmployee";
import Partner from "./pages/Partner/Partner";
import PartnerForm from "./pages/Partner/partnerform";
import UserForm from "./pages/Users/Userform";

function App() {
  return (
    <PartnerProvider>
      <EmployeeProvider>
        <UserProvider>
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
                    <Route path="/add-partner" element={<PartnerForm />} />
                    <Route path="/payroll" element={<Payroll />} />
                    <Route path="/project" element={<Project />} />
                    <Route path="/employee" element={<Employee />} />
                    <Route path="/addEmployee" element={<AddEmployee />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/add-user" element={<UserForm />} />
                    <Route path="/chart" element={<ChartOfAccount />} />
                    <Route path="/inventory" element={<InventoryItem />} />
                    <Route path="/addCompany" element={<NewCompany />} />
                  </Routes>
                </div>
              </div>
            </Router>
          </CompanyProvider>
        </UserProvider>
      </EmployeeProvider>
    </PartnerProvider>
  );
}

export default App;
