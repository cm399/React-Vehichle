import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Builder from './components/Builder';
import { Toaster } from 'react-hot-toast';
import { toastOptions } from './consts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/build/:id" element={<Builder />} />
        <Route path="*" element={<div>404 - page not found!</div>} />
      </Routes>
      <Toaster toastOptions={{ ...toastOptions }} />
    </BrowserRouter>
  );
}

export default App;
