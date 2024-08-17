import {ObjectId} from "mongodb"
import { Router } from "express"
import { db } from "../utils/db.js"
import { cloudinaryUpload } from "../utils/upload.js";
import multer from "multer";
import { protect } from "../middlewares/protect.js";

const productRouter = Router();
// productRouter.use(protect)

const multerUpload = multer({dest: 'public\\files'});
const avatarUpload = multerUpload.fields([{ name: 'avatar', maxCount: 6}])

productRouter.get("/", async(req,res)=>{
        
    try {
        const query = {}
        const PAGE_SIZE = 12;
        const page = req.query.page
        const skip = PAGE_SIZE * (page - 1)
        const keyword = req.query.keyword
        if(keyword){
            query.$or = [
                {name:new RegExp(`${keyword}`,"i")},
                {code:new RegExp(`${keyword}`,"i")}
            ] 
        }

        const collection = db.collection('products')
        const products =  await collection
        .find(query)
        .skip(skip)
        .limit(12)
        .toArray()

        const count = await collection.countDocuments(query)
        const totalPages = Math.ceil(count / PAGE_SIZE)
        return res.status(200).json({data:products,total_pages:totalPages})
    } catch (error) {
        return res.status(404).json({error:error})
    }
   
})

productRouter.get('/:id',async(req,res)=>{
    try {
        const productId = new ObjectId(req.params.id)
        const collection = db.collection('products')
        const getProductId = await collection.find({_id:productId}).toArray();
        return res.status(200).json({data:getProductId})
    } catch (error) {
        return res.status(404).json({error:error})
    }
})

productRouter.post('/upload', avatarUpload, async(req,res)=>{

    try {
        const products = {
            name:req.body.name,
            code:req.body.code,
            price:Number(req.body.price),
            description:req.body.description
        }
        
        const avatarUrl = await cloudinaryUpload(req.files);
        products['avatars'] = avatarUrl;
        products['created_at'] = new Date();

        const collection = db.collection('products')
        await collection.insertOne(products)

        return res.status(200).json({
            message:'Product has been created successfully'
        })
    } catch (error) {
        return res.status(404).json({data:error})
    }
})

productRouter.put('/upload/:id', async(req,res)=>{

    try {
        const productId = new ObjectId(req.params.id)
        const updateProducts = {
            ...req.body,
            updated_at:new Date(),
            }

        const collection = db.collection('products')
        await collection.updateOne(
            {_id:productId},
            {$set:updateProducts}
        )

        return res.status(200).json({
            message:'Product has been updated successfully'
        })
    } catch (error) {
        return res.status(404).json({data:error})
    }
})

productRouter.delete('/:id', async(req,res)=>{

    try {
        const productId = new ObjectId(req.params.id)
  
        const collection = db.collection('products')
        await collection.deleteOne({_id:productId})

        return res.status(200).json({
            message:'Product has been deleted successfully'
        })
    } catch (error) {
        return res.status(404).json({data:error})
    }
})

export default productRouter;