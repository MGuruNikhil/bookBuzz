import React, { useContext, useEffect, useState } from 'react'
import LoadingAnimation from './LoadingAnimation';
import axios from 'axios';
import { apiUrl } from '../../config';
import { AuthContext } from '../../context/AuthContext';

const Login = ({ setShowLoginSignup }) => {

    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(isAuthenticated) {
            setShowLoginSignup(false);
        }
    }, [isAuthenticated]);

    const handleSubmit = () => {
        setEmail(email.trim());
        setPassword(password.trim());
        if(email != '' && password != '') {
            setIsLoading(true);
            axios.post(apiUrl + "auth/login", {
                email,
                password,
            }).then((res) => {
                localStorage.setItem("token", res.data.token)
                setIsAuthenticated(true);
                setShowLoginSignup(false);
                setEmail('');
                setPassword('');
                setIsLoading(false);
            }).catch((error) => {
                setEmail('');
                setPassword('');
                setIsLoading(false);
                setIsAuthenticated(false);
                console.log(error);
            });
        }
    }

    return (
        <div className='mt-4 flex flex-col gap-2'>
            <h1 className='font-bold text-lg text-center'>Log In</h1>
            <input onChange={(e) => setEmail(e.target.value)} value={email} className='p-2 border-b-2 border-b-[#5b3e35] focus:outline-none' type="email" placeholder='Enter Email' />
            <input onChange={(e) => setPassword(e.target.value)} value={password} className='p-2 border-b-2 border-b-[#5b3e35] focus:outline-none' type="password" placeholder='Enter Password' />
            <button onClick={handleSubmit} className='p-2 bg-[#d2c2b5] text-[#5b3e35] font-semibold rounded-md'>
                {isLoading ? <LoadingAnimation /> : 'Log In'}
            </button>
        </div>
    )
}

const Signup = ({ setShowLoginSignup, setShowLogin }) => {

    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    
    const [displayname, setDisplayname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(isAuthenticated) {
            setShowLoginSignup(false);
        }
    }, [isAuthenticated]);

    const handleSubmit = () => {
        setDisplayname(displayname.trim());
        setEmail(email.trim());
        setPassword(password.trim());
        if(displayname != '' && email != '' && password != '') {
            setIsLoading(true);
            axios.post(apiUrl + "auth/register", {
                displayname,
                email,
                password,
            }).then((res) => {
                localStorage.setItem("token", res.data.token)
                alert('You are successfully registered, please login to continue');
                setDisplayname('');
                setEmail('');
                setPassword('');
                setIsLoading(false);
                setShowLogin(true);
            }).catch((error) => {
                setDisplayname('');
                setEmail('');
                setPassword('');
                setIsLoading(false);
                console.log(error);
            });
        }
    }

    return (
        <div className='mt-4 flex flex-col gap-2'>
            <h1 className='font-bold text-lg text-center'>Sign Up</h1>
            <input onChange={(e) => setDisplayname(e.target.value)} value={displayname} className='p-2 border-b-2 border-b-[#5b3e35] focus:outline-none' type="text" placeholder='Enter Display Name' />
            <input onChange={(e) => setEmail(e.target.value)} value={email} className='p-2 border-b-2 border-b-[#5b3e35] focus:outline-none' type="email" placeholder='Enter Email' />
            <input onChange={(e) => setPassword(e.target.value)} value={password} className='p-2 border-b-2 border-b-[#5b3e35] focus:outline-none' type="password" placeholder='Enter Password' />
            <button onClick={handleSubmit} className='p-2 bg-[#d2c2b5] text-[#5b3e35] font-semibold rounded-md'>
                {isLoading ? <LoadingAnimation /> : 'Sign Up'}
            </button>
        </div>
    )
}

const LoginSignup = ({ showLoginSignup, setShowLoginSignup }) => {

    const [showLogin, setShowLogin] = useState(true);

    return (
        <div onClick={() => setShowLoginSignup(false)} className={`${showLoginSignup ? 'flex' : 'hidden'} w-full h-full items-center justify-center bg-inherit backdrop-blur-sm z-50 fixed top-0 right-0 left-0 bottom-0`}>
            <div onClick={(e) => e.stopPropagation()} className='w-[30%] flex flex-col px-4 py-8 items-center justify-center bg-[#c2ae9e] border-[1px] border-solid border-[#5b3e35] rounded-lg'>
                <div className='w-full flex items-center justify-center'>
                    <div onClick={() => setShowLogin(true)} className={`${showLogin ? 'bg-[#d2c2b5]' : 'bg-white'} flex-1 text-center p-2 cursor-pointer`}>Log In</div>
                    <div onClick={() => setShowLogin(false)} className={`${!showLogin ? 'bg-[#d2c2b5]' : 'bg-white'} flex-1 text-center p-2 cursor-pointer`}>Sign Up</div>
                </div>
                {showLogin ? <Login setShowLoginSignup={setShowLoginSignup} /> : <Signup setShowLoginSignup={setShowLoginSignup} setShowLogin={setShowLogin}/>}
            </div>
        </div>
    )
}

export default LoginSignup
