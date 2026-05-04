const express = require("express");
const router = express.Router();
const {addProduct} = require("../Controllers/productController");
const{deleteProductById} = require("../Controllers/productController");

const {getProductByFirm} = require("../Controllers/productController");
router.post("/add-product/:firmId", addProduct);

// http://localhost:5000/api/product/add-product/:firmId

router.get("/get-product-by-firm/:firmId", getProductByFirm);

// http://localhost:5000/api/product/get-product-by-firm/:firmId

router.get("/uploads/:imageName", (req,res) => {
    const imageName = req.params.imageName;
    res.headersSent("content-type", "image/jpeg");
    res.sendFile(path.join(__dirname, "../uploads", imageName));
});
// http://localhost:5000/api/product/uploads/:imageName

router.delete("/delete-product/:productId", deleteProductById);
// http://localhost:5000/api/product/delete-product/:productId

module.exports = router;