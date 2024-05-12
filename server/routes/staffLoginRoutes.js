const express = require("express");
const {
    loginStaff,
    currentStaff,
} = require("../controllers/staffLoginController");
const { validateTokenStaff } = require("../middlewares/validateTokenHandler");

const router = express.Router();

router.post("/login", loginStaff);
router.get("/current", validateTokenStaff, currentStaff);

module.exports = router;
