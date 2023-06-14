const routes=require("express").Router()
const Auth=require("../auth/userAuth")
const userAuth=Auth.authenticate_user
const user_controller=require("../controller/user.js")

routes.get("/signUp",user_controller.sign_up);
routes.post("/signUp",user_controller.sign_up);
routes.post("/login",user_controller.login);
routes.get("/All_user_list",userAuth,user_controller.all_user_list);



module.exports=routes;