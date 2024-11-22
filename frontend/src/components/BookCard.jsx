import React from 'react'
import { useNavigate } from 'react-router-dom'

const BookCard = ({ id, title, authorName, coverImageUrl  }) => {

    const navigate = useNavigate();

    const handleBookClick = () => {
        navigate(`/book/${id}`);
    }

    return (
        <div onClick={handleBookClick} className='flex flex-col w-[150px] cursor-pointer'>
            <img className='w-[150px]' src={coverImageUrl} alt="Book Image" />
            <p className='font-bold mt-4'>{title.substring(0, 10)}</p>
            <p className='font-light'>{authorName}</p>
        </div>
    )
}

export default BookCard
