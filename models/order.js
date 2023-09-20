const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const order = new Schema({
  products:[{
    productData:{ type: Object , required:true},
    quantity:{type:Number , required:true}
  }],
  user:{
    name:{
      type:String,
      required:true
    },
    userId:{type: Schema.Types.ObjectId,required:true}
  }
})
module.exports = mongoose.model('Order',order);