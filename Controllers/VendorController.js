const vendor = require("../Model/Vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const secretekey = "hghjkddjkdkdjdjdjddjtryurlmffjfjfjfj";


const vendorRegister = async(req,res) => {
const {username,email,password} = req.body;

try{

    const vendorEmail = await vendor.findOne({email});
    if(vendorEmail){

        return res.status(400).json("Email Already Registered")
    }
    const hashedpassword = await bcrypt.hash(password, 10);

     const newVendor = new vendor({username,
        email,
        password : hashedpassword });

       await newVendor.save();

       res.status(201).json({ok : true, message : "Vendor Registered Successfully"});



    
}catch(error){

    console.log(error)
    res.status(500).json({ok : false, message: "internal server error"})

}



}

const vendorLogin = async(req, res) => {
   const {email, password} = req.body;
   try{

    const data = await vendor.findOne({email});
  

    if (!data || !(await bcrypt.compare(password, data.password)) ) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
    
        const token = jwt.sign({vendorId : data._id}, secretekey)
        res.status(200).json({ok : true, message : "login successfully", token})

   }catch(error){

    console.error("LOGIN ERROR:", error);
  return res.status(500).json({ 
    error: error.message
  })
   }


}

const getAllVendors = async(req, res) => {

    try{
        const vendors = await vendor.find().populate("firm");
        res.status(200).json(vendors)
       }catch(error){
        res.status(500).json({error : "internal server error"}) ;
       }

    }

    const getVendorById = async(req, res) => {
        const vendorId = req.params.id;
        try{
            const vendorData = await vendor.findById(vendorId).populate("firm");    
            if(!vendorData){
                return res.status(404).json({error : "vendor not found"})
            }
            res.status(200).json(vendorData)
           }catch(error){
            res.status(500).json({error : "internal server error"}) ;
           }
    }

module.exports = {vendorRegister, vendorLogin, getAllVendors, getVendorById}