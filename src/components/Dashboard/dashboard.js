/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import { useNavigate } from "react-router-dom";
import UserMaintanceComponent from "./UserMaintance";
import UserGroupMaintanceComponent from "./UserGroupMaintance/UserGroupMaintance";
import MenuMaintanceComponent from "./MenuMaintance/MenuMaintance";
import MenuAccessControlComponent from "./MenuAccessControl/MenuAccessControl";
import SystemParametersComponent from "./SystemParameters/SystemParameters";
// import AccessTypeComponent from "./AccessType/AccessType";
import ApiRegistery from "./ApiRegistery/ApiRegistery";
import TokenRegistery from "./TokenRegistery/TokenRegistery";
import HomePage from "./HomePage";
import Setup from "./Setup.js";
import Report from "./Report";
import { FaCog, FaUsers, FaSignOutAlt, FaHome } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);
  const [selectedUserMaintance, setSelectedUserMaintance] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchMenusData = async () => {
      const token = localStorage.getItem("authtoken");

      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/fndMenu/menuloadbyuser`;
      console.log("Fetching menus from API:", apiUrl);

      try {
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const menuData = await response.json();
          setMenus(menuData);
        } else {
          const errorText = await response.text();
          console.error(
            "Failed to fetch menus. Status:",
            response.status,
            "Response:",
            errorText
          );
        }
      } catch (error) {
        console.error("Error during menu fetch:", error);
      }
    };

    fetchMenusData();
  }, [navigate]);

  const handleMenuItemClick = (menuItem) => {
    setSelectedUserMaintance(menuItem);
    setContent(menuItem.menuItemDesc); // Update content based on clicked menu item
  };

  const handleHomeClick = () => {
    setSelectedUserMaintance(null);
    setContent("Home");
  };

  const handleSetupClick = () => {
    setSelectedUserMaintance(null);
    setContent("Setup");
  };

  const handleReportClick = () => {
    setSelectedUserMaintance(null);
    setContent("Report");
  };

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-between items-center bg-gray-800 text-white p-4">
        <h3 className="text-2xl">Dashboard</h3>
        <nav className="flex space-x-4">
          <a className="text-white" href="#" onClick={handleHomeClick}>
            <FaHome />
          </a>
          <a className="text-white" href="#" onClick={handleSetupClick}>
            <FaCog />
          </a>
          <a className="text-white" href="#" onClick={handleReportClick}>
            <FaUsers />
          </a>
        </nav>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div
          className={`bg-gray-700 text-white transition-all duration-300 ${
            sidebarCollapsed ? "w-16" : "w-64"
          } min-w-16`}
        >
          <div className="flex justify-center p-2">
            <button onClick={handleSidebarToggle} className="text-white">
              {sidebarCollapsed ? ">>" : "<<"}
            </button>
          </div>
          <Sidebar
            menus={menus}
            handleMenuItemClick={handleMenuItemClick}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />
        </div>

        <div className="flex-1 p-6 overflow-auto bg-gray-100">
          {content === "Setup" ? (
            <Setup />
          ) : content === "Home" ? (
            <HomePage />
          ) : content === "Report" ? (
            <Report />
          ) : selectedUserMaintance ? (
            <div>
              <h3 className="text-2xl mb-4">
                {selectedUserMaintance.menuItemDesc}
              </h3>
              {selectedUserMaintance.menuItemDesc === "User Maintance" ? (
                <UserMaintanceComponent />
              ) : selectedUserMaintance.menuItemDesc ==="User Group Maintance" ? (
                <UserGroupMaintanceComponent />
              ) : selectedUserMaintance.menuItemDesc === "Menu Maintance" ? (
                <MenuMaintanceComponent />
              ) : selectedUserMaintance.menuItemDesc === "Menu Access Control" ? (
                <MenuAccessControlComponent />
              ) : selectedUserMaintance.menuItemDesc === "System Parameters" ? (
                <SystemParametersComponent />
              ) : selectedUserMaintance.menuItemDesc === "Api Registery" ? (
                <ApiRegistery />
              ) : selectedUserMaintance.menuItemDesc === "Token Registery" ? (
                <TokenRegistery />
              ) : null}
            </div>
          ) : (
            <HomePage />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
