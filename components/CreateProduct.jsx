"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const CreateProduct = ({category}) => {
    const [error, setError] = useState('')
    const router = useRouter()
    const [sizes, setSizes] = useState([]);

    console.log(error)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target[0].value;
        const price = e.target[1].value;
        const offPrice = e.target[2].value;
        const category = e.target[3].value;
        const color = e.target[4].value;
        const image = e.target[5].value;
        const sizesInput = e.target[6].value;
        const desc = e.target[7].value;
        console.log(name);

        const newSizes = sizesInput
        .split(/[\s,]+/)  // Split by spaces and commas (regex for space or comma)
        .map(size => size.trim())  // Trim extra spaces
        .filter(size => size);  
        // Only add if the newSizes array has content
        // if (newSizes.length) {
        //   setSizes(prevSizes => [...prevSizes, ...newSizes]);
        //    // Clear input after adding
        // }

        console.log(newSizes);
    
        try {
            const res = await fetch('/api/product', {
                method: 'POST',
                headers: { "Content-type": 'application/json' },
                body: JSON.stringify({
                    name,
                    price,
                    offPrice,
                    color,
                    image,
                    size:newSizes,
                    category,
                    description: desc,
                })
            });
    
            if (res.status === 404) {
                setError("Category not found");
            } else if (res.status === 400) {
                setError("Product is already created");
            } else if (res.status === 201) {
                console.log('Product created');
                router.replace('/admin/dashboard/product');
            } else {
                setError("An unexpected error occurred");
            }
        } catch (error) {
            setError("Error during submission");
        }
    };
    
    return (
        <>
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" />
                            </div>
                    
                            <div className="w-full">
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="" />
                            </div>
                            <div className="w-full">
                                <label htmlFor="offPrice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">OFF Price</label>
                                <input type="number" name="offPrice" id="offPrice" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Off%" required="" />
                            </div>
                            <div>
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value="Select category">Select category</option>
                                    {category.map((p)=>(
                                        <option key={p.name} value={p.name}>{p.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color</label>
                                <input type="text" name="color" id="color" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="12" required="" />
                            </div>
                            <div className='w-full sm:col-span-2'>
                                <label className=" mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Upload file</label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                            </div>
                            <div className='w-full sm:col-span-2'>
                                <label className=" mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="sizes">Sizes</label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" aria-describedby="sizes" id="sizes" type="text" />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea id="description" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
                            </div>
                        </div>
                        <p className='text-red-500 text-xl'>{error && error}</p>
                        <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                            Add product
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default CreateProduct