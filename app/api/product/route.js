import connectToMongoDb from "@/libs/mongodb";
import Category from "@/models/Category";
import Product from '@/models/Product'
import { NextResponse } from "next/server";

connectToMongoDb()
export async function POST(req) {
    try {
        const { name, price, offPrice, color,image, size,category, description } = await req.json()
        const existingProduct = await Product.findOne({ name })

        if (existingProduct) {
            return new NextResponse("Product is already created", { status: 400 })
        }

        const categoryName = await Category.findOne({name:category})
        if(!categoryName){
            return new NextResponse("Category not found", { status: 404 });
        }
        // const finalPrice = price - ((offPrice/100) * price)
        const newProduct = new Product(
            {
                name,
                price,
                offPrice,
                color,
                image,
                size,
                category,
                description
            }
        )
        await newProduct.save()

        categoryName.products.push(newProduct._id)
        await categoryName.save()

        return new NextResponse("product created", { status: 201 })
    } catch (error) {
        console.error("Error:", error);
        return new NextResponse(error.message, { status: 401 });
    }
}


export async function GET() {
    try {
        const products = await Product.find()
        return NextResponse.json(products)
    } catch (error) {
        return new NextResponse(error.message , {status:401})   
    }
}