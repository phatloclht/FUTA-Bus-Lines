/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import News from './News';
import NewDetail from './NewDetail';
import ContactForm from './ContactForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import ShowFeedBack from './ShowFeedback';


function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element=<Signup /> />
        <Route path="/login" element=<Login /> />
        <Route path="/home" element=<Home /> />
        <Route path="/news" element=<News /> />
        <Route path="/new-detail" element=<NewDetail /> />
        <Route path="/contact" element=<ContactForm /> />
        <Route path="/show-feedback" element=<ShowFeedBack /> />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
