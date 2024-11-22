import { ImagePlus } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios';
import { apiUrl } from '../../config.js';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from './LoadingAnimation.jsx';

const EditBook = ({ setBook, showEditBook, setShowEditBook, id, oldTitle, oldAuthor, oldIsbn, oldGenre, oldCoverImageUrl }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState(oldTitle);
    const [authorName, setAuthorName] = useState(oldAuthor);
    const [isbn, setIsbn] = useState(oldIsbn);
    const [genre, setGenre] = useState(oldGenre);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        setTitle(title.trim());
        setAuthorName(authorName.trim());
        setIsbn(isbn.trim());
        setGenre(genre.trim());
        
        if(title != '' && authorName != '' && isbn != '' && genre != '') {
            setIsLoading(true);
            axios.put(apiUrl + "books/"+id,{
                title,
                authorName,
                isbn,
                genre,
                coverImageUrl: oldCoverImageUrl
            }, {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            }).then((res) => {
                console.log(res.data);
                setBook(res.data);
                setShowEditBook(false);
                setIsLoading(false);
            }).catch((error) => {
                console.log(error);
                setShowEditBook(false);
                setIsLoading(false);
            });
        }
    }

    const handleDelete = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this book?');
        if(!confirmDelete) {
            return;
        }
        setIsLoading(true);
        axios.delete(apiUrl + "books/"+id, {
            headers: {
                Authorization: `${localStorage.getItem("token")}`
            }
        }).then((res) => {
            console.log(res.data);
            setShowEditBook(false);
            setIsLoading(false);
            navigate('/');
        }).catch((error) => {
            console.log(error);
            setShowEditBook(false);
            setIsLoading(false);
            navigate('/');
        });
    }

    return (
        <div onClick={() => setShowEditBook(false)} className={`${showEditBook ? 'flex' : 'hidden'} w-full h-full items-center justify-center bg-inherit backdrop-blur-sm z-50 fixed top-0 right-0 left-0 bottom-0`}>
            <div onClick={(e) => e.stopPropagation()} className='w-[30%] flex flex-col px-4 py-8 items-center justify-center bg-[#c2ae9e] border-[1px] border-solid border-[#5b3e35] rounded-lg gap-4'>
                <h1 className='font-bold text-lg text-center'>Edit Book</h1>
                <input onChange={(e) => setTitle(e.target.value)} value={title} className='p-2 border-b-2 border-b-[#5b3e35] focus:outline-none' type="text" placeholder='Enter Title' />
                <input onChange={(e) => setAuthorName(e.target.value)} value={authorName} className='p-2 border-b-2 border-b-[#5b3e35] focus:outline-none' type="text" placeholder='Enter Author Name' />
                <input onChange={(e) => setIsbn(e.target.value)} value={isbn} className='p-2 border-b-2 border-b-[#5b3e35] focus:outline-none' type="text" placeholder='Enter ISBN' />
                <input onChange={(e) => setGenre(e.target.value)} value={genre} className='p-2 border-b-2 border-b-[#5b3e35] focus:outline-none' type="text" placeholder='Enter Genre' />
                <button onClick={handleSubmit} className='p-2 bg-[#916e63] text-[#c2ae9e] font-semibold rounded-md'>
                    {isLoading ? <LoadingAnimation /> : 'Edit Book'}
                </button>
                <div className='flex gap-2'>
                    <button onClick={() => setShowEditBook(false)} className='p-2 bg-[#74554c] text-[#bdb0a5] font-semibold rounded-md'>Cancel</button>
                    <button onClick={handleDelete} className='p-2 bg-[#583328] text-[#bdb0a5] font-semibold rounded-md'>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default EditBook
