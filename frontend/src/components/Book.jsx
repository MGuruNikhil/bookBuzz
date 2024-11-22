import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { apiUrl } from '../../config';
import LoadingAnimation from './LoadingAnimation';
import { Star } from 'lucide-react';

const Book = () => {

    const { id } = useParams();
    const [book, setBook] = useState({});
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get(apiUrl+'books/'+id).then(res => {
            if (res.status == 200) {
                console.log(res.data);
                setBook(res.data);
                axios.get(apiUrl+'reviews/', {
                    params: {
                        bookId: id
                    }
                }).then(res => {
                    if (res.status == 200) {
                        console.log(res.data);
                        setReviews(res.data);
                        setIsLoading(false);
                    }
                }).catch(error => {
                    console.log(error.message);
                    setIsLoading(false);
                });
            }
        }).catch(error => {
            console.log(error.message);
            setIsLoading(false);
        });
    }, [id]);

    if(isLoading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <LoadingAnimation />
            </div>
        )
    }

    return (
        <div className='flex flex-col w-[80%] m-auto mt-2 rounded-lg bg-[#d2c2b593]'>
            <div className='flex p-4 gap-4 bg-[#d2c2b5] rounded-lg'>
                <img className='w-[150px]' src={book.coverImageUrl} alt="Book Cover" />
                <div className='flex-1 flex flex-col justify-between'>
                    <div>
                        <p className='text-4xl font-bold'>{book.title}</p>
                        <p className='text-lg'>by {book.authorName}</p>
                    </div>
                    <div>
                        <p className='text-lg'>Genre : {book.genre}</p>
                        <p className='text-lg'>ISBN : {book.isbn}</p>
                        <p className='text-lg flex gap-2'><Star /> {book.rating}/5</p>
                    </div>
                </div>
            </div>
            {reviews && reviews.length > 0 && reviews.map((review, index) => (
                <div key={index} className={`${(index != reviews.length-1) ? ' border-b-[1px] border-b-solid border-b-gray-600' : ''} flex flex-col p-4 gap-4`}>
                    <div>
                        <p className='font-bold'>{review.userDisplayName}</p>
                        <p className='flex gap-2 items-center'><Star size={16} /> {review.rating}/5</p>
                    </div>
                    <p>{review.text}</p>
                </div>
            ))}

        </div>
    )
}

export default Book
