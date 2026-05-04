const {Router} = require("express");

const route = Router();

route.get("/getAllUsers", (req, res) => {

res.json({ok : true, result: "sending"})
});

//  http://localhost:5000/api/auth/getAllUsers


module.exports = route;
