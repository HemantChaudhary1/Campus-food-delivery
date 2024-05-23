const Restaurant = require("../controllers/getAllRestaurent");
const Admin = require("../controllers/admin");
const Owner = require("../controllers/owner");
const User = require("../controllers/user");
const auth = require("../controllers/auth");
const { check, validationResult } = require("express-validator");
const express = require("express");
const cors = require("cors");
const {
  verifyadmin,
  verifyuser,
  verifyowner,
} = require("../middleware/authmiddleware");
const router = express.Router();

router.use(cors());

//Admin
router.post("/deleteRes", verifyadmin, Admin.deleteRes);
router.post("/addRes", verifyadmin, Admin.addRes);

// Restaurent Owner
router.post("/adddish", verifyowner, Owner.addDish);
router.post("/deletedishes", verifyowner, Owner.deleteDish);
router.post("/updateOrder", verifyowner, Owner.updateOrder);
router.get("/ResOrder", verifyowner, Owner.getOrderResdetails);
//auth
router.post(
  "/signup",
  check("username", "Name is required").notEmpty(),
  check("email", "email is required").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  check("phone", "phone is required").isLength({ min: 10, max: 10 }),
  check("role", "role is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  },
  auth.signup
);
router.post("/login", auth.login);
router.post("/auth", verifyuser, auth.verifyUser);
//User
router.get("/allOrder", verifyuser, User.getAllOrder);
router.post("/sendOrder", verifyuser, User.sendOrder);
router.get("/userOrder", verifyuser, User.getOrderdetails);
// any one can view
// All Restaurant Data
router.get("/getAllRes", User.getAllRes);
// All dishes of a Specific Restaurant
router.get("/getAllDishes/:phone", User.getAllDishes);

module.exports = router;
