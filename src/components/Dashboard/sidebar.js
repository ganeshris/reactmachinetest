import React, { useEffect, useState } from "react";
import { FiChevronRight, FiChevronDown, FiSettings } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/fndMenu/menuloadbyuser`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setMenuItems(data);
        console.log("Fetched Menu Data:", data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleSubmenuToggle = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <div
      className={`flex flex-col h-screen bg-gray-100 text-black ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300`}
    >
      <div className="flex items-center justify-between p-4">
        {isOpen ? (
          <span className="text-lg font-bold">Menu</span>
        ) : (
          <FiSettings
            className="text-2xl cursor-pointer"
            onClick={handleToggle}
          />
        )}
        <button onClick={handleToggle}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
      {isOpen && (
        <nav className="flex flex-col mt-4">
          {menuItems.map((item) => (
            <div key={item.id} className="relative">
              <button
                className="flex items-center p-4 hover:bg-gray-300 w-full text-left"
                onClick={() => handleSubmenuToggle(item.id)}
              >
                {item.icon && <item.icon className="w-6 h-6 mr-2" />}
                <span>{item.menuItemDesc}</span>
                {item.subMenus && (
                  <div className="ml-auto">
                    {openSubmenu === item.id ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </div>
                )}
              </button>
              {item.subMenus && openSubmenu === item.id && (
                <ul className="pl-8 bg-gray-200">
                  {item.subMenus.map((subItem) => (
                    <li
                      key={subItem.id}
                      className="flex items-center p-2 hover:bg-gray-300"
                    >
                      <span className="ml-4">{subItem.menuItemDesc}</span>
                      {subItem.subMenus && (
                        <div className="ml-auto">
                          {openSubmenu === subItem.id ? (
                            <FiChevronDown />
                          ) : (
                            <FiChevronRight />
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      )}
    </div>
  );
};

export default Sidebar;
