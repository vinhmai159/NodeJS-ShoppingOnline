const express = require('express');
const router = express.Router();

const AricleControllers = require('../../controllers/admin/articles');

const validateToken = require('../../midleWare/validateUser');

router.route('/' )
        .get( AricleControllers.showAll)
        .post(validateToken.checkToken, AricleControllers.insert);

router.route('/:articleId')
        .get(validateToken.checkToken, AricleControllers.showId)
        .put(validateToken.checkToken, AricleControllers.update)
        .patch(validateToken.checkToken, AricleControllers.update)
        .delete(validateToken.checkToken, AricleControllers.delete);

router.route('/searchKeyWord')
        .post(AricleControllers.searchBykeyWord)

router.route('/sortByCategories')
        .post(AricleControllers.sortByCategories)
module.exports = router;