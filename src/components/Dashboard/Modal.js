import React, { useState } from 'react';
import './Model.css';

const Modal = ({ setNewUser, newUser, onSave }) => {
  const [newUserState, setNewUserState] = useState(newUser);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = () => {
    const data = {  ...newUserState };
    onSave(data); // Pass the new data to the parent component
    setIsModalOpen(false); // Close the modal after saving
  };
  

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button onClick={handleOpenModal}>ADD ITEM</button>

      {isModalOpen && (
        <div className='modalWrapper'>
          <div className='modal'>
            <button className="closeBtn" onClick={handleClose}>X</button>

            <div className="input-group">
              <label htmlFor="userId">User ID:</label>
              <input
                type="text"
                id="userId"
                value={newUserState.userId}
                onChange={(e) => setNewUserState({ ...newUserState, userId: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={newUserState.username}
                onChange={(e) => setNewUserState({ ...newUserState, username: e.target.value })}
              />
            </div>
            <div className="input-group">
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                value={newUserState.fullName}
                onChange={(e) => setNewUserState({ ...newUserState, fullName: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                value={newUserState.email}
                onChange={(e) => setNewUserState({ ...newUserState, email: e.target.value })}
              />
            </div>

            

            <div className="input-group">
              <label htmlFor="mobileNumber">Mobile Number:</label>
              <input
                type="text"
                id="mobileNumber"
                value={newUserState.mobileNumber}
                onChange={(e) => setNewUserState({ ...newUserState, mobileNumber: e.target.value })}
              />
            </div>

            <div className="input-group">
              <label htmlFor="userGroup">User Group:</label>
              <input
                type="text"
                id="userGroup"
                value={newUserState.userGroup}
                onChange={(e) => setNewUserState({ ...newUserState, userGroup: e.target.value })}
              />
            </div>

            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
