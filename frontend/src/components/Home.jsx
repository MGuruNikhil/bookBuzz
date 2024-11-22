import React from 'react'
import { useNavigate } from "react-router-dom"

const Home = () => {

    const navigate = useNavigate();

    return (
        <div className='flex-1 bg-[#d2c2b5] flex px-8 py-4'>
            <div className='w-[40%] h-full flex flex-col justify-center items-start gap-4'>
                <p className='text-8xl font-bold'>Find Your Next Book</p>
                <p className='mt-4 text-lg'>Not sure what to read next? Discover captivating books on <span className='font-bold text-[#5b3e35]'>BookBuzz</span>, guided by trusted reviews, personalized recommendations, and so much more!</p>
                <button onClick={() => navigate('/recommendations')} className='px-4 py-2 bg-black text-[#d2c2b5]'>Explore Now</button>
            </div>
            <div className='w-[60%] flex gap-6 items-center justify-center'>
                <div className='flex flex-col items-center justify-center'>
                    <img className='w-[200px] rounded-tl-full rounded-tr-full' src="https://m.media-amazon.com/images/I/81ANaVZk5LL._SL1500_.jpg" alt="Book Image" />
                    <p className='font-bold'>Atomic Habits</p>
                    <p className='font-light'>James Clear</p>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <p className='font-bold'>Deep Work</p>
                    <p className='font-light'>Cal Newport</p>
                    <img className='w-[200px] rounded-bl-full rounded-br-full' src="https://m.media-amazon.com/images/I/61TkOFwquPL._SL1500_.jpg" alt="Book Image" />
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <img className='w-[200px] rounded-tl-full rounded-tr-full' src="https://m.media-amazon.com/images/I/81OUj5t9YoL._SL1500_.jpg" alt="Book Image" />
                    <p className='font-bold'>Lifespan</p>
                    <p className='font-light'>David Sinclair</p>
                </div>
            </div>
        </div>
    )
}

export default Home
