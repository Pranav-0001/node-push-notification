import express from 'express'
import subscribeModal from '../models/subscribeModal.js';
const router = express.Router()

router.post('/subscribe',async(req,res)=>{
    const {subscription}= req.body
    console.log(subscription);
    const cratedSubscription= await new subscribeModal({subscription}).save()
    console.log({cratedSubscription});
})

router.post('/trigger',async(req,res)=>{
    const allsubscriptions= await subscribeModal.find()
    
})

export default router