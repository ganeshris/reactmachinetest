import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Autocomplete,
} from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { FaEllipsisV } from "react-icons/fa"; // Importing react-icons instead of Font Awesome
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import { Link } from "react-router-dom";
import Extension from "./Extension";

function CustomToolbar({ handleModal }) {
  return (
    <GridToolbarContainer className="flex justify-between p-2 bg-gray-200">
      <Button
        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        onClick={handleModal}
      >
        +
      </Button>
    </GridToolbarContainer>
  );
}

function CodeExtension() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    testing: "",
    dataType: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken"); // Get token from local storage
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/extension`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setFormData({
      name: "",
      email: "",
      testing: "",
      dataType: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (submittedDataType) => {
    setFormData({ ...formData, dataType: submittedDataType });
    handleModalOpen();
  };

  const columns = [
    { field: "goto", headerName: "Goto", width: 200 },
    { field: "field_name", headerName: "Field Name", width: 250 },
    { field: "mapping", headerName: "Mapping", width: 200 },
    { field: "data_type", headerName: "Data Type", width: 200 },
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
            <FaEllipsisV /> {/* Using react-icons instead of Font Awesome */}
          </div>
          {selectedMenuItem === row.id && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
              {/* Implement your actions buttons here */}
            </div>
          )}
        </div>
      ),
    },
  ];

  const renderInputField = () => {
    switch (formData.dataType) {
      case "date":
        return (
          <TextField
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
            className="mt-2"
          />
        );
      case "textfield":
        return (
          <TextField
            label="Text Field"
            name="textfield"
            value={formData.textfield}
            onChange={handleChange}
            fullWidth
            className="mt-2"
          />
        );
      case "longtext":
        return (
          <TextField
            label="Long Text"
            name="longtext"
            value={formData.longtext}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            className="mt-2"
          />
        );
      case "checkbox":
        return (
          <FormControlLabel
            className="mt-2"
            control={
              <Checkbox
                checked={formData.checkbox || false}
                onChange={(e) =>
                  setFormData({ ...formData, checkbox: e.target.checked })
                }
              />
            }
            label="Checkbox"
          />
        );
      case "radiobutton":
        return (
          <FormControl component="fieldset" className="mt-2">
            <RadioGroup
              name="radiobutton"
              value={formData.radiobutton || ""}
              onChange={(e) =>
                setFormData({ ...formData, radiobutton: e.target.value })
              }
            >
              <FormControlLabel
                value="option1"
                control={<Radio />}
                label="Option 1"
              />
              <FormControlLabel
                value="option2"
                control={<Radio />}
                label="Option 2"
              />
            </RadioGroup>
          </FormControl>
        );
      case "autocomplete":
        return (
          <Autocomplete
            options={["Option 1", "Option 2", "Option 3"]}
            renderInput={(params) => (
              <TextField {...params} label="Autocomplete" />
            )}
            value={formData.autocomplete || ""}
            onChange={(e, newValue) =>
              setFormData({ ...formData, autocomplete: newValue })
            }
            fullWidth
            className="mt-2"
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Box className="fixed top-0 left-0 w-full z-10 bg-white shadow">
        {/* Your header content here */}
      </Box>
      <Box className="flex justify-center items-center min-h-screen bg-gray-100 py-4">
        <Box className="w-full max-w-6xl bg-white p-4 rounded shadow-md">
          <Typography
            variant="h4"
            className="text-center mb-4 text-3xl text-white bg-gray-400 p-3"
          >
            Token Registry
          </Typography>
          <div className="bg-gray-50 p-2 rounded shadow-inner">
            <DataGrid
              rows={menuItems}
              columns={columns}
              pageSize={10}
              components={{
                Toolbar: () => <CustomToolbar handleModal={handleModalOpen} />,
              }}
              className="data-grid"
            />
          </div>
          <Modal open={isModalOpen} onClose={handleModalClose} centered>
            <Box className="w-full max-w-lg bg-white p-4 rounded shadow-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Extension onSubmit={handleFormSubmit} />
              <Typography variant="h5" className="flex items-center mb-4">
                <Link to="/Extension">
                  <AirplanemodeActiveIcon className="mr-2" />
                </Link>
                Add Item
              </Typography>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleFormSubmit(formData.dataType);
                }}
              >
                <div className="mb-2">
                  <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="mb-2">
                  <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div className="mb-2">
                  <TextField
                    label="Testing"
                    name="testing"
                    value={formData.testing}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                {renderInputField()}
                <div className="mt-4">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </Box>
          </Modal>
        </Box>
      </Box>
    </>
  );
}

export default CodeExtension;
