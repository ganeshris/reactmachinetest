import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import './Login.css'; // Import CSS file for custom styling

const CreateAccountPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [avatarImage, setAvatarImage] = useState(null);
  const navigate = useNavigate();

  const handleCreateAccount = (e) => {
    e.preventDefault();
    // Your create account logic here
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-800">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-gray-200 text-9xl font-bold opacity-10">
          CLOUDNSURE
        </div>
      </div>
      <div className="relative w-full max-w-md bg-white shadow-md rounded-lg p-6 z-10">
        <div className="flex items-center justify-center mb-6">
          <AccountCircle className="text-7xl text-gray-700" />
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Create Account</h2>
        <form onSubmit={handleCreateAccount} className="space-y-4">
          <div className="flex items-center justify-center">
            <input
              accept="image/*"
              id="avatar-input"
              type="file"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <label htmlFor="avatar-input" className="cursor-pointer">
              <img
                alt="Avatar"
                src={avatarImage || 'https://via.placeholder.com/120'}
                className="w-28 h-28 rounded-full mb-4"
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-gray-600">Re-enter Password</label>
            <input
              type="password"
              value={reEnterPassword}
              onChange={(e) => setReEnterPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-opacity-50"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 transition duration-300 ease-in-out"
            >
              Create Account
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-blue-600 hover:underline focus:outline-none"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;
