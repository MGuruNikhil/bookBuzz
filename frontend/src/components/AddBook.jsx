import { ImagePlus } from 'lucide-react'
import React, { useContext, useState } from 'react'
import axios from 'axios';
import { apiUrl } from '../../config.js';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebaseConfig.js';
import { AuthContext } from '../../context/AuthContext.jsx';
import LoadingAnimation from './LoadingAnimation.jsx';

const AddBook = ({ showAddBook, setShowAddBook }) => {
    const {isAuthenticated} = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [isbn, setIsbn] = useState('');
    const [genre, setGenre] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        if(isAuthenticated === false) {
            alert('Please login to add a book.');
            return;
        }
        setTitle(title.trim());
        setAuthorName(authorName.trim());
        setIsbn(isbn.trim());
        setGenre(genre.trim());
        if(coverImage != null && title !== '' && authorName !== '' && isbn !== '' && genre !== '') {
            setIsLoading(true);
            const storageRef = ref(storage, 'coverImages/' + isbn + '.jpg');
            const uploadTask = uploadBytesResumable(storageRef, coverImage);
            uploadTask.on(
                (error) => {
                    console.log(error.message);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    axios.post(apiUrl + 'books', {
                        title: title,
                        authorName: authorName,
                        isbn: isbn,
                        genre: genre,
                        coverImageUrl: downloadURL
                    }, {
                        headers: {
                            Authorization: `${localStorage.getItem("token")}`
                        }
                    }).then((response) => {
                        console.log(response.data);
                        setIsLoading(false);
                        setShowAddBook(false);
                    }).catch((error) => {
                        console.log(error.message);
                        setIsLoading(false);
                    });
                }
            );
        } else {
            alert('Please fill in all fields and select a cover image.');
        }
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
                <input onChange={(e) => setCoverImage(e.target.files[0])} className="hidden" type="file" accept="image/*" name="coverImage" id="coverImage" />
                <button onClick={handleSubmit} className='p-2 bg-[#916e63] text-[#c2ae9e] font-semibold rounded-md'>
                    {isLoading ? <LoadingAnimation /> : 'Add Book'}
                </button>
            </div>
        </div>
    )
}

export default AddBook
