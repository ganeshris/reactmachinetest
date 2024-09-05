import React, { useState } from 'react';
import { FaUser, FaUsers, FaUtensils, FaLock, FaCogs, FaKey } from 'react-icons/fa';
import UserMaintance from './UserMaintance'; 
import UserGroupMaintance from './UserGroupMaintance/UserGroupMaintance'; 
import MenuMaintance from './MenuMaintance/MenuMaintance'; 
import MenuAccessControl from './MenuAccessControl/MenuAccessControl'; 
import SystemParameters from './SystemParameters/SystemParameters'; 
import ApiRegistery from './ApiRegistery/ApiRegistery';
import TokenRegistery from './TokenRegistery/TokenRegistery';
import Codeextension from './Codeextension.js';
import DynamicTable from './Dynamictable.js';

const Card = ({ title, content, icon: Icon, onClick }) => (
  <div onClick={onClick} className="bg-white border border-gray-300 rounded-lg shadow-md p-6 m-4 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg flex flex-col items-center justify-center text-center">
    <Icon className="text-4xl text-gray-800 mb-4" />
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-gray-600">{content}</p>
  </div>
);

const CardList = () => {
  const [showUserMaintance, setShowUserMaintance] = useState(false);
  const [showUserGroupMaintance, setShowUserGroupMaintance] = useState(false);
  const [showMenuMaintance, setShowMenuMaintance] = useState(false);
  const [showMenuAccessControl, setShowMenuAccessControl] = useState(false);
  const [showSystemParameters, setShowSystemParameters] = useState(false);
  // const [showAccessType, setShowAccessType] = useState(false);
  const [showApiRegistery, setShowApiRegistery] = useState(false);
  const [showTokenRegistery, setShowTokenRegistery] = useState(false);
  const [showCodeExtension, setShowCodeExtension] = useState(false);
  const [showDynamicTable, setShowDynamicTable] = useState(false);

  const handleCardClick = (menuItemDesc) => {
    setShowUserMaintance(menuItemDesc === 'User Maintance');
    setShowUserGroupMaintance(menuItemDesc === 'User Group Maintance');
    setShowMenuMaintance(menuItemDesc === 'Menu Maintance');
    setShowMenuAccessControl(menuItemDesc === 'Menu Access Control');
    setShowSystemParameters(menuItemDesc === 'System Parameters');
    // setShowAccessType(menuItemDesc === 'Access Type');
    setShowApiRegistery(menuItemDesc === 'Api Registery');
    setShowTokenRegistery(menuItemDesc === 'Token Registery');
    setShowCodeExtension(menuItemDesc === 'Code Extension');
    setShowDynamicTable(menuItemDesc === 'Dynamic Table');
  };

  return (
    <>
      {!showUserMaintance && !showUserGroupMaintance && !showMenuMaintance && !showMenuAccessControl && !showSystemParameters  && !showApiRegistery && !showTokenRegistery && !showCodeExtension && !showDynamicTable && (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <Card title="User Maintance" content="Manage users" icon={FaUser} onClick={() => handleCardClick('User Maintance')} />
            <Card title="User Group Maintance" content="Manage user groups" icon={FaUsers} onClick={() => handleCardClick('User Group Maintance')} />
            <Card title="Menu Maintance" content="Manage menus" icon={FaUtensils} onClick={() => handleCardClick('Menu Maintance')} />
            <Card title="Menu Access Control" content="Control menu access" icon={FaLock} onClick={() => handleCardClick('Menu Access Control')} />
            <Card title="System Parameters" content="Configure system parameters" icon={FaCogs} onClick={() => handleCardClick('System Parameters')} />
            {/* <Card title="Access Type" content="Manage access types" icon={FaKey} onClick={() => handleCardClick('Access Type')} /> */}
            <Card title="Api Registery" content="Manage APIs" icon={FaUser} onClick={() => handleCardClick('Api Registery')} />
            <Card title="Token Registery" content="Manage tokens" icon={FaKey} onClick={() => handleCardClick('Token Registery')} />
            <Card title="Code Extension" content="Extend code functionalities" icon={FaLock} onClick={() => handleCardClick('Code Extension')} />
            <Card title="Dynamic Table" content="Dynamic data tables" icon={FaKey} onClick={() => handleCardClick('Dynamic Table')} />
          </div>
        </div>
      )}
      {showUserMaintance && <UserMaintance />}
      {showUserGroupMaintance && <UserGroupMaintance />}
      {showMenuMaintance && <MenuMaintance />}
      {showMenuAccessControl && <MenuAccessControl />}
      {showSystemParameters && <SystemParameters />}
      {/* {showAccessType && <AccessType />} */}
      {showApiRegistery && <ApiRegistery />}
      {showTokenRegistery && <TokenRegistery />}
      {showCodeExtension && <Codeextension />}
      {showDynamicTable && <DynamicTable />}
    </>
  );
};

export default CardList;
