var express = require('express')
var router = express.Router();
var USER = require('../schema/User')
var UserSession = require('../schema/UserSession')
router.post('/users/signup',(req,res,next)=>{
    const {body} = req;
    const {firstName,lastName,password} = body;
    let {email} = body;

    if(!firstName){
        return res.send({
            success:false,
            message:'Error: firstName not provided'
        });
    }
    if(!lastName){
        return res.send({
            success:false,
            message:'Error: lastName not provided'
        });
    }
    if(!email){
        return res.send({
            success:false,
            message:'Error: email not provided'
        });
    }
    if(!password){
        return res.send({
            success:false,
            message:'Error: password not provided'
        });
    }
    email = email.toLowerCase();
    USER.find({
        email: email
    },(err,previousUser)=>{
        if(err){
            return res.send({
                success:false,
                message:'Error'
            });
        }
        else if(previousUser.length > 0){
            return res.send({
                success:false,
                message:'Email already exist'
            });
        }
        var newUser = new USER();
        
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.email = email;
        newUser.password = password;
        newUser.save((err,user)=>{
            if(err){
                return res.send({
                    succes:false,
                    message:'Error'
                });
            }
                return res.send({
                success:true,
                message:'Signed up'
            });
        })
    })
})
router.post('/users/signin',(req,res,next)=>{
    const {body} = req;
    const {password} = body;
    let {email} = body;
    if(!password){
         return res.send({
            success:false,
            message:"Error: password not provided"
        });
    }
    if(!email){
        return res.send({
            success:false,
            message:"Error: email not provided"
        });
    }
    email = email.toLowerCase();
    USER.find({
        email:email
    },(err,users)=>{
        if(err){
            return res.send({
                success:false,
                message:"Error: server error"
            });
        }
        if(users.length != 1){
            return res.send({
                success:false,
                message:'incorrect email'
            });
        }
        
        const user = users[0];
        if(user.password != password){
            
            return res.send({
                success:false,
                message:'Error:Incorrect password'
            });
        }
        const usersession = new UserSession();
        usersession.userId = user._id;
        usersession.save((err,doc)=>{
            if(err){
                return res.send({
                    success:false,
                    message:'Error: server error'
                });
            }
            return res.send({
                success:true,
                message:'account signed in',
                token:doc._id
            });
        })
    })
    
 }) 
router.get('/users/logout',(req,res,next)=>{
    const {query} = req;
    const {token} = query;
    UserSession.findOneAndUpdate({
        _id: token,
        isDeleted:false
    },{$set:{isDeleted:true}},null,(err,sessions) => {
        if(err){
            return res.send({
                success:false,
                message:'Error: Server error'
            });
        }
        return res.send({
            success:true,
            message:'Working good'
        });
    })
}) 
module.exports = router;