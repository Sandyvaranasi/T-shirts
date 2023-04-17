import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from './HomePage'


export default function AddProduct() {
  
  const [baseprice, setPrice] = useState('')
  const [productname, setName] = useState('')
  const [description, setDescription] = useState('')
  const [productImage, setProductImage] = useState('')
  const [sizes, setSizes] = useState('')
  const [quantity, setQuantity] = useState('')
  const [colors, setColors] = useState('')
  const navigate = useNavigate()


function submitHandler(){
  const formData = new FormData()
  formData.append('baseprice',baseprice)
  formData.append('productname',productname)
  formData.append('description',description)
  formData.append('sizes',sizes)
  formData.append('quantity',quantity)
  formData.append('colors',colors)
  formData.append('image',productImage)
  api.post('/product',formData,{
    headers:{
      Authorization: `Bearer ${localStorage.getItem('shopToken')}`
    }
  })
  .then(res=>{
    console.log(res);
    alert('T-Shirt added Successfully')
    navigate('/shop')
  })
  .catch(err=>{ console.log(err);
    alert(err.response.data.message)})
}

  return (
    <div className='col mt-5 text-white shadow lg'>
    <h1>Add New Product </h1>
    <hr/>
    <div className="mb-3">
<label htmlFor="exampleFormControlInput1" className="form-label shadow lg fs-4">Product name</label>
<input type="text" className="form-control shadow lg" id="exampleFormControlInput1" placeholder="Product name here..." onChange={e=>setName(e.target.value)}/>
</div>
<div className="mb-3">
<label htmlFor="exampleFormControlInput1" className="form-label shadow lg fs-4">Price</label>
<input type="number" className="form-control shadow lg" id="exampleFormControlInput1" placeholder="Cost per piece here..." onChange={e=>setPrice(e.target.value)}/>
</div>
<div className="mb-3">
<label htmlFor="exampleFormControlInput1" className="form-label shadow lg fs-4">Description</label>
<input type="text" className="form-control shadow lg" id="exampleFormControlInput1" placeholder="Quick description of product..." onChange={e=>setDescription(e.target.value)}/>
</div>
<div className="mb-3">
<label htmlFor="exampleFormControlInput1" className="form-label shadow lg fs-4">Upload Product Image</label>
<input type="file" className="form-control shadow lg" id="exampleFormControlInput1" onChange={e=>setProductImage(e.target.files[0])}/>
</div>
<div className="mb-3">
<label htmlFor="exampleFormControlInput1" className="form-label shadow lg fs-4">Colors</label>
<input type="text" className="form-control shadow lg" id="exampleFormControlInput1" placeholder="Fill colors if any..." onChange={e=>setColors(e.target.value)}/>
</div>
<div className="mb-3">
<label htmlFor="exampleFormControlInput1" className="form-label shadow lg fs-4">Size</label>
<input type="text" className="form-control shadow lg" id="exampleFormControlInput1" placeholder="Only Small,Medium and Large allowed..." onChange={e=>setSizes(e.target.value)}/>
</div>
<div className="mb-3">
<label htmlFor="exampleFormControlInput1" className="form-label shadow lg fs-4">quantity</label>
<input type="number" className="form-control shadow lg" id="exampleFormControlInput1" placeholder="Your quantity here..." onChange={e=>setQuantity(e.target.value)}/>
</div> 
  <div className="form-group">
    <button className='bg-success mt-2 w-100 shadow lg' onClick={submitHandler} >Add T-Shirt</button>
    <Link to='/shop'>Do not want to add?? Return to profile Now!!!</Link>
  </div>
  </div>
  )
}
