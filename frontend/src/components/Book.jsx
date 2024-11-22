import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { apiUrl } from '../../config';
import LoadingAnimation from './LoadingAnimation';
import { Pencil, Star } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import EditBook from './EditBook';

const Book = () => {

    const {user} = useContext(AuthContext);
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showEditBook, setShowEditBook] = useState(false);

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
            <div className='flex p-4 gap-4 bg-[#d2c2b5] rounded-lg relative'>
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
                {(user && (book.userId == user.id)) && <button onClick={() => setShowEditBook(true)} className='absolute top-4 right-4 rounded-full p-4 bg-[#ad9a89] z-10'><Pencil /></button>}
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
            <EditBook setBook={setBook} showEditBook={showEditBook} setShowEditBook={setShowEditBook} id={book.id} oldTitle={book.title} oldAuthor={book.authorName} oldIsbn={book.isbn} oldGenre={book.genre} oldCoverImageUrl={book.coverImageUrl} />
        </div>
    )
}   

export default Book
