
import React, { useState, useEffect, useRef } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { BsThreeDotsVertical } from "react-icons/bs"; // Importing react-icons

const api = process.env.REACT_APP_API_BASE_URL;

function CustomToolbar({ apiRef, handleModal }) {
  const handleGoToPage1 = () => {
    if (apiRef.current) {
      apiRef.current.setPage(1);
    }
  };

  return (
    <GridToolbarContainer className="flex justify-between p-2 bg-gray-200">
      <Button
        onClick={handleGoToPage1}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
      >
        Go to page 1
      </Button>
      <Button
        onClick={handleModal}
        className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
      >
        Add item
      </Button>
    </GridToolbarContainer>
  );
}

function ApiRegistery() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
   // eslint-disable-next-line
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Get token from local storage
      try {
        const response = await fetch(
          `${api}/Api_registery_header/Api_registery_header`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setMenuItems(data);
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
      field: "id",
      headerName: "ID",
      width: 300,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "table_name",
      headerName: "Table Name",
      width: 350,
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
            className="cursor-pointer"
            onClick={() => handleThreeDotsClick(row.id)}
          >
            <BsThreeDotsVertical /> {/* Using react-icons */}
          </div>
          {selectedMenuItem === row.id && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
              <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                Edit
              </button>
              <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                Delete
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex justify-center mt-5">
      <Box className="w-full max-w-7xl">
        <div className="bg-white p-4 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-white bg-gray-400 p-3">
            API Registry
          </h1>
          <DataGrid
            rows={menuItems}
            columns={columns}
            components={{
              Toolbar: () => (
                <CustomToolbar
                  apiRef={apiRef}
                  handleModal={() => setIsModalOpen(true)}
                />
              ),
            }}
            pageSize={10}
            onGridReady={(gridApi) => {
              apiRef.current = gridApi;
            }}
          />
        </div>
      </Box>
    </div>
  );
}

export default ApiRegistery;
