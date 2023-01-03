import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/nav/Nav';
import ProductList from './pages/productList/ProductList';

function App() {
  return (
    <Router>
      <Nav />
      <div style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          {/* <Route path="/add" element={<AddProduct />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
