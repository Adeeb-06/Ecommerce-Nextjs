import mongoose, { mongo, Schema } from "mongoose";

const Category = mongoose.models.Category || mongoose.model("Category", new Schema({
    name: { type: String, required: true, unique: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }] // Reference to Product model
}, { timestamps: true }));

export default Category;
