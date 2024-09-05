import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BuildIcon from "@mui/icons-material/Build";
import AddIcon from "@mui/icons-material/Add";

// Define the API base URL using the environment variable
const api = process.env.REACT_APP_API_BASE_URL;

const DynamicTable = () => {
  const [forms, setForms] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.formData) {
      setForms((prevForms) => [...prevForms, location.state.formData]);
    } else {
      fetchForms();
    }
  }, [location.state]);

  const fetchForms = async () => {
    const token = localStorage.getItem("authToken"); // Get token from local storage
    try {
      const response = await axios.get(`${api}/api/form_setup`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (Array.isArray(response.data)) {
        setForms(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setForms([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setForms([]);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("authToken"); // Get token from local storage
    try {
      await axios.delete(`${api}/api/form_setup/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchForms();
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  const handleBuild = async (id) => {
    const token = localStorage.getItem("authToken"); // Get token from local storage
    try {
      await axios.post(
        `${api}/api/dynamic_form_build`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error building form:", error);
    }
  };

  const handleAdd = () => {
    navigate("/form");
  };

  return (
    <Box className="p-5 bg-gray-100 min-h-screen">
      <Typography
        variant="h4"
        gutterBottom
        className="text-center text-white bg-gray-700 text-3xl p-3 mb-5 rounded"
      >
        Dynamic Form
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAdd}
        className="mb-5 bg-blue-500 hover:bg-blue-600"
      >
        Add
      </Button>
      <TableContainer component={Paper} className="overflow-x-auto">
        <Table>
          <TableHead className="bg-gray-300 text-black">
            <TableRow>
              <TableCell>Go To</TableCell>
              <TableCell>Form Name</TableCell>
              <TableCell>Form Description</TableCell>
              <TableCell>Related To</TableCell>
              <TableCell>Page Event</TableCell>
              <TableCell>Button Caption</TableCell>
              <TableCell>Go To Form</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {forms.map((form, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Button
                    variant="outlined"
                    startIcon={<BuildIcon />}
                    onClick={() => handleBuild(form.id)}
                    className="border-blue-500 text-blue-500 hover:bg-blue-100"
                  >
                    Build
                  </Button>
                </TableCell>
                <TableCell>{form.formName}</TableCell>
                <TableCell>{form.formDescription}</TableCell>
                <TableCell>{form.relatedTo}</TableCell>
                <TableCell>{form.pageEvent}</TableCell>
                <TableCell>{form.buttonCaption}</TableCell>
                <TableCell>{form.goToForm}</TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(form.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DynamicTable;
