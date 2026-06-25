import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/variables.css'; // Add this line right here to inject your design tokens!
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();