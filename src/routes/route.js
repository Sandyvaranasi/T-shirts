const router = require("express").Router();
const midware = require("../midWare/auth");
const userControllers = require("../controllers/userController");
const vendorController = require("../controllers/vendorController");
const tShirtController = require("../controllers/tShirtController");
const orderController = require("../controllers/orderController");

//* SHOP FEATURE ===>
router.post("/vendor/register", vendorController.createVendor);
router.post("/vendor/login", vendorController.vendorlogin);
router.post("/product", midware.vendorAuth, vendorController.createTshirt);
router.put(
  "/product/:tShirttId",
  midware.vendorAuth,
  vendorController.updateTshirt
);
router.get("/shop", midware.vendorAuth, vendorController.getShopDetails);

//* PRODUCT FEATURE ===>
router.get("/t-shirts", tShirtController.getTshirt);
router.get("/t-shirts/:productId", tShirtController.getTshirtById);
router.get(
  "/tShirtByShop",
  midware.vendorAuth,
  tShirtController.getTshirtOfVendor
);

//* ORDER FEATURE ===>
router.post(
  "/order/:productId",
  midware.authentication,
  orderController.createOrder
);
router.get(
  "/order",
  midware.authentication,
  orderController.getOrdersOfCustomer
);
router.get(
  "/order/:orderId",
  midware.authentication,
  orderController.orderDetails
);
router.put(
  "/order/:orderId",
  midware.authentication,
  orderController.cancleOrder
);

module.exports = router;
