const group_model=require("../models/group_db");
const group_and_user_junction=require("../models/grup_user_juntion");
const group_messages=require("../models/group_messge_db_model");
const users=require("../models/user")

module.exports.group_create=async (req,res)=>{
const receiveing_obj=req.body
// const super_admin=receiveing_obj.super_admin
// const group_name=receiveing_obj.name
console.log(receiveing_obj)
if(Object.keys(receiveing_obj).length==0){
    res.json({status:false,message:"object is empty /from backend"})
return;
}
else  if(Object.keys(receiveing_obj.group_data.members).length==0){
    res.json({status:false,message:"members data of goup not recived /from -backend"})
return;
}
else  if(receiveing_obj.group_data.name=="" && receiveing_obj.group_data.super_Admin==""){
    res.json({status:false,message:"group_name or superAdmin_data not recived  /from -backend",receiveing_obj})  
    return; 
}

const data_obj=receiveing_obj.group_data

const group_name=data_obj.name;
//super_admin-mean that user who created the group
const super_admin_email=data_obj.super_Admin;
const member=data_obj.members;
try {
    

//fetch user details to fill user id as super_Admin in gruop data module
const user_details=await users.findAll({where:{email:super_admin_email}})
// console.log("user_details",user_details[0].dataValues)
const user_data_obj=user_details[0].dataValues
const user_id=user_data_obj.id

//#inserting group details in group model
const group_create=await group_model.create({
    name:group_name,
    logo:"image link",
    user_super_admin:user_id,
    super_admin_email:super_admin_email
})

// response from inseted data
const response_of_group_data=group_create
const id_of_created_group=response_of_group_data.id
// console.log(group_create.dataValues)



//adding super admin in group

const add_member_in_group=async(group_id,user_id,is_admin,super_admin)=>{
return group_and_user_junction.create({
    groupId:group_id,
    userId:user_id,
    admin:is_admin,
    super_admin:super_admin
})
}

//# inserting super admin in user and group junction
const add_super_admin=await add_member_in_group(id_of_created_group,user_id,true,true)

//# inseting members in user group section
for (const property in member) {
   const member_obj=member[property];
   const member_id=member_obj.id
   const admin=member_obj.admin;
   const add_member=member_obj.adding
   console.log(member_obj)


if(add_member){
// const resp =await group_and_user_junction.create({
    const resp_add_member=await add_member_in_group(id_of_created_group,member_id,admin,false)
console.log(member_id,"is added")
// })
}



}


res.json({data:receiveing_obj,message:"members added",status:true})
} catch (error) {
    console.log(error);
    res.json({message:"error in backendend in controller/group.js",status:false})
}
}