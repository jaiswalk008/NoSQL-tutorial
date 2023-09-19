const mongodb = require('mongodb');

const getDb = require('../util/database').getDb;

class User{
  constructor(username,email){
    this.username= username;
    this.email = email;
  }
  save(){
    const db = getDb();
    return db.collection('users').insertOne(this)
    .then(res => console.log(res))
    .catch(err=> console.log(err));
  }
  static findUserById(userId){
    const db = getDb();
    return db.collection('users').find({_id: new mongodb.ObjectId(userId)}).next()
    .then(user => {
      console.log(user);
      return user;

    })
    .catch(err => console.log(err));
  } 
}
module.exports = User;
