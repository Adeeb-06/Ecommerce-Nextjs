import CreateProduct from '@/components/CreateProduct'
import React from 'react'

const getCategory = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/category' , {
      cache:'no-store'
    })
    if(!res.ok){
      throw new Error("couldn't find category")
    }
    const data = await res.json()
    console.log(data)
    return data
  } catch (error) {
    console.log(error.messages)
  }
}

const CreateProductPage = async() => {
  const data = await getCategory();
  if (!data) {
    console.log("No category data available");
    return <div>Error loading category</div>;
  }
  // const { category } = data;
  console.log('Category:', data);
  // console.log(category)
  return (
    <>
    <CreateProduct category={data}/>
    </>
  )
}

export default CreateProductPage