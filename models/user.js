const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  cart:{
    items:[
      {productId:{ type: Schema.Types.ObjectId ,ref:'Product',  required:true}, 
      quantity:{type:Number , required:true}}
    ]
  }
})
//we can create functions for schemas
user.methods.addToCart = function (product){
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
          updatedCartItems.push({productId: product._id, quantity:newQuantity})
        }
        const updatedCart = { items: updatedCartItems};
        this.cart = updatedCart;
        return this.save()
        .then((res) => console.log('cart updated'))
        .catch(er => console.log(err));
      
}

user.methods.removeFromCart = function(productId){
  const updatedCartItems= this.cart.items.filter(item =>{
    return item.productId.toString() !== productId.toString();
  });
  this.cart.items= updatedCartItems;
  return this.save()
}

user.methods.clearCart = function (){
  this.cart ={items:[]};
  return this.save();
}

module.exports = mongoose.model('User',user)

// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// class User{
//   constructor(username,email,cart,id){
//     this.username= username;
//     this.email = email;
//     this.cart = cart;
//     this._id= id;
//   }
//   save(){
//     const db = getDb();
//     return db.collection('users').insertOne(this)
//     .then(res => console.log(res))
//     .catch(err=> console.log(err));
//   }
//   addToCart(product){
//     const cartProductIndex =this.cart.items.findIndex((cp)=>{
//       console.log(cp.productId.toString().trim() , product._id.toString().trim());
//       return cp.productId.toString().trim() == product._id.toString().trim();
//     });
//     let newQuantity=1;
//     const updatedCartItems= [...this.cart.items];
//     if(cartProductIndex>=0){
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1; 
//       updatedCartItems[cartProductIndex].quantity= newQuantity;
//     }
//     else{
//       updatedCartItems.push({productId: new mongodb.ObjectId(product._id), quantity:newQuantity})
//     }
//     const updatedCart = { items: updatedCartItems};
//     const db = getDb();
//     return db.collection('users').updateOne({
//       _id: new mongodb.ObjectId(this._id)
//     }, {$set:{cart:updatedCart}})
//     .then((res) => console.log('cart updated'))
//     .catch(er => console.log(err));
//   }
//   addOrder(){
//     const db = getDb();
//     return this.getCart()
//     .then(products =>{
//       const order ={
//         items : products,
//         user:{
//           _id: new mongodb.ObjectId(this._id),
//           name:this.username,
//           email:this.email
//         }
//       }
//       // console.log('order created')
//       // console.log(order);
//       return db.collection('orders').insertOne(order)
//     })
//     .then(result =>{
//       this.cart= {items:[]};
//       return db.collection('users').updateOne({
//           _id: new mongodb.ObjectId(this._id)
//         }, {$set:{cart:{items:[]}}})
//       .then(() => console.log('order placed'))
//       .catch(err=>console.log(err))
      
//     })
//     .catch(err => console.log(err));
//   }
//   getOrders(){
//     const db = getDb();
//     //'' for giving path since orders have nested documents
//     return db.collection('orders').find({'user._id': new mongodb.ObjectId(this._id)}).toArray()
    
//   }
//   static findUserById(userId){
//     const db = getDb();
//     return db.collection('users').find({_id: new mongodb.ObjectId(userId)}).next()
//     .then(user => {
//       console.log(user);
//       return user;

//     })
//     .catch(err => console.log(err));
//   } 
//   getCart(){
//     const db = getDb();
//     const productIds= this.cart.items.map(item => item.productId)
//     // console.log(productIds);
//     return db.collection('products').find({_id: {$in: productIds}}).toArray()
//     .then(products =>{
//       return products.map(p =>{
//         // console.log(p);
//         return {...p, quantity: this.cart.items.find( i =>{
//           return i.productId.toString() ==p._id.toString();
//         }).quantity}
//       })
//     })
//   }
//   deleteItemFromCart(productId){
//     const updatedCartItems= this.cart.items.filter(item =>{
//       return item.productId.toString() !== productId.toString();
//     });
//     const db = getDb();
//     return db.collection('users').updateOne({
//       _id: new mongodb.ObjectId(this._id)
//     }, {$set:{cart:{items: updatedCartItems}}})
//     .then((res) => console.log('cart updated'))
//     .catch(err => console.log(err));
//   }
// }
// module.exports = User;
