import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { NotesProvider } from "./Context/NotesProvider";
import { AuthProvider } from "./Context/AuthProvider";


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <NotesProvider>
        <App />
      </NotesProvider>
    </AuthProvider> 
  </React.StrictMode>,
  document.getElementById('root')
);


