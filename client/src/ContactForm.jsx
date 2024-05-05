/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from "react-router-dom";
const ContactForm = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/contact', { name, email, phone, title, content })
      .then((result) => {
        console.log(result);
        if (result.data === 'Success') {
          navigate('/home');
        }
      })
      .catch((err) => console.log(err));
  };
  return (

    <div className="container card shadow-sm p-3 mb-5 bg-body rounded" style={{ width: '45%', backgroundColor: 'rgb(249 246 246)' }}>
      <form className="row g-3" onSubmit={handleSubmit}>
        <h1>Trang liên hệ</h1>
        <div className="col-md-6">
          <select className="form-control" disabled >
            <option value=" ">Futabuslines</option>
          </select>
        </div>

        <div className="col-md-6">
          <input type="text" className="form-control" name="name" id="name" aria-describedby="emailHelp"
            placeholder="Họ và tên" required
            onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="col-md-6">
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
            placeholder="Email" required
            onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="col-md-6">
          <input type="text" className="form-control" id="phone" aria-describedby="emailHelp"
            placeholder="Điện thoại" required
            onChange={(e) => setPhone(e.target.value)} />
        </div>

        <div className="col-md-12">
          <input type="text" className="form-control" id="subject" aria-describedby="emailHelp"
            placeholder="Tiêu đề" required
            onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="col-md-12">
          <textarea id="text" className="form-control" rows="4" cols="50" placeholder="Nội dung" required
            onChange={(e) => setContent(e.target.value)}>
          </textarea>
        </div>
        <div className="text-align-center">
          <button type="submit" className="btn" style={{ width: '100%', backgroundColor: '#efbc24' }}>Xác nhận</button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
