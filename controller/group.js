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
module.exports.group_data=async (req,res)=>{

//# sending user group list where they are member
try {
//     const user_data_obj=req.body.user_data;
// const user_id=user_data_obj.user_id;
// const user_email=user_data_obj.user_email;
const query_obj=req.query.x
console.log(query_obj)
const resp=await users.findAll({where:{id:query_obj},include:group_model})
console.log(resp)
res.json({data:resp})
} catch (error) {
    res.json({data:error,message:"error in backend"})
console.log(error)
}


}
module.exports.users_related_group=async (req,res)=>{

    //# sending user group list where they are member
    try {
        const data=req.body.data;
       
    //     const user_data_obj=req.body.user_data;
    // const user_id=user_data_obj.user_id;
    // const user_email=user_data_obj.user_email;
    const query_obj=req.query.user_id

    user_id=data.user_id || query_obj

    console.log(query_obj)
    const resp=await users.findAll({where:{id:user_id},include:group_model,attributes:["name","email","id"]})
    // console.log(resp)
    console.log("user releted group send to fronend side..........")
    res.json({data:resp,message:"user releted group is recived",status:true,note:"you can send data from body data{userid:x} or in as query in user_id key"})
    } catch (error) {
        res.json({data:error,message:"error in backend",status:false})
    console.log(error)
    }
    
    
    }
module.exports.save_group_chat=async (req,res)=>{

try {
    const data=req.body
    const {group_id,message,sender_user_id}=data.data
    console.log(data,group_id,message,sender_user_id)

const resp=await group_messages.create({
    message:message,
    groupId:group_id,
    userId:sender_user_id,
   
})



    res.json({message:"ok",data:resp,status:true})
} catch (error) {
    res.json({message:"backend error"})   
}

}
module.exports.group_chat_data=async (req,res)=>{

    try {
        const group_id=req.body.group_id
console.log(group_id,"uh")
    const resp=await group_messages.findAll({where:{groupId:group_id}})
    
    console.log("from group_chat_data in controller ...........")
    
        res.json({message:"ok",data:resp,status:true})
    } catch (error) {
        res.json({message:"backend error"})   
    }
    
    }
  
