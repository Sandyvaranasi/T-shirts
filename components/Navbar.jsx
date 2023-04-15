import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { authContext } from '../src/App';

export default function Navbar() {
  const {isLoggedIn,loggedOut,isVendorLoggedIn} = useContext(authContext);
  
  function handleLogout(e){
    localStorage.clear()
    loggedOut()
  }
  
  console.log(isVendorLoggedIn);
  
  return (
    <nav className="navbar bg-dark fixed-top bg-body-tertiary navbar-expand-lg" data-bs-theme="dark">
  <div className="container-fluid">
    <Link className="navbar-brand fs-4 fst-italic" to={'/'}>Tee-Shirts</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
      <Link className="nav-link" to={'/home'}>Inventry</Link>
      {!isLoggedIn&&!isVendorLoggedIn&& <Link className="nav-link" to={'/login'}>Signup/Login</Link>}
      {isVendorLoggedIn&& <Link className="nav-link" to={'/shop'}>Shop Details</Link>}
      {isLoggedIn&& <Link className="nav-link" to={'/user'}>Profile</Link>}
        {(isLoggedIn||isVendorLoggedIn)&& <Link className="nav-link" to={'/home'} onClick={handleLogout}>Log Out</Link>}
        {!isLoggedIn&&!isVendorLoggedIn&& <Link className="nav-link" to={'/vendorLogin'}>Vendor's Corner</Link>}
      </div>
    </div>
  </div>
</nav>
  )
}
