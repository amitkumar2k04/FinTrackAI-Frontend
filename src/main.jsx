import React from 'react';
// Axios is used throughout the application for HTTP requests.  By setting a default
// baseURL here we ensure that all relative API calls (e.g. `/api/finance`) are
// automatically prefixed with the backend URL.  The value is injected at build
// time from Vite's environment variables.  In development this should point
// to http://localhost:3000 and in production it should be the same domain as
// your deployed site.
import axios from 'axios';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Configure the axios base URL before rendering the app.  If the environment
// variable is undefined it falls back to an empty string, allowing relative
// paths to be used during development when the Vite proxy is configured.
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || '';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
