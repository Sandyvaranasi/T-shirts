const router = require('express').Router();
const midware = require('../midWare/auth')

const userControllers = require('../controllers/userController');
const vendorController = require('../controllers/vendorController');
const tShirtController = require('../controllers/tShirtController');


router.post('/signup', userControllers.createUser);
router.post('/login', userControllers.login);

router.post('/createShop', vendorController.createVendor);
router.post('/vendorLogin', vendorController.vendorlogin);
router.post('/createProduct', midware.vendorAuth, vendorController.createTshirt);

router.get('/getTshirt', tShirtController.getTshirt);
router.get('/getTshirtById/:productId', tShirtController.getTshirtById);
router.get('/getTshirtByShop/:vendorId', tShirtController.getTshirtOfVendor);


module.exports = router;