import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from './HomePage';

export default function User() {
    const navigate = useNavigate();
    const [data,setData] = useState('')


    useEffect(()=>{
      if(!localStorage.getItem('token')){
        navigate('/login')
      }
      api.get('http://localhost:3000/api/user',{
        headers:{
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      }).then(res=>setData(res.data.data))
      .catch(err=>console.log(err))
    },[])

    function handleClick(){
        navigate('/home')
    }

    function handleOrders(e){
      e.preventDefault()
      navigate('/Orders')
    }

  return (
    <div className=' m-5 w-100 bg-white p-4'>
        <h1 className='fst-italic shadow lg p-2'>User Profile :</h1>
        <hr/>
        <label className="fs-3 fw-bold fst-italic">User Name :</label>
<h3 className='bg-secondary text-light'>{data.name}</h3>
<label className="fs-3 fw-bold fst-italic">Email Id :</label>
<h3 className='bg-secondary text-light'>{data.email}</h3>
<label  className="fs-3 fw-bold fst-italic">Contact No. :</label>
<h3 className='bg-secondary text-light'>{data.phone}</h3>
<label className="fs-3 fw-bold fst-italic">Street :</label>
<h3 className='bg-secondary text-light'>{data.street} {data.landmark}</h3>
<label className="fs-3 fw-bold fst-italic">City :</label>
<h3 className='bg-secondary text-light'>{data.city}, pin : {data.pincode}</h3>
<button className='bg-primary shadow p-2 mt-2 w-25 mx-5' onClick={handleOrders} >My orders</button>
<button className='bg-primary shadow p-2 mt-2 w-25 mx-4' onClick={handleClick} >Inventory</button>
</div>
  )
}
