import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header, Home, Cart, NotFound } from './pages/_All';

import './scss/app.scss';

export function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/сart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
