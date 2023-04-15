import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

export const api = axios.create({
  baseURL : 'https://lovely-spotty-settee.glitch.me/api'
})

export default function HomePage() {
  return (
    <Link to={'/home'}>
    <button className='bg-primary ms-4' >Explore The Store Now</button>
    </Link>
  )
}
