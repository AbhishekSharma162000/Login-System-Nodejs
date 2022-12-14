const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const create_token = async(id)=>{
    try {
        
        const token =  jwt.sign({ _id:id},process.env.JWT_SECRET,  {
            // algorithm: "HS256",
            expiresIn: process.env.JWT_EXPIRES_IN,
            
        });
        console.log("token:", token);
        return token;

    } catch (error) {
        res.status(404).send(error.message);
        console.log("token error")
    }
}

// Verifying the JWT token
const verify_token = async (token, secretKey) => {
    try {
        const verifyToken = jwt.verify(token, secretKey, (err)=>{
            if(err){
                console.log("Token Not Verified......")
            }else{
                console.log("Token Verified Successfully......")
            }
        });
        return verifyToken;
    } catch (error) {
        res.status(404).send(error.message);
    }
    
}

const securePassord = async (password)=>{
    try {
        
        const passwordHash =  await bcrypt.hash(password, 10);
        return passwordHash; 

    } catch (error) {
        res.status(200).send(error.message);
       
    }
}

const register_user = async (req, res)=>{
    try {
        const spassword = await securePassord(req.body.password);
        
        var username = '';

        if(req.body.email){
            username = req.body.email
        }
        else{
            username = req.body.mobile
        }

        const user = new User({
            username: username,
            email: req.body.email,
            password: spassword,
            mobile: req.body.mobile
        });
       
       
    
        const userData = await User.findOne({email: req.body.email});

        
        if(userData){

            res.status(200).send({success: false, msg: "This email is already exists."});

        }else{
            const user_data = await user.save();
           
            res.status(200).send({success: true, data: user_data});
        
        }


    } catch (error) {
        res.status(200).send(error.message);
    }
}

const user_login = async (req, res) => {
    try {
        
        const username = req.body.username;
        const password = req.body.password;

        if(!username){
            res.send("Username blank")
        }else{
            const userData = await User.findOne({username: username});
            if(userData) {

                const passwordMatch = await bcrypt.compare(password, userData.password);
            
    
                if(passwordMatch) {
    
                    const tokenData = await create_token(userData._id);
                    const userUpdated = await User.findByIdAndUpdate({_id: userData.id},{
                        $set:{token: tokenData},
                    });

                   const verifyToken =  await verify_token(tokenData,process.env.JWT_SECRET);

                    const response = {
                        success: true,
                        mssg: "User Details",
                        data: userUpdated,
                    }
                    res.status(200).send(response);
                }else{
                    res.status(200).send({success: false, msg:"Login details are incorrect."});
                }
            }else{
                res.status(404).send({success: false, msg:"Login details are incorrect."});
                console.log("Email Wrong")
            }
        }
      
    } catch (error) {
        res.status(404).send(error.message)
       
    }
}


module.exports = {
    register_user,
    user_login
}