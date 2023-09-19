const mongodb = require('mongodb');

const getDb = require('../util/database').getDb;

class User{
  constructor(username,email,cart,id){
    this.username= username;
    this.email = email;
    this.cart = cart;
    this._id= id;
  }
  save(){
    const db = getDb();
    return db.collection('users').insertOne(this)
    .then(res => console.log(res))
    .catch(err=> console.log(err));
  }
  addToCart(product){
    const cartProductIndex =this.cart.items.findIndex((cp)=>{
      console.log(cp.productId.toString().trim() , product._id.toString().trim());
      return cp.productId.toString().trim() == product._id.toString().trim();
    });
    let newQuantity=1;
    const updatedCartItems= [...this.cart.items];
    if(cartProductIndex>=0){
      newQuantity = this.cart.items[cartProductIndex].quantity + 1; 
      updatedCartItems[cartProductIndex].quantity= newQuantity;
    }
    else{
      updatedCartItems.push({productId: new mongodb.ObjectId(product._id), quantity:newQuantity})
    }
    const updatedCart = { items: updatedCartItems};
    const db = getDb();
    return db.collection('users').updateOne({
      _id: new mongodb.ObjectId(this._id)
    }, {$set:{cart:updatedCart}})
    .then((res) => console.log('cart updated'))
    .catch(er => console.log(err));
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
