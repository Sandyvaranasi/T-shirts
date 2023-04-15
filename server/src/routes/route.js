const router = require("express").Router();
const midware = require("../midWare/auth");

const userControllers = require("../controllers/userController");
const vendorController = require("../controllers/vendorController");
const tShirtController = require("../controllers/tShirtController");
const orderController = require("../controllers/orderController");

//* USER FEATURE ===>
router.post("/signup", userControllers.createUser);
router.post("/login", userControllers.login);
router.get("/user", midware.authentication, userControllers.getUser);

//* SHOP FEATURE ===>
router.post("/shop", vendorController.createVendor);
router.post("/vendor", vendorController.vendorlogin);
router.post("/product", midware.vendorAuth, vendorController.createTshirt);
router.put(
  "/product/:tShirttId",
  midware.vendorAuth,
  vendorController.updateTshirt
);
router.get("/shop", midware.vendorAuth, vendorController.getShopDetails);

//* PRODUCT FEATURE ===>
router.get("/product", tShirtController.getTshirt);
router.get("/product/:productId", tShirtController.getTshirtById);
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
