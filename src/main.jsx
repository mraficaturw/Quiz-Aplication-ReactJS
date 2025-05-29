import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QuizProvider } from './context/QuizContext.jsx'; // Tambahkan ekstensi .jsx
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QuizProvider>
      <App />
    </QuizProvider>
  </React.StrictMode>
);