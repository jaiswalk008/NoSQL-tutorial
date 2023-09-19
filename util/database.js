const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;//class from mongodb package
//_ - to signal that this will be used internally in the file
let _db;
const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://jaiskaran008:pf171f94@cluster0.wme3ynu.mongodb.net/shop?retryWrites=true&w=majority'
  )//shop is the name of the database and mogodb will either connect to it or create the databse

    .then(client => {
      console.log('Connected!');
      _db = client.db();//storing access to database
      callback(client);
      console.log(_db);
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};
function getDb(){
  if(_db) return _db;
  throw "No Database Found";
}
exports.mongoConnect = mongoConnect;

exports.getDb = getDb;
