const mongoose = require("mongoose")

const vendorSchma = new mongoose.Schema({

    username : {

        type : String,
        required : true,
      
        
       
    },

    password : {
        type : String,
           required : true,
        
       
       
        
    },

    email : {
        type : String,
        required : true,
        unique : true,
            
        
       

    },
    firm : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Firm"
        }
    ]
})

const Vendor = mongoose.model("Vendor", vendorSchma);

module.exports = Vendor;