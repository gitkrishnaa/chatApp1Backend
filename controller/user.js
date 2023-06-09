const db_user=require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
module.exports.sign_up=async (req,res)=>{

console.log(req.body)
const name=req.body.user_name
const email=req.body.user_email
const password=req.body.user_password;
const mobile=req.body.user_mobile
try {

    const user=await db_user.findAll({where:{email:email}})

    if(user.length==0){
        console.log("user not exist /from user_controller ")
        console.log("adding user in database")

        const user_mobile=await db_user.findAll({where:{mobile:mobile}})
if(user_mobile.length==0){
console.log("user mobile not in db so data will added")
}
else{
    console.log("user mobile no exist so not able to signup /from user_controller ")
 
    res.json({message:"user mobile already exist ",staus:true})
    return;
}
    }
    else{
        console.log("user email exist so not able to signup /from user_controller ")
 
        res.json({message:"user eamil id already exist ",staus:true})
        return;
    }



    //encrypt password
    const salt=10
const encrypted_password= await bcrypt.hash(password,salt)



const db_resp=await db_user.create({name:name,password:encrypted_password,email:email,mobile:mobile})
res.json({status:true,message:"user signup sucessfull"})
console.log("note-",["data inserted sucessfull in database from user contrller"])

} catch (err) {
    res.json({error:err,status:false})
    console.log(err)
}

}

module.exports.login=async(req,res)=>{
console.log("login from user controller")
    console.log(req.body,"req.body")
    const email=req.body.user_email
    const password=req.body.user_password;
    console.log(email,password)
    try {
    
        const user=await db_user.findAll({where:{email:email}})
    
        if(user.length==0){
            console.log("user not exist so not able to login- /from user_controller ")
           
            res.json({message:"user not registred please signup first ",staus:false})
            return; 
        }
        else{
     //compare user password t database user encrypt password
            const user_id=user[0].dataValues.id
            const encrypted_password_db=user[0].dataValues.password;
            console.log(password,encrypted_password_db)
            console.log("user email exist, sucess /from user_controller ")
     const checkPassword=bcrypt.compare(password,encrypted_password_db,(err,resp)=>{
if(resp){
    //note - sing use sucess fully login so generate jwt token
  
  //generate secret key
    const secretKey="krishnakey"
   const token=jwt.sign({id:user_id,email:email},secretKey)
   
   
    res.json({message:"user login sucessful",staus:true,jwtKey:token})
}
else{
    res.json({message:"password not match",staus:false})

}
     })


        

        }
    
    
    
   

    
    
  
    
    } catch (err) {
        res.json({error:err,status:false})
        console.log(err)
    }

}