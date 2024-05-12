const express = require("express");
const router = express.Router();

const {
    getstaffs,
    createStaff,
    getStaff,
    updateStaff,
    deleteStaff,
    getStaffNames,
    changePassword,
} = require("../controllers/staffController");
const { validateTokenStaff } = require("../middlewares/validateTokenHandler");

router.use(validateTokenStaff);
router.route("/").get(getstaffs).post(createStaff);
router.route("/names").get(getStaffNames);
router.route("/:id").get(getStaff).put(updateStaff).delete(deleteStaff);
router.route("/pass/:id").put(changePassword);

module.exports = router;
