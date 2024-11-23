import React, { useState } from 'react'
import LoadingAnimation from './LoadingAnimation';
import axios from 'axios';
import { apiUrl } from '../../config';

const EditRatingPopUp = ({ showEditRatingPopUp, setShowEditRatingPopUp, coverImageUrl, oldRating, oldText, setForceReload, bookId }) => {

    const [reviewText, setReviewText] = useState(oldText);
    const [rating, setRating] = useState(oldRating);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        setRating(rating.trim());
        setReviewText(reviewText.trim());
        if(rating != '') {
            setIsLoading(true);
            axios.put(apiUrl+'reviews/', {
                rating: rating,
                text: reviewText,
                bookId: bookId
            }, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            }).then((res) => {
                console.log(res.data);
                setRating('');
                setReviewText('');
                setIsLoading(false);
                setForceReload();
                setShowEditRatingPopUp(false);
            }).catch((error) => {
                console.log(error);
                setRating('');
                setReviewText('');
                setIsLoading(false);
                setShowEditRatingPopUp(false);
            });
        }
    }

    const handleDelete = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this review?');
        if(!confirmDelete) {
            return;
        }
        setIsLoading(true);
        axios.delete(apiUrl+'reviews/', {
            params: {
                bookId
            },
            headers: {
                Authorization: `${localStorage.getItem("token")}`
            }
        }).then((res) => {
            console.log(res.data);
            setRating('');
            setReviewText('');
            setIsLoading(false);
            setForceReload();
            setShowEditRatingPopUp(false);
        }).catch((error) => {
            console.log(error);
            setRating('');
            setReviewText('');
            setIsLoading(false);
            setShowEditRatingPopUp(false);
        });
    }

    return (
        <div onClick={() => setShowEditRatingPopUp(false)} className={`${showEditRatingPopUp ? 'flex' : 'hidden'} w-full h-full items-center justify-center bg-inherit backdrop-blur-sm z-50 fixed top-0 right-0 left-0 bottom-0`}>
            <div onClick={(e) => e.stopPropagation()} className='w-[30%] flex flex-col px-4 py-8 items-center justify-center bg-[#c2ae9e] border-[1px] border-solid border-[#5b3e35] rounded-lg gap-4'>
                <h1 className='font-bold text-lg text-center'>Edit Review</h1>
                <img className='w-[150px]' src={coverImageUrl} alt="Book Cover" />
                <div className='flex flex-row gap-2'>
                    <input onChange={(e) => setRating(e.target.value)} value={rating} className='w-[30px] bg-[#d2c2b5] border-2 border-solid border-[#583328] rounded-md focus:outline-none' type="text" /> / 5
                </div>
                <input onChange={(e) => setReviewText(e.target.value)} value={reviewText} className='w-[80%] p-2 border-b-2 border-b-[#5b3e35] focus:outline-none' type="text" placeholder='Enter Review' />
                <button onClick={handleSubmit} className='bg-[#916e63] text-white px-4 py-2 rounded-lg'>
                    {isLoading ? <LoadingAnimation /> : 'Submit'}
                </button>
                <button onClick={handleDelete} className='p-2 bg-[#583328] text-[#bdb0a5] font-semibold rounded-md'>Delete</button>
            </div>
        </div>
    )
}

export default EditRatingPopUp
