const router = require("express").Router();
const midware = require("../midWare/auth");

const userControllers = require("../controllers/userController");
const vendorController = require("../controllers/vendorController");
const tShirtController = require("../controllers/tShirtController");
const orderController = require("../controllers/orderController");

//* USER FEATURE ===>
router.post("/api/signup", userControllers.createUser);
router.post("/api/login", userControllers.login);

//* SHOP FEATURE ===>
router.post("/api/shop", vendorController.createVendor);
router.post("/api/vendor", vendorController.vendorlogin);
router.post("/api/product", midware.vendorAuth, vendorController.createTshirt);
router.put(
  "/api/product/:tShirttId",
  midware.vendorAuth,
  vendorController.updateTshirt
);
router.get("/api/shop", midware.vendorAuth, vendorController.getShopDetails);

//* PRODUCT FEATURE ===>
router.get("/api/product", tShirtController.getTshirt);
router.get("/api/product/:productId", tShirtController.getTshirtById);
router.get(
  "/api/tShirtByShop",
  midware.vendorAuth,
  tShirtController.getTshirtOfVendor
);

//* ORDER FEATURE ===>
router.post(
  "/api/order/:productId",
  midware.authentication,
  orderController.createOrder
);
router.get(
  "/api/order",
  midware.authentication,
  orderController.getOrdersOfCustomer
);
router.get(
  "/api/order/:orderId",
  midware.authentication,
  orderController.orderDetails
);
router.put(
  "/api/order/:orderId",
  midware.authentication,
  orderController.cancleOrder
);

module.exports = router;
