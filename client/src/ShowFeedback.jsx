/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from "react-router-dom";
const ShowFeedBack = () => {
  const [data, setData] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = (searchParams.get('type')) ? searchParams.get('type') : '';

  const fetchInfo = () => {
    return axios.get(`http://localhost:3001/get-contact`)
      .then((result) => {
        console.log(result.data);
        setData(result.data)
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (

    <div className="container card shadow-sm p-3 mb-5 bg-body rounded" style={{ width: '85%', backgroundColor: 'rgb(249 246 246)' }}>
<h1 className="mb-5">Tất cả feedback của người dùng</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Họ và tên</th>
            <th scope="col">Email</th>
            <th scope="col">Điện thoại</th>
            <th scope="col">Tiêu đề</th>
            <th scope="col">Nội dung</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.map((item, index) => (
            <tr  key={index}>
              <td>{index}</td>
              <td>{JSON.parse(item).name}</td>
              <td>{JSON.parse(item).email}</td>
              <td>{JSON.parse(item).phone}</td>
              <td>{JSON.parse(item).title}</td>
              <td>{JSON.parse(item).content}</td>

            </tr>
          ))}

        </tbody>
      </table>

    </div>

  );
};

export default ShowFeedBack;
