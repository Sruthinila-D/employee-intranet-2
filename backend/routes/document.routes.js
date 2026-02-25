const express = require("express");
const router = express.Router();

const documentController = require("../controllers/document.controller");

router.get(
"/employee/:userId/download",
documentController.downloadEmployeeDocuments
);

module.exports = router;