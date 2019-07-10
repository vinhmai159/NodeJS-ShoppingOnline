const express = require('express');
const router = express.Router();

const menuController = require('../controllers/menu');

router.route('/male').get(menuController.menuMale);

router.get('/male/chilmenu', menuController.chilMenuMale)

router.get('/female', menuController.menuFemale);
        

module.exports = router;