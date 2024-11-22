import React, { useContext, useEffect } from 'react'
import { Heart, HouseIcon, LogIn, LogOut, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';

const NavBar = ({ setShowLoginSignup }) => {

    const {isAuthenticated , setIsAuthenticated} = useContext(AuthContext);

    return (
        <div className='flex px-4 py-2 bg-[#d2c2b5] items-center justify-between'>
            <div className='flex items-center gap-4'>
                <p className='text-3xl font-extrabold'>BookBuzz</p>
                <Link to='/' className='flex gap-2 items-center justify-center'><HouseIcon /> Home</Link>
                <Link to='/recommendations' className='flex gap-2 items-center justify-center'><Heart /> Recommendations</Link>
                <Link to='/search' className='flex gap-2 items-center justify-center'><Search /> Search</Link>
            </div>
            <div className='flex items-center gap-4'>
                {isAuthenticated ?
                    <div onClick={() => {localStorage.removeItem('token'); setIsAuthenticated(false);}} className='flex gap-2 items-center justify-center cursor-pointer'><LogOut /> Log Out</div> : 
                    <div onClick={() => setShowLoginSignup(true)} className='flex gap-2 items-center justify-center cursor-pointer'><LogIn /> Log In</div>
                }
            </div>
        </div>
    )
}

export default NavBar
