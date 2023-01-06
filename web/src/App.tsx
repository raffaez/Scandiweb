import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Nav from './components/nav/Nav';
import ProductAdd from './pages/productAdd/ProductAdd';
import ProductList from './pages/productList/ProductList';
import Footer from './components/footer/Footer';

function App() {
  return (
    <Router>
      <Nav />
      <div style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/list" element={<ProductList />} />
          <Route path="/add" element={<ProductAdd />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
