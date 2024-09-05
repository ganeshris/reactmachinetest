import React, { useState, useEffect, useRef } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./UserGroupMaintance.css";
 // eslint-disable-next-line
const api = process.env.REACT_APP_API_BASE_URL;

function CustomToolbar({ apiRef, handleModal }) {
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

function UserMaintance() {
  const [userGroups, setUserGroups] = useState([]);
  const [selectedUserGroup, setSelectedUserGroup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiRef = useRef(null);
 // eslint-disable-next-line
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${api}/api/getAllUsrGrp`, {
          headers: { authorization: `bearer ${token}` },
        });
        const data = await response.json();
        const userGroupsWithIds = data.map((group, index) => ({
          ...group,
          id: index + 1,
        }));
        setUserGroups(userGroupsWithIds);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleThreeDotsClick = (usrGrp) => {
    setSelectedUserGroup(usrGrp === selectedUserGroup ? null : usrGrp);
  };

  const handleDelete = async (usrGrp) => {
    try {
      const response = await fetch(`${api}/api/delete_usrgrp/${usrGrp}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUserGroups(userGroups.filter((group) => group.usrGrp !== usrGrp));
        console.log("User group deleted successfully:", usrGrp);
      } else {
        console.error("Failed to delete user group:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting user group:", error);
    }
  };

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const columns = [
    {
      field: "usrGrp",
      headerName: "User Group ID",
      width: 150,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "groupName",
      headerName: "Group Name",
      width: 150,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "groupDesc",
      headerName: "Group Description",
      width: 150,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "createby",
      headerName: "Create By",
      width: 100,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "createdate",
      headerName: "Create Date",
      width: 100,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "updatedate",
      headerName: "Update Date",
      width: 100,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "updateby",
      headerName: "Update By",
      width: 100,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "grouplevel",
      headerName: "Group Level",
      width: 100,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "createdateformated",
      headerName: "Create Date Formated",
      width: 100,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "updatedateformated",
      headerName: "Update Date Formated",
      width: 100,
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },

    // Add other columns as needed
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: ({ row }) => (
        <div>
          <div
            className="three-dots"
            onClick={() => handleThreeDotsClick(row.usrGrp)}
          >
            <BsThreeDotsVertical />
          </div>
          {selectedUserGroup === row.usrGrp && (
            <div className="popover">
              <button onClick={() => handleDelete(row.usrGrp)}>Delete</button>
              {/* You can include other actions here */}
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center text-3xl text-white bg-gray-400 p-2 rounded-lg">
        User Group Maintenance
      </div>

      <Box
        className="w-full p-4 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white border border-gray-200 shadow-lg rounded-lg"
        sx={{ height: 500, width: "100%" }}
      >
        <DataGrid
          rows={userGroups}
          columns={columns}
          components={{
            Toolbar: () => (
              <CustomToolbar
                apiRef={apiRef}
                handleThreeDotsClick={handleThreeDotsClick}
                handleModal={handleModal}
              />
            ),
          }}
          pageSize={10}
          onGridReady={(gridApi) => {
            apiRef.current = gridApi;
          }}
          className="bg-gray-400"
        />
      </Box>
      {/* Your modals and other components */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Modal Title</h2>
            {/* Modal content here */}
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMaintance;
