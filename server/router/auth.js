import { Router } from "express";
import { db } from "../utils/db.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const authRouter = Router();


authRouter.post('/register',async(req,res)=>{

    try {
        const user = {
            username: req.body.username,
            password: req.body.password,
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            created_at:new Date()
        }
    
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt)
    
        const collection = db.collection('users');
        await collection.insertOne(user)
    
        return res.json({
            message:'user has been created successfully',
            data:user
        })
    } catch (error) {
        return res.status(400).json({error:`Register weng wrong :${error}`})
    }
  
})

authRouter.post('/login',async(req,res)=>{

    try {
        const username = {username:req.body.username}
        const user = await db.collection('users').findOne(username)
        const admin = await db.collection('admin').findOne(username)
    
        if(!user && !admin){
            return res.status(404).json({message:'account not found'})
        }
    
        if(user){
            const isUserValidPassword = await bcrypt.compare(req.body.password,user.password)
            if(!isUserValidPassword){
                return res.status(404).json({message:'user password is not valid'})
            }
            if(user && isUserValidPassword){
                const token = jwt.sign( {userId:user._id,firstname:user.firstname,lastname:user.lastname,role:'user'},
                process.env.SECRET_KEY,
                {expiresIn:'900000',});
                return res.status(200).json({
                    message:'User login successfully',
                    token
                })
            }
        }
    
        if(admin){
            const isAdminValidPassword = await bcrypt.compare(req.body.password,admin.password)
            if(!isAdminValidPassword){
                return res.status(404).json({message:'admin password is not valid'})
            }
            if(admin && isAdminValidPassword){
                const token = jwt.sign( {id:admin._id,firstname:admin.firstname,lastname:admin.lastname,role:'admin'},
                process.env.SECRET_KEY,
                {expiresIn:'900000',});
                return res.json({
                    message:'Admin login successfully',
                    token
                })
                }
            }
    } catch (error) {
        return res.status(400).json({error:`Login went wrong :${error}`})
    }

});

export default authRouter