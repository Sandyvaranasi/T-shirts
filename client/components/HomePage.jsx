import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

export const api = axios.create({
  // baseURL : 'https://lovely-spotty-settee.glitch.me/api'
  baseURL : import.meta.env.VITE_BASE_URL
})

export default function HomePage() {
  return (
    <>
    <Link to={'/home'}>
    <button className='bg-primary' style={{marginLeft:"60rem", marginBottom:'5rem'}} >Explore The Store Now</button>
    </Link>
    <div className='text-white fst-italic' style={{marginLeft:"15rem", fontWeight:'bold',fontSize:'4rem'}} >
      <ul >Retro</ul>
      <ul>Inspired</ul>
      <ul>T-Shirts</ul>
    </div>
    </>
  )
}
