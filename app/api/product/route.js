import connectToMongoDb from "@/libs/mongodb";
import Product from '@/models/Product'
import { NextResponse } from "next/server";

connectToMongoDb()
export async function POST(req) {
    try {
        const { name, price, color, size, description } = await req.json()
        const existingProduct = await Product.findOne({ name })

        if (existingProduct) {
            return new NextResponse("Product is already created", { status: 400 })

        }
        const newProduct = new Product(
            {
                name,
                price,
                color,
                size,
                description
            }
        )
        await newProduct.save()
        return new NextResponse("product created", { status: 201 })
    } catch (error) {
        return new NextResponse(error.message , {status:401})
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