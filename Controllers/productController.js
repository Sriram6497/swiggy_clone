const product = require("../Model/product");
const firm = require("../Model/Firm");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const uploads = multer({ storage: storage });

const addProduct = async(req, res) => {

    try{

        const {productname, price, category, image: bodyImage, bestSeller, description} = req.body
        const image = req.file ? req.file.filename : bodyImage;

        const firmId = req.params.firmId; // Assuming the firm ID is passed as a URL parameter

        const firmData = await firm.findById(firmId);   
        if(!firmData){
            return res.status(404).json({message : "firm not found"})
        }

        const newProduct = new product({
            productname,
            price,
            category,
            image,
            bestSeller,
            description,
            firm: firmData._id
        });


        const savedProduct = await newProduct.save();
        firmData.product.push(savedProduct);
        await firmData.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getProductByFirm = async(req, res) => {

    try{

        const firmId = req.params.firmId; // Assuming the firm ID is passed as a URL parameter

        const firmData = await firm.findById(firmId).populate("product");
        if(!firmData){
            return res.status(404).json({message : "firm not found"})
        }
        const restarentName = firmData.firmname;
        const products = await product.find({ firm: firmId });
        res.status(200).json({restarentName, products});
    }catch(error){
        console.error("Error fetching products by firm:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteProductById = async(req, res) => {

    try{
        const productId = req.params.productId; // Assuming the product ID is passed as a URL parameter
        const deletedProduct = await product.findByIdAndDelete(productId);
        if(!deletedProduct){
            return res.status(404).json({message : "Product not found"});
        }
        res.status(200).json({message : "Product deleted successfully"});
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {addProduct : [uploads.single("image"), addProduct], getProductByFirm, deleteProductById};
