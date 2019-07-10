const UserModel = require('../models/users');
const ProductModels =require('../models/products');

async function mShowCart (req, res) {
    let condition = {
        _id: req.params.userId,
    }
    try {
        let data = await pCart(condition);
        res.json(data);
    } catch (err) {
        res.json(err);
    }
}

function pCart (condition) {
    return new Promise( (resolve, reject) => {
        UserModel.find(condition)
                .populate('cart')
                .select('cart')
                .exec( (err, result) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    else {
                        resolve ({
                            status: 'success',
                            message: 'Show all products in your cart successfully!',
                            data: result,
                        })
                    }
                })
    })
}



async function mDeleteFromCart (req, res) {
    let data = {
       // $pull: {cart: { _id: '5d142f1b5761550f003eca77' }},
       $pull:  {cart: req.body.productIds},
    }
    try {
        let result = await pInsertFeild(req, data);
        res.json(result);
    } catch (err) {   
        res.json(err);
    }
}

async function mInsertToCart (req, res) {
    let data = {
        $push: {cart: req.body.productIds},
    }
    try {
        let result = await pInsertFeild(req,data);
        res.json(result);
    } catch (err) {   
        res.json(err);
    }
}


function pInsertFeild (req,data) {
    return new Promise( (resolve, reject) => {
        UserModel.findOneAndUpdate({_id: req.params.userId}, data, (err) => {
            if (err) {
                return reject (err);
            }
            else {
                return resolve ({
                    status: 'success',
                    message: 'Change(add/ delete) products from your cart is successfully!',
                });
            }
        });
    });
}
module.exports = {
    showCart: mShowCart,
    inserToCart: mInsertToCart,
    deleteFromCart: mDeleteFromCart
}