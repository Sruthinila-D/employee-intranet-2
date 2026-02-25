const express = require("express");

const router = express.Router();

const leaveController = require("../controllers/leave.controller");

const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ storage });


// CREATE LEAVE
router.post("/", upload.single("file"), leaveController.createLeave);


// GET ALL LEAVES
router.get("/", leaveController.getAllLeaves);


// GET LEAVES BY USER  (PUT THIS ABOVE :id)
router.get("/user/:userId", leaveController.getLeavesByUser);


// GET LEAVE BY ID
router.get("/:id", leaveController.getLeaveById);


// UPDATE STATUS
router.put("/:id/status", leaveController.updateLeaveStatus);


module.exports = router;