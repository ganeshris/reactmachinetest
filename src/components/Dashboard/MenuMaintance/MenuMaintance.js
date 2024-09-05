import React, { useState, useEffect, useRef } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { BsThreeDotsVertical } from "react-icons/bs"; // Importing react-icons
import "./MenuMaintance.css";

const api = process.env.REACT_APP_API_BASE_URL;

function CustomToolbar({ apiRef, handleThreeDotsClick, handleModal }) {
  const handleGoToPage1 = () => {
    if (apiRef.current) {
      apiRef.current.setPage(1);
    }
  };

  return (
    <GridToolbarContainer>
      <Button onClick={handleGoToPage1}>Go to page 1</Button>
      <Button onClick={handleModal}>+</Button>
    </GridToolbarContainer>
  );
}

function MenuMaintenance() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await fetch(`${api}/api1/submenu1`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Flatten the nested subMenus array
        const flattenedData = data.flatMap((menuItem) => [
          menuItem,
          ...menuItem.subMenus,
        ]);
        // Set unique IDs for each menu item
        const menuItemsWithIds = flattenedData.map((menuItem, index) => ({
          ...menuItem,
          id: index + 1,
        }));
        setMenuItems(menuItemsWithIds);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleThreeDotsClick = (menuItemId) => {
    setSelectedMenuItem(menuItemId === selectedMenuItem ? null : menuItemId);
  };

  const columns = [
    {
      field: "menuItemId",
      headerName: "Menu Item ID",
      width: 200,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "menuItemDesc",
      headerName: "Menu Item Description",
      width: 250,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "moduleName",
      headerName: "Module Name",
      width: 200,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "main_menu_action_name",
      headerName: "Main Menu Action",
      width: 200,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "main_menu_icon_name",
      headerName: "Main Menu Icon",
      width: 200,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: ({ row }) => (
        <div className="relative">
          <div
            className="three-dots"
            onClick={() => handleThreeDotsClick(row.menuItemId)}
          >
            <BsThreeDotsVertical
              className="cursor-pointer text-gray-800 hover:text-gray-600"
            />
          </div>
          {selectedMenuItem === row.menuItemId && (
            <div className="absolute bg-white border border-gray-200 shadow-lg p-4 mt-2 rounded-lg">
              {/* Implement your actions buttons here */}
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-3xl text-center text-black mb-3 bg-slate-400">
        Menu Maintenance
      </div>
      <Box
        className="w-full p-4 md:w-3/4 lg:w-2/3 xl:w-1/2"
        sx={{ height: 500, width: "100%" }}
      >
        <DataGrid
          rows={menuItems}
          columns={columns}
          components={{
            Toolbar: () => (
              <CustomToolbar
                apiRef={apiRef}
                handleThreeDotsClick={handleThreeDotsClick}
                handleModal={() => setIsModalOpen(true)}
              />
            ),
          }}
          pageSize={10}
          onGridReady={(gridApi) => {
            apiRef.current = gridApi;
          }}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "rgba(107, 114, 128, 0.5)", // Tailwind CSS bg-gray-400 with opacity
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
          }}
          className="border border-gray-200 shadow-lg rounded-lg bg-gray-400"
        />
      </Box>
      {/* Your modals and other components */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Modal Title</h2>
            {/* Modal content here */}
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuMaintenance;
