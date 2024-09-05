import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import './Login.css'; // Import CSS file for custom styling

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_FORGOT_PASSWORD = `${API_BASE_URL}/backend/api/resources/forgotpassword`;

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // State to manage message type for styling
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_FORGOT_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setMessage(`Reset password failed: ${errorText}`);
        setMessageType('error');
        return;
      }

      setMessage('Reset password email sent successfully. Please check your email.');
      setMessageType('success');
    } catch (error) {
      setMessage(`Error during reset password: ${error.message}`);
      setMessageType('error');
      console.error('Error during reset password:', error);
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
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Forgot Password</h2>
        <p className="text-center text-gray-600 mb-4">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-opacity-50"
              required
              autoFocus
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 transition duration-300 ease-in-out"
            >
              Reset Password
            </button>
          </div>
        </form>
        {message && (
          <div className={`mt-4 text-center ${messageType === 'error' ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </div>
        )}
        <p className="mt-4 text-center text-gray-600">
          Remember your password?{' '}
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
  );
};

export default ForgotPasswordPage;
