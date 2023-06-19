const routes=require("express").Router()
const Auth=require("../auth/userAuth")
const userAuth=Auth.authenticate_user
const groups_controller=require("../controller/group.js")


routes.post("/group_create",userAuth,groups_controller.group_create);



module.exports=routes;