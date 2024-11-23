import React, { useState } from 'react'
import LoadingAnimation from './LoadingAnimation.jsx';
import axios from 'axios';
import { apiUrl } from '../../config.js';

const RatingPopUp = ({ showRatingPopUp, setShowRatingPopUp, coverImageUrl, myReview, setMyReview, setForceReload, bookId }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [myRating, setMyRating] = useState('');

    const handleSubmit = () => {
        setMyRating(myRating.trim());
        if(myRating != '') {
            setIsLoading(true);
            axios.post(apiUrl+'reviews/', {
                rating: myRating,
                text: myReview,
                bookId: bookId
            }, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            }).then((res) => {
                console.log(res.data);
                setMyRating('');
                setMyReview('');
                setIsLoading(false);
                setForceReload();
                setShowRatingPopUp(false);
            }).catch((error) => {
                console.log(error);
                setMyRating('');
                setMyReview('');
                setIsLoading(false);
                setShowRatingPopUp(false);
            });
        }
    }


    return (
        <div onClick={() => setShowRatingPopUp(false)} className={`${showRatingPopUp ? 'flex' : 'hidden'} w-full h-full items-center justify-center bg-inherit backdrop-blur-sm z-50 fixed top-0 right-0 left-0 bottom-0`}>
            <div onClick={(e) => e.stopPropagation()} className='w-[30%] flex flex-col px-4 py-8 text-center items-center justify-center bg-[#c2ae9e] border-[1px] border-solid border-[#5b3e35] rounded-lg gap-4'>
                <p>Rate the book before submiting your review</p>
                <img className='w-[150px]' src={coverImageUrl} alt="Book Cover" />
                <div className='flex flex-row gap-2'>
                    <input value={myRating} onChange={(e) => setMyRating(e.target.value)} className='w-[30px] bg-[#d2c2b5] border-2 border-solid border-[#583328] rounded-md focus:outline-none' type="text" /> / 5
                </div>
                <button onClick={handleSubmit} className='bg-[#916e63] text-white px-4 py-2 rounded-lg'>
                    {isLoading ? <LoadingAnimation /> : 'Submit'}
                </button>
            </div>
        </div>
    )
}

export default RatingPopUp
