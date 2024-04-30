const express = require('express')
// const { connectToDb, getDb } = require('./connect')

// const app = express()
// let db

// connectToDb((err) => {
//     if (!err) {
//         app.listen(3000, () => {
//             console.log('app listening port 3000')
//         })
//         db = getDb()
//     }
// })

// app.get('/MOVIES', (req, res) => {
//     let books = []
//     db.collection('MOVIES')
//         .find()
//         .forEach(book => books.push(book))
//         .then(() => {
//             res.status(200).json(books) //trả về thành công
//         })
//         .catch(() => {
//             res.status(500).json({ error: 'Could not fetch the document' })
//         })
// })

const configViewEngine = (app) => {
    app.set("view engine", "ejs");
    app.set("Views", "./src/Views") //tat ca file ejs phai viet trong views
}

module.exports = {
    configViewEngine
}