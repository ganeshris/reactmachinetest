import React, { useState, useEffect, useRef } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "./Modal"; // Import your Modal component
import UpdateModal from "./UpdateModal"; // Import your UpdateModal component
import "./UserMaintance.css";

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

function UserMaintance() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserForUpdate, setSelectedUserForUpdate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    userId: "",
    username: "",
    fullName: "",
    email: "",

    usrGrpName: "",
  });
  const apiRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      console.log("object", token);
      try {
        const response = await fetch(`${api}/api/getAllAppUser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        const usersWithIds = data.map((user, index) => ({
          ...user,
          id: index + 1,
        }));
        setUsers(usersWithIds);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleThreeDotsClick = (userId) => {
    setSelectedUser(userId === selectedUser ? null : userId);
  };

  const handleDelete = (userId) => {
    console.log("Delete user with ID:", userId);
  };

  const handleUpdate = (user) => {
    setSelectedUserForUpdate(user);
    setIsUpdateModalOpen(true);
  };

  const handleModal = () => {
    setIsModalOpen(true);
  };

  const handleModalSave = (data) => {
    setUsers((prevUsers) => [
      ...prevUsers,
      { ...data, id: prevUsers.length + 1 },
    ]);
    setIsModalOpen(false);
  };

  const handleUpdateSave = () => {
    setIsUpdateModalOpen(false);
  };

  const columns = [
    { field: "userId", headerName: "User ID", width: 200 },
    { field: "username", headerName: "Username", width: 200 },
    { field: "fullName", headerName: "Full Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "usrGrpName", headerName: "User Group", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: ({ row }) => (
        <div>
          <div
            className="three-dots"
            onClick={() => handleThreeDotsClick(row.userId)}
          >
            <BsThreeDotsVertical />
          </div>
          {selectedUser === row.userId && (
            <div className="popover">
              <button onClick={() => handleDelete(row.userId)}>Delete</button>
              <button onClick={() => handleUpdate(row)}>Update</button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <Box
      sx={{ height: "calc(100vh - 150px)", width: "100%", overflowX: "auto" }}
    >
      <div className="text-center text-3xl text-white bg-gray-400">
        User Maintenance
      </div>
      <DataGrid
        className="bg-gray-400"
        rows={users}
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
      />
      {isModalOpen && (
        <Modal
          setNewUser={setNewUser}
          newUser={newUser}
          onSave={handleModalSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isUpdateModalOpen && (
        <UpdateModal
          user={selectedUserForUpdate}
          onUpdate={handleUpdateSave}
          onClose={() => setIsUpdateModalOpen(false)}
        />
      )}
    </Box>
  );
}

export default UserMaintance;
