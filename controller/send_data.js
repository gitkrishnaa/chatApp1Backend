const db_chat1=require("../models/chat1");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
module.exports.all_user_list=async (req,res)=>{

    //reciving message
const recivedMessage=req.body.message
const user_email=req.user.email;
const user_id=req.user.id
console.log(recivedMessage)
console.log(req.body)
try{
    const resp_of_insert_data=await db_chat1.findAll({attributes:["id","name","mobile","email"]} )
    res.status(200).json({message:"ok",status:true,data:resp_of_insert_data})
} catch (error) {
    console.log(error)
    res.status(200).json({message:"error in backend",error:error,status:false})
}


}
module.exports.sendChatData=async (req,res)=>{
const user_email=req.user.email;
const user_id=req.user.id;
try {
    const get_chat_data= await db_chat1.findAll()
    res.status(200).json({data:get_chat_data,message:"done",status:true})     
} 
catch (error) {
    res.status(200).json({error:error,message:"error in backend",status:false})
}

}
      
