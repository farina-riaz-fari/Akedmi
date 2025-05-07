import React, { useState } from "react";
import { FaBuilding, FaUser, FaTasks, FaHandsHelping } from "react-icons/fa";
import { BsPrinter } from "react-icons/bs";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ProfileSidebar from "../../components/ProfileSidebar";
import Searchbar from "../../components/Searchbar";
import { IoCaretBackOutline, IoCaretForwardOutline } from "react-icons/io5";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend
);

const ITEMS_PER_PAGE = 5;
const TOTAL_PAGES = 3;

const STATS_CARDS = [
  { label: "Company", value: "932", icon: <FaBuilding />, bg: "bg-[#4D44B5]" },
  { label: "User", value: "754", icon: <FaUser />, bg: "bg-[#FB7D5B]" },
  { label: "Project", value: "40", icon: <FaTasks />, bg: "bg-[#FCC43E]" },
  {
    label: "Partner",
    value: "32k",
    icon: <FaHandsHelping />,
    bg: "bg-[#303972]",
  },
];

const TABLE_DATA = [
  { name: "Samantha", id: "ID 123456789", grade: "A", amount: "$50,036" },
  { name: "John Doe", id: "ID 987654321", grade: "B", amount: "$32,500" },
  { name: "Jane Smith", id: "ID 112233445", grade: "C", amount: "$28,000" },
  { name: "Mic Brown", id: "ID 998877665", grade: "A", amount: "$45,780" },
  { name: "Emi Davis", id: "ID 123123123", grade: "B", amount: "$36,500" },
];

const chartData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "This Week",
      data: [0, 35, 85, 25, 5, 30, 50, 45, 55, 85, 75, 60],
      borderColor: "#FDCB4E",
      backgroundColor: function (ctx) {
        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, "rgba(253, 203, 78, 0.4)");
        gradient.addColorStop(1, "rgba(253, 203, 78, 0)");
        return gradient;
      },
      fill: true,
      tension: 0.4,
      pointRadius: 0,
    },
    {
      label: "Last Week",
      data: [20, 45, 55, 35, 10, 50, 60, 30, 50, 100, 90, 55],
      borderColor: "#FF6B6B",
      backgroundColor: function (ctx) {
        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, "rgba(255, 107, 107, 0.4)");
        gradient.addColorStop(1, "rgba(255, 107, 107, 0)");
        return gradient;
      },
      fill: true,
      tension: 0.4,
      pointRadius: function (ctx) {
        return ctx.dataIndex === 6 ? 6 : 0;
      },
      pointBackgroundColor: "#fff",
      pointBorderColor: "#FF6B6B",
      pointBorderWidth: 6,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { mode: "index", intersect: false },
  },
  scales: {
    x: {
      grid: { display: true, drawBorder: false },
      ticks: { font: { weight: "bold" }, padding: 8 },
      border: { display: false },
    },
    y: {
      min: 0,
      max: 100,
      ticks: { stepSize: 25, padding: 8 },
      grid: { display: false, drawBorder: false },
      border: { display: false },
    },
  },
};

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNext = () => {
    if (currentPage < TOTAL_PAGES) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const currentTableData = TABLE_DATA.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="flex-1 bg-[#F3F4FF] p-4 sm:p-6 lg:p-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#303972] mt-6 lg:mt-0">
            Dashboard
          </h1>
          <div className="relative w-full md:w-[300px] mt-6 md:mt-10 lg:mt-0 shadow-md rounded-full">
            <Searchbar />
          </div>
        </div>

        <div className="mt-6 bg-white p-6 sm:p-8 lg:p-10 rounded-xl grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS_CARDS.map((stat, idx) => (
            <div key={idx} className="flex items-center space-x-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg}`}
              >
                <span className="text-white text-xl">{stat.icon}</span>
              </div>
              <div>
                <p className="text-gray-400 text-lg font-medium">
                  {stat.label}
                </p>
                <p className="text-[#303972] text-2xl font-bold">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full bg-white rounded-xl p-6 mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#303972]">
              Company Performance
            </h2>
          </div>
          <div className="h-[300px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="mt-6 flex flex-col lg:flex-row gap-4">
          {["Company Calendar", "Company Finance"].map((title, index) => (
            <div
              key={index}
              className="flex-1 bg-white p-6 rounded-xl shadow-md h-[400px]"
            >
              <h3 className="text-2xl font-bold text-[#303972]">{title}</h3>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white p-6 rounded-xl shadow-md overflow-auto">
          <h3 className="text-2xl font-bold text-[#303972] mb-6">
            Unpaid Company Intuition
          </h3>
          <table className="min-w-[600px] w-full table-auto">
            <tbody>
              {currentTableData.map((row, index) => (
                <tr key={index}>
                  <td className="py-4 px-6 flex items-center space-x-4">
                    <div className="w-[48px] h-[48px] bg-[#C1BBEB] rounded-full flex items-center justify-center" />
                    <span className="font-bold text-[#303972]">{row.name}</span>
                  </td>
                  <td className="py-4 px-6 text-[#4D44B5] font-bold">
                    {row.id}
                  </td>
                  <td className="py-4 px-6 flex items-center">
                    <div className="w-[48px] h-[48px] bg-[#FB7D5B] rounded-full flex items-center justify-center">
                      <FaBuilding className="text-white" />
                    </div>
                    <div className="ml-3 text-sm text-[#303972]">
                      <span className="block text-sm text-gray-500">Class</span>
                      <p className="font-semibold">VII A</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[#303972] font-bold">
                    {row.amount}
                  </td>
                  <td className="py-4 px-6 flex items-center">
                    <BsPrinter className="text-gray-400 w-7 h-7" />
                  </td>
                  <td className="py-4 px-6 text-gray-500 font-bold">...</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end items-center pt-6 space-x-2">
            <IoCaretBackOutline
              onClick={handlePrevious}
              className={`text-2xl cursor-pointer ${
                currentPage === 1
                  ? "opacity-50 pointer-events-none"
                  : "text-[#4D44B5]"
              }`}
            />
            {[...Array(TOTAL_PAGES)].map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ${
                  currentPage === index + 1
                    ? "bg-[#4D44B5] text-white"
                    : "text-[#4D44B5]"
                }`}
              >
                {index + 1}
              </div>
            ))}
            <IoCaretForwardOutline
              onClick={handleNext}
              className={`text-2xl cursor-pointer ${
                currentPage === TOTAL_PAGES
                  ? "opacity-50 pointer-events-none"
                  : "text-[#4D44B5]"
              }`}
            />
          </div>
        </div>
      </div>

      <div className="w-auto">
        <ProfileSidebar />
      </div>
    </div>
  );
};

export default Dashboard;
