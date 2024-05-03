/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from "react-router-dom";
const News = () => {
  const [cardData, setCardData] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = (searchParams.get('type')) ? searchParams.get('type') : '';

  const fetchInfo = () => {
    return axios.get(`http://localhost:3001/get-news?type=` + type)
      .then((result) => {
        //  console.log(result.data);
        setCardData(result.data)
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const displayedCardData = Array.isArray(cardData) ? cardData.slice(0, 3) : [];
  return (
    <div>

      <div>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossOrigin="anonymous">
        </link>
        {/* <button onClick={handleWrite}>Write to Redis</button> */}
        <div className="container-flud">
          <div className="container w-50 " style={{ textAlign: 'start' }}>
            <div className="row row-cols-1 row-cols-md-4 g-4">
              {/* Render các card từ dữ liệu */}
              <a href="/news" className="col btn btn-light">Tin tức tổng hợp</a>
              <a href="/news?type=futabus-line" className="col btn btn-light">FUTA Bus Lines</a>
              <a href="/news" className="col btn btn-light">FUTA City Bus</a>
              <a href="/news" className="col btn btn-light">Khuyến mãi</a>
            </div>
          </div>
          {Array.isArray(cardData) && cardData &&
            <div>
              <div className="container">
                <div className="d-flex">
                  <h3>Tin tức nổi bật</h3>
                  <div style={{ border: 'none', borderTop: '3px solid black', width: '78%', margin: '20px 40px 40px auto' }} />
                </div>
                <div className="row row-cols-1 row-cols-md-4 g-4">
                  {/* Render các card từ dữ liệu */}
                  <div className="col">
                    <div style={{ backgroundColor: 'orange', borderRadius: '10px', padding: '20px', height: '208px' }}>
                      <h3 style={{ textAlign: 'center', color: 'white', paddingTop: '50px' }}>Tiêu điểm</h3>
                      <h5 style={{ textAlign: 'center', color: 'white' }}>FUTA City Bus</h5>
                    </div>
                  </div>
                  {Array.isArray(displayedCardData) && displayedCardData.map(card => (
                    <div key={card.id} className="col-3">
                      <div className="card p-0" style={{ width: '17rem' }}>
                        <a href={`/new-detail?id=` + card.id}>
                          <img src={card.imageUrl} className="card-img-top" alt={`Card ${card.id}`} />
                        </a>
                        <h5 className="card-title " style={{ textAlign: 'start' }}>{card.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted " style={{ textAlign: 'start' }}>{card.time}</h6>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
              <div className="container pt-4">
                <div className="d-flex">
                  <h3>Tất cả tin tức</h3>
                  <div style={{ border: 'none', borderTop: '3px solid black', width: '80%', margin: '20px 40px 40px auto' }} />
                </div>
                <div className="row row-cols-1 row-cols-md-4 g-4">
                  {/* Render các card từ dữ liệu */}

                  {Array.isArray(cardData) && cardData.map(card => (
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
          }
        </div>
      </div>

    </div>

  );
};

export default News;
