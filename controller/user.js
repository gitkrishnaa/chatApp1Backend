const db_user=require("../models/user");
const bcrypt=require("bcrypt")
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
    console.log(req.body)
    const email=req.body.user_email
    const password=req.body.user_password;
    
    try {
    
        const user=await db_user.findAll({where:{email:email}})
    
        if(user.length==0){
            console.log("user not exist so not able to login- /from user_controller ")
           
            res.json({message:"user not registred please signup first ",staus:false})
            return; 
        }
        else{
            console.log(user)
            console.log("user email exist, sucess /from user_controller ")
    //  const checkPassword=bcrypt.compare(password,)
              //compare user password t database user encrypt password
        const salt=10  
        res.json({message:"user login sucessful",staus:true})

        }
    
    
    
   

    
    
  
    
    } catch (err) {
        res.json({error:err,status:false})
        console.log(err)
    }

}