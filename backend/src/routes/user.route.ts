import express from 'express'
import { signUp } from '../controllers/userAuth.controller'

const router=express.Router();
router.route('/signup').post(signUp)
router.get('/test',(req,res)=>{
    res.send("hello from test")
})
console.log("in userRouter")
export default router