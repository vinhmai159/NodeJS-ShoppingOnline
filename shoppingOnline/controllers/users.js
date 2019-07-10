const UserModel = require('../models/users');
const ProductModel = require('../models/products');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const jwtDecoded = require("jwt-decode")

function logIn (req, res) {
    UserModel.findOne({'email': req.body.email}, function (err, result) {
        if (err) {
            res.json(err);
        } else {
            if(bcrypt.compareSync( req.body.password, result.password)) {
                const token = jwt.sign({id: result._id}, 'secretKey', { expiresIn: '1h'});
            
                res.json({
                    status: 'success',
                    message: 'log in done',
                    data: { user: result,
                            token: token,
                        },
                })
            } else {
                res.json({
                    status: "error",
                    message: 'Invalid email or password',
                    data:null
                });
            }
        }
    })
}

function register (req, res) {
    let data = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        //cart: req.body.cart,
    };

    UserModel.create(data, (err, result) => {
        if (err) res.json(err);

        else {
            res.json({
                status: 'success',
                message: 'resgister successfully!',
            })
        }
    })
}

const mRoles = async (req, res) => {
    const userId = jwtDecoded(req.headers['x-access-token']).id;
    await UserModel.find({_id: userId})
                    .select('roles')
                    .exec( (err, result) => {
                        if (err) {
                            res.json(err);
                        } else {
                            console.log(result)
                            if (result[0].roles == 'admin') {
                                
                            } else if (result[0].roles == 'editors') {

                            } else if (result[0].roles == 'authors') {
                                
                            } else {

                            }
                        }
                    })
}

module.exports = {
    logIn: logIn,
    register: register,
    roles: mRoles
}