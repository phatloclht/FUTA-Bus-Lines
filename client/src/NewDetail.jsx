/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from "react-router-dom";
const NewDetail = () => {
  const [cardData, setCardData] = useState('');
  const [newDetail, setNewDetail] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const fetchInfo = () => {
    axios.get(`http://localhost:3001/get-news?type=futabus-line`)
      .then((result) => {
        console.log(result.data);
        setCardData(result.data)
      });
    axios.get(`http://localhost:3001/get-new-detail?id=` + id)
      .then((result) => {
        //   console.log(result.data);
        setNewDetail(result.data)
      });
  };
  

  useEffect(() => {
    fetchInfo();
  }, []);

  const displayedCardData =  cardData.slice(0, 4) ;
  return (
    <div className="container-flud">
      {newDetail && (
        <div className="text-align-start">
          <h4 className="card-title " style={{ textAlign: 'start' }}>{newDetail.title}</h4>
          <h6 className="card-subtitle my-2 text-muted " style={{ textAlign: 'start' }}>Ngày đăng: &ensp;{newDetail.time}</h6>


          <img src={newDetail.imageUrl} className="card-img-top" alt={`Card ${cardData.id}`} />
          <div style={{ textAlign: 'left', fontSize: '20px' }} dangerouslySetInnerHTML={{ __html: newDetail.content }} />
        </div>
      )}
      <div className="container pt-4">
        <div className="d-flex">
          <h3>Tin tức liên quan</h3>
          <div style={{ border: 'none', borderTop: '3px solid black', width: '75%', margin: '20px 40px 40px auto' }} />
        </div>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {/* Render các card từ dữ liệu */}

          {Array.isArray(displayedCardData) && displayedCardData.map(card => (
            <div key={card.id} className="col-3">
              <div className="card p-0" style={{ width: '17rem' }}>
                <img src={card.imageUrl} className="card-img-top" alt={`Card ${card.id}`} />

                <h5 className="card-title " style={{ textAlign: 'start' }}>{card.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted " style={{ textAlign: 'start' }}>{card.time}</h6>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewDetail;
