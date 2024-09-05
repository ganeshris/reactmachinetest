// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import './index.css';
import ErrorBoundary from './ErrorBoundary';

const theme = createTheme({
  // your theme configuration
});

ReactDOM.render(
  <ErrorBoundary>
    <ThemeProvider theme={theme}>
     
        <App />
      
    </ThemeProvider>
  </ErrorBoundary>,
  document.getElementById('root')
);
