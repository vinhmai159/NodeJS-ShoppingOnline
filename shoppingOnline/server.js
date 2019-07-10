const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');


const usersRoutes = require('./routes/user');
const ProductsRoute = require('./routes/products');
const MenuRoutes = require('./routes/menu');
const AdminArticleRoutes = require('./routes/admin/articles');

const validateToken = require('./midleWare/validateUser');
const role = require('./midleWare/rolers');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

var mongoose = require('mongoose');


var mongoDB = 'mongodb://127.0.0.1/shoppingOnline';
mongoose.connect(mongoDB);

mongoose.Promise = global.Promise;

var db = mongoose.connection;

//Ràng buộc kết nối với sự kiện lỗi (để lấy ra thông báo khi có lỗi)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.get('/', (err, res) => {
    if(err) {
        console.log(err);
    }
    res.end('hello');
})

app.use('/user' ,  usersRoutes);

app.use('/products', ProductsRoute);

app.use('/menu', MenuRoutes);

app.use('/admin/articles', AdminArticleRoutes);


//acl
app.get('/info', (req, res) => {
    acl.allowedPermissions(getUserId(req),
     ['/user/userId/permissinon',
      '/products',
      '/admin/articles',
      '/user',
      '/products/:productId/comment',
      '/products/:productId/report'],
     (err, permission) => {
       res.json(permission);
    });
  });



app.listen(8009, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("SERVER run on port 8009");
})