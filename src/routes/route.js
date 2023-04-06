const router = require("express").Router();
const midware = require("../midWare/auth");

const userControllers = require("../controllers/userController");
const vendorController = require("../controllers/vendorController");
const tShirtController = require("../controllers/tShirtController");
const orderController = require("../controllers/orderController");

router.post("/signup", userControllers.createUser);
router.post("/login", userControllers.login);

router.post("/createShop", vendorController.createVendor);
router.post("/vendorLogin", vendorController.vendorlogin);
router.post(
  "/createProduct",
  midware.vendorAuth,
  vendorController.createTshirt
);
router.put(
  "/tShirt/:tShirttId",
  midware.vendorAuth,
  vendorController.updateTshirt
);

router.get("/tShirt", tShirtController.getTshirt);
router.get("/tShirt/:productId", tShirtController.getTshirtById);
router.get(
  "/tShirtByShop",
  midware.vendorAuth,
  tShirtController.getTshirtOfVendor
);

router.post(
  "/order/:productId",
  midware.authentication,
  orderController.createOrder
);
router.get(
  "order",
  midware.authentication,
  orderController.getOrdersOfCustomer
);
router.get(
  "order/:orderId",
  midware.authentication,
  orderController.orderDetails
);
router.put(
  "order/:orderId",
  midware.authentication,
  orderController.cancleOrder
);

module.exports = router;
