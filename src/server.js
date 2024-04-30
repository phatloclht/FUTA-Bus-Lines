const express = require('express');
const path = require('path');
//const mssqlConfig = require('./index.js');
const configViewEngine = require('./Configs/viewEngine.js');
const { connectToDb, getDb } = require('./Configs/connect.js')
const app = express()
const port = 3000;
const ViewEngine = configViewEngine.configViewEngine(app);
let db
app.use(express.static(path.join(__dirname, "/Public/")));


connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('app listening port 3000')
        })
        db = getDb()
    }
})

app.get('/', async (req, res) => {
    res.render('Home.ejs')
})

app.get('/Home', async (req, res) => {
    res.render('Home.ejs')
})

app.get('/Search', async (req, res) => {
    try {
        console.log(req.query.keyword1);
        console.log(req.query.keyword2);
        //const result = await db.collection('MOVIES').findOne({ title: req.query.keyword });
        //const result = await db.collection('MOVIES').findOne({ title: { $regex: req.query.keyword, $options: 'i' } });
        // const result = await db.collection('Bus').find({
        //     $or: [
        //         { Departure: { $regex: req.query.keyword1, $options: 'i' } },
        //         { Destination: { $regex: req.query.keyword2, $options: 'i' } }
        //     ]
        // }).toArray();

        // if (result) {
        //     res.render('Search.ejs', { bus: result });
        // } else {
        //     res.render('Error.ejs', { message: "Chuyến xe này không tồn tại" });
        // }
        let query = {};

        if (req.query.keyword1) {
            query.Departure = { $regex: req.query.keyword1, $options: 'i' };
        }

        if (req.query.keyword2) {
            query.Destination = { $regex: req.query.keyword2, $options: 'i' };
        }

        if (!req.query.keyword1 && !req.query.keyword2) {
            return res.render('Error.ejs', { message: "Vui lòng nhập từ khóa tìm kiếm" });
        }

        const result = await db.collection('Bus').find({ $or: [query] }).toArray();

        if (result) {
            res.render('Search.ejs', { bus: result });
        } else {
            res.render('Error.ejs', { message: "Chuyến xe này không tồn tại" });
        }

    }
    catch (err) {
        console.error('Đã xảy ra lỗi khi tìm kiếm: ', err);
        res.render('Error.ejs', { message: "Đã xảy ra lỗi khi tìm kiếm" });
    }
})

// app.listen(port, () => {
//     console.log(`Example app listening on port http://localhost:${port}`)
// })