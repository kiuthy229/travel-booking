import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Tours from '../pages/Tours';
import TourDetails from '../pages/TourDetails';
import Register from '../pages/Register';
import Login from '../pages/Login';
import SearchResutlList from '../pages/SearchResutlList';
import Checkout from '../pages/Checkout';

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='/home' element={<Home />} />
      <Route path='/tours' element={<Tours />} />
      <Route path='/tours/:id' element={<TourDetails />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/tours/search' element={<SearchResutlList />} />
      <Route path='/checkout' element={<Checkout />} />
    </Routes>
  );
};

export default Routers;
