// AddUserGroupModal.js
import React, { useState } from 'react';
import './Modelitem.css';

const AddUserGroupModal = ({ showModal, handleCloseModal, onSave }) => {
  const [newUserData, setNewUserData] = useState({
    groupName: '',
    groupDesc: '',
    createBy: '',
    createDate: '',
    updateDate: '',
    updateBy: '',
    status: '',
    groupLevel: '',
    createDateFormatted: '',
    updateDateFormatted: '',
    // Add more fields as needed
  });

  
  const handleSave = () => {
    // Format date fields before saving
    const formattedData = {
      ...newUserData,
      createDate: new Date(newUserData.createDate).toISOString(),
      updateDate: new Date(newUserData.updateDate).toISOString(),
    };
  
    onSave(formattedData); // Pass the new data to the parent component
    handleCloseModal(); // Close the modal after saving
  };
  
  const handleCancel = () => {
    setNewUserData({
      groupName: '',
      groupDesc: '',
      createBy: '',
      createDate: '',
      updateDate: '',
      updateBy: '',
      status: '',
      groupLevel: '',
      createDateFormatted: '',
      updateDateFormatted: '',
      // Reset other fields as needed
    });
    handleCloseModal();
  };

  return (
    <>
      {showModal && (
        <div className='modalWrapper'>
          <div className='modal'>
            <button className="closeBtn" onClick={handleCancel}>X</button>

            <label htmlFor="groupName">Group Name:</label>
            <input
              type="text"
              id="groupName"
              value={newUserData.groupName}
              onChange={(e) => setNewUserData((prevData) => ({ ...prevData, groupName: e.target.value }))}
            />

            <label htmlFor="groupDesc">Group Description:</label>
            <input
              type="text"
              id="groupDesc"
              value={newUserData.groupDesc}
              onChange={(e) => setNewUserData((prevData) => ({ ...prevData, groupDesc: e.target.value }))}
            />

            <label htmlFor="createBy">Create By:</label>
            <input
              type="text"
              id="createBy"
              value={newUserData.createBy}
              onChange={(e) => setNewUserData((prevData) => ({ ...prevData, createBy: e.target.value }))}
            />

            <label htmlFor="createDate">Create Date:</label>
            <input
              type="date"
              id="createDate"
              value={newUserData.createDate}
              onChange={(e) => setNewUserData((prevData) => ({ ...prevData, createDate: e.target.value }))}
            />

            <label htmlFor="updateDate">Update Date:</label>
            <input
              type="text"
              id="updateDate"
              value={newUserData.updateDate}
              onChange={(e) => setNewUserData((prevData) => ({ ...prevData, updateDate: e.target.value }))}
            />

            <label htmlFor="updateBy">Update By:</label>
            <input
              type="text"
              id="updateBy"
              value={newUserData.updateBy}
              onChange={(e) => setNewUserData((prevData) => ({ ...prevData, updateBy: e.target.value }))}
            />

            <label htmlFor="status">Status:</label>
            <input
              type="text"
              id="status"
              value={newUserData.status}
              onChange={(e) => setNewUserData((prevData) => ({ ...prevData, status: e.target.value }))}
            />

            <label htmlFor="groupLevel">Group Level:</label>
            <input
              type="text"
              id="groupLevel"
              value={newUserData.groupLevel}
              onChange={(e) => setNewUserData((prevData) => ({ ...prevData, groupLevel: e.target.value }))}
            />

            <label htmlFor="createDateFormatted">Create Date Formatted:</label>
            <input
              type="text"
              id="createDateFormatted"
              value={newUserData.createDateFormatted}
              onChange={(e) => setNewUserData((prevData) => ({ ...prevData, createDateFormatted: e.target.value }))}
            />

            <label htmlFor="updateDateFormatted">Update Date Formatted:</label>
            <input
              type="text"
              id="updateDateFormatted"
              value={newUserData.updateDateFormatted}
              onChange={(e) => setNewUserData((prevData) => ({ ...prevData, updateDateFormatted: e.target.value }))}
            />

            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddUserGroupModal;
