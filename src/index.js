// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';    // React 18+ createRoot API
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("No element with id='root' found in public/index.html");
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
