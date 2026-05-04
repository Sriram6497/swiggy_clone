const {connect} = require("mongoose");

const url = "mongodb://localhost:27017/subydb";
function createDatabase () {
connect(url).then(() => {
    console.log("Mongodb Connected With Node Js Successfully")
}).catch((error) => {
    console.log("failed to connect Mongodb");
    console.log(error)
})

}

module.exports = createDatabase;