const db_chat1=require("../models/chat1");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
module.exports.saveMessage=async (req,res)=>{

    //reciving message
const recivedMessage=req.body.message
const user_email=req.user.email;
const user_id=req.user.id
console.log(recivedMessage)
console.log(req.body)
try {
    if(recivedMessage==""||recivedMessage==null){
        
    res.status(200).json({message:"data is empty or null",status:false});
    return;
    }
    const resp_of_insert_data=await db_chat1.create(
        {
            message:recivedMessage,
            userId:user_id,
            user_email:user_email
        }
    )
    
    res.status(200).json({message:"ok",status:true})
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
    
      
} catch (error) {
    res.status(200).json({error:error,message:"error in backend",status:false})
}

}