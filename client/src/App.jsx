/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element=<Signup /> />
        <Route path="/login" element=<Login /> />
        <Route path="/home" element=<Home /> />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
