const {Router} = require("express");

const VendorController  = require("../Controllers/VendorController")


const route =  Router();

route.post("/register", VendorController.vendorRegister );

http://localhost:5000/api/vendor/Register

route.post("/login", VendorController.vendorLogin);
http://localhost:5000/api/vendor/login

route.get("/getallvendors", VendorController.getAllVendors);
http://localhost:5000/api/vendor/getallvendors

route.get("/getvendorbyid/:id", VendorController.getVendorById);
http://localhost:5000/api/vendor/getvendorbyid/:id

module.exports = route;