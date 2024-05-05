const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const cors = require('cors');
const UserModel = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/Futa-Bus');

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json('Success');
      } else {
        res.json('The password is incorrect');
      }
    } else {
      res.json('No record existed');
    }
  });
});

app.post('/register', (req, res) => {
  UserModel.create(req.body)
    .then((employees) => res.json(employees))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log('server is running: ' + 3001);
});


app.get('/get-news', async (req, res) => {
  // console.log(req.query)
  const { type } = req.query;
  const client = redis.createClient();
  await client.connect();
  let maxObj = await client.hGetAll('futabus-line-max');
  let max = parseInt(maxObj.max); // Chuyển đổi giá trị 'max' sang số nguyên

  let index = 1;
  let results = []; // Khởi tạo mảng kết quả

  while (index <= max) { // Sử dụng dấu <= để so sánh
    let ele = '';
    ele = await client.hGetAll(type + ':' + index);
    if (ele && Object.keys(ele).length > 0) {
      ele['id'] = index;
      results.push(ele);
    }
    index++; // Tăng index sau mỗi lần lặp
  }

  // console.log(results);
  return res.json(results); // Trả về dữ liệu từ Redis

});

app.get('/get-new-detail', async (req, res) => {
  const client = redis.createClient();
  await client.connect();
  const { id } = req.query; // Lấy giá trị của tham số ID từ query string
  // Thực hiện logic để lấy dữ liệu tương ứng với ID
  // Ví dụ: lấy dữ liệu từ cơ sở dữ liệu
  let result = await client.hGetAll('futabus-line:' + id);
  // Trả về dữ liệu
  //console.log(result);
  res.json(result);
});

app.post('/contact', async (req, res) => {

  // const { name, email, phone, title, content } = req.body;
  const client = redis.createClient();
  await client.connect();
  client.rPush('feedback', JSON.stringify(req.body), (err, reply) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Data inserted successfully:', reply);
    }
  });

  await client.disconnect();
});
app.get('/get-contact', async (req, res) => {

  // const { name, email, phone, title, content } = req.body;
  const client = redis.createClient();
  await client.connect();

  
  let results = await client.lRange('feedback', 0, -1);
  res.json(results);
  await client.disconnect();
  //res.json('redis run');
});