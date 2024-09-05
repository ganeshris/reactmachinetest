import React, { useState } from 'react';
import { TextField, Button, Typography, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Extension = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    type: '',
    fieldName: '',
    mapping: '',
    dataType: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === 'function') {
      onSubmit(formData.dataType);
    }
    // Navigate to CodeExtension page with the form data
    navigate('/Codeextension', { state: { formData } });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>Add Item</Typography>
      <form onSubmit={handleSubmit}>
        <div>
          <Select
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            fullWidth
            required
          >
            <MenuItem value="Header">Header</MenuItem>
            <MenuItem value="Line">Line</MenuItem>
          </Select>
        </div>
        <div>
          <TextField
            label="Field Name"
            name="fieldName"
            value={formData.fieldName}
            onChange={handleChange}
            fullWidth
            required
          />
        </div>
        <div>
          <Select
            label="Mapping"
            name="mapping"
            value={formData.mapping}
            onChange={handleChange}
            fullWidth
            required
          >
            {[...Array(15).keys()].map(num => (
              <MenuItem key={num + 1} value={`EXTN${num + 1}`}>{`EXTN${num + 1}`}</MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <Select
            label="Data Type"
            name="dataType"
            value={formData.dataType}
            onChange={handleChange}
            fullWidth
            required
          >
            <MenuItem value="textfield">Textfield</MenuItem>
            <MenuItem value="longtext">Longtext</MenuItem>
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="checkbox">Checkbox</MenuItem>
            <MenuItem value="radiobutton">Radiobutton</MenuItem>
            <MenuItem value="autocomplete">Autocomplete</MenuItem>
          </Select>
        </div>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Submit</Button>
      </form>
    </div>
  );
};

export default Extension;
