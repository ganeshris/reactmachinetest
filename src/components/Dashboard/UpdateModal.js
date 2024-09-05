import React, { useState, useEffect } from 'react';

const UpdateModal = ({ user, onUpdate, onClose }) => {
  const [updatedUser, setUpdatedUser] = useState(() => ({ ...user }));

  useEffect(() => {
    console.log('Updated user state:', updatedUser);
  }, [updatedUser]);

  const handleChange = (field, value) => {
    const updatedData = { ...updatedUser, [field]: value };
    setUpdatedUser(updatedData);
  };
  const handleSave = () => {
    onUpdate(updatedUser);
    onClose();
  };
  
  // const handleUpdate = () => {
  //   console.log('Before update:', updatedUser);
  //   onUpdate(updatedUser);

  //   onClose();
  

  //   // Use a callback function with setUpdatedUser to ensure the state is updated
  //   setUpdatedUser((prev) => {
  //     const updatedData = { ...prev };
  //     console.log('Updated data:', updatedData);

  //     onUpdate(updatedData); // Pass the updatedData to onUpdate
  //     onClose();
  //     return updatedData; // Return the updatedData to setUpdatedUser
  //   });

  //   // Set the updatedUser state directly to ensure the UI reflects the changes
  //   setUpdatedUser(updatedUser);
  // };

  return (
    <div className="modalWrapper">
      <div className="modal">
        <button className="closeBtn" onClick={onClose}>
          X
        </button>
        <div>User ID: {user.userId}</div>
        <div>Username: {user.username}</div>
        <div>Full Name: {user.fullName}</div>

        <div>Email: {user.email}</div>
        
        <div>Mob Number: {user.mobno}</div>
        <div>User grp name: {user.usergrpname}</div>

        <label htmlFor="updatedUserId">User ID:</label>
        <input
          id="updatedUserId"
          type="text"
          value={updatedUser.userId}
          onChange={(e) => handleChange('userId', e.target.value)}
        />

        <label htmlFor="updatedUsername">Username:</label>
        <input
          id="updatedUsername"
          type="text"
          value={updatedUser.username}
          onChange={(e) => handleChange('username', e.target.value)}
        />

        <label htmlFor="updatedEmail">Email:</label>
        <input
          id="updatedEmail"
          type="text"
          value={updatedUser.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />

        <label htmlFor="updatedFullName">Full Name:</label>
        <input
          id="updatedFullName"
          type="text"
          value={updatedUser.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
        />
<label htmlFor="updatedMobno">Mob No:</label>
        <input
          id="updatedmobno"
          type="number"
          value={updatedUser.mobno}
          onChange={(e) => handleChange('mobno', e.target.value)}
        />
<label htmlFor="updatedusergrpname">User grp name:</label>
        <input
          id="updatedusergrpname"
          type="text"
          value={updatedUser.usergrpname}
          onChange={(e) => handleChange('usergrpname', e.target.value)}
        />

        <button onClick={handleSave}>SAVE</button>
      </div>
    </div>
  );
};

export default UpdateModal;
