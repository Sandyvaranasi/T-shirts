const authRouter = require("express").Router();
const userControllers = require("../controllers/userController");

// /api/auth/signup
authRouter.post("/signup", userControllers.createUser);

// /api/auth/login
authRouter.post("/login", userControllers.login);

exports.authRouter = authRouter;
