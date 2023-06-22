const routes=require("express").Router()
const Auth=require("../auth/userAuth")
const userAuth=Auth.authenticate_user
const groups_controller=require("../controller/group.js")


routes.post("/group_create",userAuth,groups_controller.group_create);
routes.post("/users_group",groups_controller.users_related_group);
routes.post("/group_data",groups_controller.group_data);

routes.post("/save_group_chat",groups_controller.save_group_chat);
routes.post("/group_chat_data",groups_controller.group_chat_data);
routes.post("/group_delete",groups_controller.group_delete);

    routes.post("/group_member_delete",groups_controller.group_member_delete);

module.exports=routes;