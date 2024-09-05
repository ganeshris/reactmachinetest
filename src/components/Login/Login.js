import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import './Login.css'; // Import CSS file for custom styling

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_TOKEN_SESSION = `${API_BASE_URL}/token/session`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Email and password are required.');
      return;
    }

    try {
      const response = await fetch(API_TOKEN_SESSION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Login failed:', errorText);
        setErrorMessage('Login failed. Please check your credentials.');
        return;
      }

      const data = await response.json();
      console.log('Login response:', data);

      if (data.operationStatus !== 'SUCCESS') {
        console.error('Login failed:', data.operationMessage);
        setErrorMessage(data.operationMessage || 'Login failed. Please try again.');
        return;
      }

      localStorage.setItem('authToken', data.item.token);
      localStorage.setItem('user', JSON.stringify(data.item));
      console.log('Token stored in local storage:', data.item.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred during login. Please try again later.');
    }
  };

  const handleForgotPassword = () => {
    navigate('/ForgotPassword');
  };

  const handleCreateAccount = () => {
    navigate('/CreateAccount');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-700">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-gray-100 text-9xl font-bold opacity-75">
          CLOUDNSURE
        </div>
      </div>
      <div className="relative w-full max-w-md bg-white shadow-md rounded-lg p-6 z-10 ">
        <div className="flex items-center justify-center mb-6">
          <AccountCircle className="text-7xl text-gray-700" />
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4 ">Log in</h2>
        {errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-gray-600">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:ring-opacity-50"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className=""
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="form-checkbox"
              />
              <span className="ml-2 text-gray-600">Remember Me</span>
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-blue-600 hover:underline focus:outline-none"
            >
              Forgot password?
            </button>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={handleCreateAccount}
              className="text-blue-600 hover:underline focus:outline-none"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
