const { MongoClient } = require('mongodb')

let dbConnection

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect('mongodb://localhost:27017/FutaBus')
            .then((client) => {
                dbConnection = client.db()
                return cb()
            })
            .catch(err => {
                console.log(err)
                return cb(err)
            })
    },
    getDb: () => dbConnection
}

// module.exports = {
//     server: "DESKTOP-Q8CECPE\\SQLSERVER",
//     driver: "msnodesqlv8",
//     database: "QLyDatHang_CSDL",
//     options: {
//         trustedConnection: true,
//     },
// };
