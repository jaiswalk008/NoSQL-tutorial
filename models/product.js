const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const product = new Schema({
  title:{
    type: String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  imageUrl:{
    type:String,
    required:true
  }
});
//though mongodb is schemaless still we are creating schema to let mongoose know
// about the typf of data we are working with. Also we can still create a prodouct without any particular
//attribute
module.exports = mongoose.model('Product', product);//model connects to  a schema




// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// class Product {
//   constructor( title, price, description, imageUrl, id ,userId) {
     
//     this.title = title;
//     this.price = price;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this._id = id;
//     this.userId= userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if(this._id){
//       //update the product
//       dbOp = db.collection('products').updateOne({
//         _id: new mongodb.ObjectId(this._id)
//       }, {$set: this});
//       //set is used to update the document can't use this alone as it will replace the existing document
//       //_id does not gets overriden
//     }
//     else{
//       dbOp = db.collection('products').insertOne(this)
//     }
    
//     return dbOp
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
        
//         console.log(err);
//       });
//   }
//   static fetchAll() {
//      const db = getDb();
//     //find returns a cursor which is an object allowing to go over objects one by one
//     return db.collection('products').find().toArray()
//     .then(products => {
//       // console.log(products)
//       return products;
//     })
//     .catch(err => console.log(err));
//   }
//   static findById(prodId){
//     const db = getDb();
//     //mongodb stores _id in BSON format which is binaryformsat of json because its faster to work
//     //with and also mongodb can store its own type
//     return db.collection('products').find({_id: new mongodb.ObjectId(prodId)}).next()
//     .then(product =>{
//       console.log(product);
//       return product;
//     })
//     .catch(err => console.log(err));
//   }
//   static deleteProduct(prodId){
//     const db = getDb();
//     return db.collection('products').deleteOne({_id:new mongodb.ObjectId(prodId)})
//     .then(res =>{
//       console.log("delete product");
       
//     })
//     .catch(err => console.log(err));
//   }
// }

// module.exports = Product;
