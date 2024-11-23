import connectToMongoDb from "@/libs/mongodb";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

connectToMongoDb();

export async function POST(req) {
    try {
        const { name } = await req.json();
        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            return new NextResponse("Category already exists", { status: 400 });
        }

        const newCategory = new Category({ name, products: [] });
        await newCategory.save();

        return new NextResponse("Category created", { status: 201 });
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}


export async function GET() {
    try {
        const category = await Category.find()
        return NextResponse.json(category)
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}