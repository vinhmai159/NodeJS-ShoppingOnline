const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/products');
const CommentControllers = require('../controllers/comments');

const validateToken = require('../midleWare/validateUser');


router.route('/')
        .get(ProductsController.showAll)
        .post(validateToken.checkToken, ProductsController.insert);
   
router.route('/sale')
        .post(ProductsController.sale);

router.route('/hot')
        .post(ProductsController.hot);

router.route('/new')
        .get(ProductsController.new);

router.route('/searchByName')
        .post(ProductsController.searchName);
        
router.route('/sort')
        .post(ProductsController.sort);

router.route('/sortGenders')
        .post(ProductsController.sortGenders);
        
router.route('/:productId')
        .get(validateToken.checkToken, ProductsController.showId)
        .put(validateToken.checkToken, ProductsController.update)
        .patch(validateToken.checkToken, ProductsController.update)
        .delete(validateToken.checkToken, ProductsController.delete);

router.route('/:productId/insertCategories')
        .patch(validateToken.checkToken, ProductsController.insertCategories)
  
router.route('/:productId/removetCategories')
        .patch(validateToken.checkToken, ProductsController.removeCategories)      

router.route('/:productId/comment')
        .post(validateToken.checkToken, CommentControllers.comment)

router.route('/:productId/report')
        .post(validateToken.checkToken, CommentControllers.report)
module.exports = router;