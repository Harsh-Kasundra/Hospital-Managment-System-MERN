const express = require("express");
const {
    loginAdmin,
    getAdmin,
    updateAdmin,
    currentAdmin,
} = require("../controllers/adminController");
const { validateTokenAdmin } = require("../middlewares/validateTokenHandler");

const router = express.Router();

// Apply middleware directly to the routes that require authentication
router.post("/login", loginAdmin);
router.get("/current", validateTokenAdmin, currentAdmin);
router.get("/", validateTokenAdmin, getAdmin); // Example route with middleware
router.put("/:id", validateTokenAdmin, updateAdmin); // Example route with middleware

module.exports = router;
