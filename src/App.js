import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Shop from './components/Shop/Shop';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import routes from './routes';

function App() {
  return (
    <div className="App">
      <AppBar />
      <Routes>
        <Route path={routes.home} element={<Shop />} />
        <Route path={routes.shoppingCart} element={<ShoppingCart />} />
      </Routes>
    </div>
  );
}

export default App;
