const express = require("express");
const { query ,body} = require("express-validator");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please Enter a valid Email"),
    body("email").isEmail().withMessage("Please Enter a valid Email"),
    body("password","Password should be atleast 5 characters alphanumeric")
      .isLength({ min: 5 })
      .isAlphanumeric(),
  ],
  authController.postLogin
);

router.post(
  "/signup",
  query("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .custom((value, { req }) => {
      if (value === "abc@abc.com") {
        throw new Error("This email address is Forbidden.");
      }
      return true;
    }),
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
