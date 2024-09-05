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
    <GridToolbarContainer className="flex flex-wrap justify-between p-2 bg-gray-100 border-b border-gray-200">
      <Button
        onClick={handleGoToPage1}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 m-1"
      >
        Go to page 1
      </Button>
      <Button
        onClick={handleModal}
        className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 m-1"
      >
        +
      </Button>
    </GridToolbarContainer>
  );
}

function TokenRegistry() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [, setIsModalOpen] = useState(false);
  const apiRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Get token from local storage
      try {
        const response = await fetch(
          `${api}/apiregistery/getall`,
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
      field: "table_id",
      headerName: "Table ID",
      width: 200,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "token_name",
      headerName: "Token Name",
      width: 250,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "token",
      headerName: "Token",
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
            className="cursor-pointer"
            onClick={() => handleThreeDotsClick(row.id)}
          >
            <BsThreeDotsVertical /> {/* Updated icon from react-icons */}
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
    <div className="flex justify-center mt-5 px-2 md:px-0">
      <Box className="w-full max-w-7xl bg-gray-50 p-4 md:p-6 rounded shadow-md">
        <p className="text-2xl md:text-3xl text-center text-white bg-gray-400 mb-4 p-3">
          Token Registry
        </p>
        <div className="bg-white p-2 md:p-4 rounded shadow-md">
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
            className="data-grid"
          />
        </div>
      </Box>
      {/* Add your modals and other components here */}
    </div>
  );
}

export default TokenRegistry;
