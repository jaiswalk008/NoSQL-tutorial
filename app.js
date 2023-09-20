const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
// const User = require('./models/user');
const app = express();
const mongoose = require('mongoose');
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findUserById("6509d45b4bae1e1856c667ab")
//     .then(user => {
//       req.user = new User(user.name,user.email,user.cart,user._id);
//        next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://jaiskaran008:pf171f94@cluster0.wme3ynu.mongodb.net/shop?retryWrites=true&w=majority')
.then(()=> app.listen(3000))
.catch(err=> console.log(err));
