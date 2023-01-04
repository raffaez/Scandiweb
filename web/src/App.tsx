import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Nav from './components/nav/Nav';
import ProductAdd from './pages/productAdd/ProductAdd';
import ProductList from './pages/productList/ProductList';

function App() {
  return (
    <Router>
      <Nav />
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        />
      <div style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/list" element={<ProductList />} />
          <Route path="/add" element={<ProductAdd />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
