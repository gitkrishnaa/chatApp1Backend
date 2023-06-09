const routes=require("express").Router()
const user_controller=require("../controller/user.js")

routes.get("/signUp",user_controller.sign_up);
routes.post("/signUp",user_controller.sign_up);
routes.post("/login",user_controller.login);



module.exports=routes;