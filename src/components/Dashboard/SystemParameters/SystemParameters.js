import React, { useState } from "react";
import { Button, Container, Grid, TextField } from "@mui/material";

const SystemParameterForm = () => {
  const [formData, setFormData] = useState({
    schedulerTimer: "",
    leaseTaxCode: "",
    vesselConfirmationProcessLimit: "",
    rowToDisplay: "",
    linkToDisplay: "",
    rowToAdd: "",
    lovRowToDisplay: "",
    lovLinkToDisplay: "",
    oldServerName: "",
    oldBase: "",
    oldAdminUser: "",
    oldServerPort: "",
    userDefaultGroup: "",
    defaultDepartment: "",
    defaultPosition: "",
    singleCharge: "",
    firstDayOfWeek: "",
    hourPerShift: "",
    cnBillingFrequency: "",
    billingDepartmentCode: "",
    basePriceList: "",
    nonContainerServiceOrderAutoApprovalDeptCode: "",
    ediMAESchedulerOnOff: "",
    ediSchedulerOnOff: "",
    companyDisplayName: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      logo: event.target.files[0],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Form submitted successfully!");
    console.log("Form Data:", formData);
  };

  const handleClear = () => {
    setFormData({
      schedulerTimer: "",
      leaseTaxCode: "",
      vesselConfirmationProcessLimit: "",
      rowToDisplay: "",
      linkToDisplay: "",
      rowToAdd: "",
      lovRowToDisplay: "",
      lovLinkToDisplay: "",
      oldServerName: "",
      oldBase: "",
      oldAdminUser: "",
      oldServerPort: "",
      userDefaultGroup: "",
      defaultDepartment: "",
      defaultPosition: "",
      singleCharge: "",
      firstDayOfWeek: "",
      hourPerShift: "",
      cnBillingFrequency: "",
      billingDepartmentCode: "",
      basePriceList: "",
      nonContainerServiceOrderAutoApprovalDeptCode: "",
      ediMAESchedulerOnOff: "",
      ediSchedulerOnOff: "",
      companyDisplayName: "",
    });
  };

  return (
    <Container className="mt-5">
      <p className="bg-gray-400 text-center text-white text-3xl m-3 p-2">
        System Parameters
      </p>
      <form onSubmit={handleSubmit} className="m-5 p-5">
        <Grid container spacing={3}>
          {Object.keys(formData).map((key, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <TextField
                fullWidth
                label={key
                  .split(/(?=[A-Z])/)
                  .join(" ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <input type="file" onChange={handleFileChange} />
          </Grid>
        </Grid>
        <div style={{ textAlign: "end", marginTop: 20 }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginRight: 10 }}
          >
            Save
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default SystemParameterForm;
