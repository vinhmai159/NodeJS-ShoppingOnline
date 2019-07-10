const express = require('express');
const router = express.Router();
const UserController = require('../controllers/users');
const AdminController = require('../controllers/admin/admin');
const CartContrllers = require('../controllers/cart');
const validateToken = require('../midleWare/validateUser');

router.route('/logIn')
        .post(UserController.logIn);
// router.route('/register')
//         .post(UserController.register)
router.post('/register', UserController.register)

router.route('/rolers')
        .get(validateToken.checkToken, UserController.roles)

// router.route('/:userId')
//         .get(UserController.shwId)
//         .put(UserController.update)
//         .delete(UserController.delete)

router.route('/:userId/cart/delete')
        .patch(validateToken.checkToken, CartContrllers.deleteFromCart) //delete products into cart

router.route('/:userId/cart')
        .get(validateToken.checkToken, CartContrllers.showCart)
        .patch(validateToken.checkToken, CartContrllers.inserToCart); //insert products into cart

router.route('/:userId/permissinon')
        .put(validateToken.checkToken, AdminController.permissions)

module.exports = router;