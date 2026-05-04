
const firm = require("../Model/Firm")
const vendor = require("../Model/Vendor");
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

const addFirm = async(req, res) => {

   try{


     const {firmname, area, catagory: category, region, offer, image: bodyImage} = req.body
    const image = req.file ? req.file.filename : bodyImage;

    const vendorData = await vendor.findById(req.vendorId);
    if(!vendorData){
        return res.status(404).json({message : "vendor not found"})
    }

    const newfirm = new firm({
        firmname, area, category, region, offer, image, vendor: [vendorData._id]
    })

   const savedFirm = await newfirm.save();
   vendorData.firm.push(savedFirm);
   await vendorData.save();

    res.status(200).json({message: "firm added successfully"})
   }catch(error){
console.log(error)
    res.status(500).json("internal server error")

   }



}

      const deleteFirmById = async(req, res) => {
      
          try{
              const firmId = req.params.firmId; // Assuming the firm ID is passed as a URL parameter
              const deletedFirm = await firm.findByIdAndDelete(firmId);
              if(!deletedFirm){
                  return res.status(404).json({message : "Firm not found"});
              }
              res.status(200).json({message : "Firm deleted successfully"});
          } catch (error) {
              console.error("Error deleting firm:", error);
              res.status(500).json({ message: "Internal server error" });
          }
      }         

module.exports = {addFirm : [uploads.single("image"), addFirm], deleteFirmById}