const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
  
let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    ""
  )
    .then((client) => {
      console.log("mongoDB connected");
      _db = client.db()
      callback(client);
    })
    .catch((err) => {
      console.log("mongoDB connect error", err);
    });
};

const getDb = () => {
  if(_db) {
    return _db;
  }
  throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;