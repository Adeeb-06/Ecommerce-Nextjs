import mongoose, { mongo, Schema } from "mongoose";

const Product = mongoose.models.Product || mongoose.model("Product", new Schema({
    name:{type:String , required:true},
    price:{type:Number , required:true},
    offPrice:{type:Number , required:true},
    color:{type:String, required:true},
    image:{type:String, required:true},
    size:{type:Array, required:true},
    category:{type:String, required:true},
    description:{type:String, required:true},
}, { timestamps: true }))

export default Product