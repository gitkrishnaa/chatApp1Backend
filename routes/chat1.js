const routes=require("express").Router()
const Auth=require("../auth/userAuth")
const userAuth=Auth.authenticate_user
const chat1_controller=require("../controller/chat1.js")


routes.post("/chatSave",userAuth,chat1_controller.saveMessage);

routes.post("/ChatData",userAuth,chat1_controller.sendChatData);


module.exports=routes;