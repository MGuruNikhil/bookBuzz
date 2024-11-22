import { ImagePlus } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios';
import { apiUrl } from '../../config.js';
// import 'dotenv/config';
// import { v2 as cloudinary } from 'cloudinary';

const AddBook = ({ showAddBook, setShowAddBook }) => {
    const [title, setTitle] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [isbn, setIsbn] = useState('');
    const [genre, setGenre] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        setTitle(title.trim());
        setAuthorName(authorName.trim());
        setIsbn(isbn.trim());
        setGenre(genre.trim());
        // if(title != '' && authorName != '' && isbn != '' && genre != '' && coverImage != null) {
        //     setIsLoading(true);

        //     // upload cover image to cloudinary and get the url
        //     cloudinary.uploader.upload(coverImage, {
        //         upload_preset: 'bookstore'
        //     }).then((res) => {
        //         console.log(res);
        //         const coverImageUrl = res.secure_url;
        //         axios.post(apiUrl + "books/",{
        //             title,
        //             authorName,
        //             isbn,
        //             genre,
        //             coverImageUrl
        //         }, {
        //             headers: {
        //                 Authorization: `Bearer ${localStorage.getItem("token")}`
        //             }
        //         }).then((res) => {
        //             console.log(res.data);
        //             setTitle('');
        //             setAuthorName('');
        //             setIsbn('');
        //             setGenre('');
        //             setCoverImage(null);
        //             setShowAddBook(false);
        //             setIsLoading(false);
        //         }).catch((error) => {
        //             console.log(error);
        //             setTitle('');
        //             setAuthorName('');
        //             setIsbn('');
        //             setGenre('');
        //             setCoverImage(null);
        //             setShowAddBook(false);
        //             setIsLoading(false);
        //         });
        //     }).catch((error) => {
        //         console.log(error);
        //         setIsLoading(false);
        //     });
        // }
    }

    return (
        <div onClick={() => setShowAddBook(false)} className={`${showAddBook ? 'flex' : 'hidden'} w-full h-full items-center justify-center bg-inherit backdrop-blur-sm z-50 fixed top-0 right-0 left-0 bottom-0`}>
            <div onClick={(e) => e.stopPropagation()} className='w-[30%] flex flex-col px-4 py-8 items-center justify-center bg-[#c2ae9e] border-[1px] border-solid border-[#5b3e35] rounded-lg gap-4'>
                <h1 className='font-bold text-lg text-center'>Add Book</h1>
                <input onChange={(e) => setTitle(e.target.value)} value={title} className='p-2 border-b-2 border-b-[#5b3e35] focus:outline-none' type="text" placeholder='Enter Title' />
                <input onChange={(e) => setAuthorName(e.target.value)} value={authorName} className='p-2 border-b-2 border-b-[#5b3e35] focus:outline-none' type="text" placeholder='Enter Author Name' />
                <input onChange={(e) => setIsbn(e.target.value)} value={isbn} className='p-2 border-b-2 border-b-[#5b3e35] focus:outline-none' type="text" placeholder='Enter ISBN' />
                <input onChange={(e) => setGenre(e.target.value)} value={genre} className='p-2 border-b-2 border-b-[#5b3e35] focus:outline-none' type="text" placeholder='Enter Genre' />
                <label htmlFor="coverImage" className='flex gap-2 cursor-pointer'>
                    <ImagePlus />
                    <span>Upload Cover Page</span>
                </label>
                <input className="hidden" type="file" accept="image/*" name="coverImage" id="coverImage" />
                <button onClick={handleSubmit} className='p-2 bg-[#5b3e35] text-[#c2ae9e] font-semibold rounded-md'>
                    {isLoading ? <LoadingAnimation /> : 'Add Book'}
                </button>
            </div>
        </div>
    )
}

export default AddBook
