import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  IconButton,
  InputAdornment
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';

const API_URL = `${process.env.REACT_APP_API_URL}/Formatest/Formatest`;
const token = localStorage.getItem("authToken");
// Custom styles using makeStyles
const useStyles = makeStyles((theme) => ({
  tableHeader: {
    backgroundColor: "#000000",
    color: "#ffffff",
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  searchInput: {
    marginRight: theme.spacing(2),
    flex: 1,
  },
  tableContainer: {
    marginTop: theme.spacing(2),
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  formControl: {
    marginBottom: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const EntityTable = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [newEntity, setNewEntity] = useState({
    emailid: "",

    pass: "",

    rollno: "",

    contact: "",

  });
  const [editEntity, setEditEntity] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteEntityId, setDeleteEntityId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5); // Adjust this value as needed
  const [searchQuery, setSearchQuery] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, data]);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${deleteEntityId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
      setSnackbarMessage("Successfully deleted!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting data:", error);
      setSnackbarMessage("Failed to delete!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post(API_URL, newEntity, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
      setNewEntity({
    emailid: "",

    pass: "",

    rollno: "",

    contact: "",

      });
      setShowAddModal(false);
      setSnackbarMessage("Successfully added!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error adding data:", error);
      setSnackbarMessage("Failed to add!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEntity({ ...newEntity, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditEntity({ ...editEntity, [name]: value });
  };

  const handleEdit = (entity) => {
    setEditEntity(entity);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/${editEntity.id}`, editEntity, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
      setShowEditModal(false);
      setSnackbarMessage("Successfully updated!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error updating data:", error);
      setSnackbarMessage("Failed to update!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleSearch = () => {
    const filtered = data.filter(
      (entity) =>


        entity.emailid.toLowerCase().includes(searchQuery.toLowerCase()) ||




        entity.pass.toLowerCase().includes(searchQuery.toLowerCase()) ||




        entity.rollno.toLowerCase().includes(searchQuery.toLowerCase()) ||




        entity.contact.toLowerCase().includes(searchQuery.toLowerCase())     );
    setFilteredData(filtered);
  };

  return (
    <div className="container mt-5">
      <Typography variant="h4" gutterBottom>
        Entity Table
      </Typography>
      <div className={classes.searchContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowAddModal(true)}
          className={classes.button}
        >
          Add Entity
        </Button>
        <TextField
          className={classes.searchInput}
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow >
  <th>emailid</th>

  <th>pass</th>

  <th>rollno</th>

  <th>contact</th>

            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((entity) => (
              <TableRow key={entity.id}>

              <td>{entity.emailid}</td>



              <td>{entity.pass}</td>



              <td>{entity.rollno}</td>



              <td>{entity.contact}</td>


                <TableCell>
                  <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    className={classes.button}
                    onClick={() => handleEdit(entity)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    className={classes.button}
                    onClick={() => {
                      setDeleteEntityId(entity.id);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={itemsPerPage}
        page={currentPage}
        onPageChange={handlePageChange}
      />
      <Dialog open={showEditModal} onClose={() => setShowEditModal(false)}>
        <DialogTitle>Edit Entity</DialogTitle>
        <DialogContent className={classes.dialogContent}>

<TextField
            label="Emailid"
            variant="outlined"
            fullWidth
            name="emailid"
            type="email"
            value={editEntity.emailid}
            onChange={handleChange}
            className="bg-secondary text-lightl"
          />

 <TextField
          fullWidth
          margin="normal"
          label="Pass"
          variant="outlined"
          type="password"
          name="pass"
          value={editEntity.pass}
          onChange={handleChange}
          required
        />

 <TextField
          fullWidth
          margin="normal"
          label="rollno"
          variant="outlined"
          type="number"
          name="rollno"
          value={newEntity.rollno}
          onChange={handleChange}
          required
        />

 <TextField
          fullWidth
          margin="normal"
          label="contact"
          variant="outlined"
          type="tel"
          name="contact"
          value={editEntity.contact}
          onChange={handleChange}
          required
        />

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEditModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showAddModal} onClose={() => setShowAddModal(false)}>
        <DialogTitle>Add Entity</DialogTitle>
        <DialogContent className={classes.dialogContent}>
<TextField
          fullWidth
          margin="normal"
          label="Emailid"
          variant="outlined"
          name="emailid"
          type="email"
          value={newEntity.emailid}
          onChange={handleChange}
          required
        />

 <TextField
          fullWidth
          margin="normal"
          label="Pass"
          variant="outlined"
          type="password"
          name="pass"
          value={newEntity.pass}
          onChange={handleChange}
          required
        />

 <TextField
          fullWidth
          margin="normal"
          label="rollno"
          variant="outlined"
          type="number"
          name="rollno"
          value={newEntity.rollno}
          onChange={handleChange}
          required
        />

<TextField
          fullWidth
          margin="normal"
          label="contact"
          variant="outlined"
          type="tel"
          name="contact"
          value={newEntity.contact}
          onChange={handleChange}
          required
        />

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this entity?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EntityTable;
