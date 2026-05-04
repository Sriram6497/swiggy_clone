const express = require("express");
const firmController = require("../Controllers/firmController");

const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/addfirm", verifyToken, firmController.addFirm);
// http://localhost:5000/api/firm/addfirm

router.get("/uploads/:imageName", (req,res) => {
    const imageName = req.params.imageName;
    res.headersSent("content-type", "image/jpeg");
    res.sendFile(path.join(__dirname, "../uploads", imageName));
});
// http://localhost:5000/api/firm/uploads/:imageName

router.delete("/delete-firm/:firmId",  firmController.deleteFirmById);  
// http://localhost:5000/api/firm/delete-firm/:firmId

module.exports = router;