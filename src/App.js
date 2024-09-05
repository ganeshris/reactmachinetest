import Formatest from "./components/BuilderComponents/basicp1/Formatest/Formatest";

import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/dashboard";
import UserMaintance from "./components/Dashboard/UserMaintance";
import UserGroupMaintance from "./components/Dashboard/UserGroupMaintance/UserGroupMaintance";
import CodeExtension from "./components/Dashboard/Codeextension";
import Extension from "./components/Dashboard/Extension";
import DynamicTable from "./components/Dashboard/Dynamictable";
import Form from "./components/Dashboard/Form";
import ForgotPassword from "./components/Login/ForgotPassword";
import CreateAccount from "./components/Login/CreateAccount";


const App = () => {
  let url = window.location.href;
  let arr = url.split("/");
  let part1 = arr[3];
  let part2 = arr[4];
  let basename = "/" + part1 + "/" + part2;

  console.log("url = ", url);
  console.log("url array = ", arr);
  console.log("basename =", basename);
  return (
    <div>
      <Router basename={basename}>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/UserGroupMaintance" element={<UserGroupMaintance />} />
      <Route path="/Dashboard/UserMaintance" element={<UserMaintance />} />
      <Route path="/CodeExtension" element={<CodeExtension />} />
      <Route path="/Dashboard/DashboardBuilder" element={<dashboardBuilder />} />
      <Route path="/Extension" element={<Extension />} />
      <Route path="/Dynamictable" element={<DynamicTable />} />
      <Route path="/Form" element={<Form />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/CreateAccount" element={<CreateAccount />} />
   

      {/* buildercomponents */}
        <Route path="/Formatest" element={<Formatest />} />



      
    </Routes>
     </Router>
      
    </div>
  );
};

export default App;