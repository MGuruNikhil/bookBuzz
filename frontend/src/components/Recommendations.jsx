import React, { useState, useEffect } from 'react'
import BookCard from './BookCard'
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../config';
import axios from 'axios';
import LoadingAnimation from './LoadingAnimation';

const Recommendations = () => {

    const navigate = useNavigate();

    const [topRatedBooks, setTopRatedBooks] = useState([]);
    const [latestBooks, setLatestBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.get(apiUrl+'recommend/toprated').then(res => {
            if (res.status == 200) {
                console.log(res.data);
                setTopRatedBooks(res.data);
                axios.get(apiUrl+'recommend/recent').then(res => {
                    if (res.status == 200) {
                        console.log(res.data);
                        setLatestBooks(res.data);
                        axios.get(apiUrl+'recommend/genres').then(res => {
                            if (res.status == 200) {
                                console.log(res.data);
                                const genres = res.data.map(genre => genre.genre);
                                let tempGenres = [];
                                for(let i=0;i<genres.length;i++) {
                                    const encodedGenre = encodeURIComponent(genres[i]);
                                    axios.get(apiUrl+`search/genre?query=${encodedGenre}`).then(res => {
                                        if (res.status == 200) {
                                            console.log(res.data);
                                            tempGenres.push(res.data);
                                            setGenres([...tempGenres]);
                                            if(i==genres.length-1) {
                                                setIsLoading(false);
                                            }
                                        }
                                    }).catch(error => {
                                        if(i==genres.length-1) {
                                            setIsLoading(false);
                                        }
                                        console.log(error.message);
                                    });
                                }
                            }
                        }).catch(error => {
                            console.log(error.message);
                        });
                    }
                }).catch(error => {
                    console.log(error.message);
                });
            }
        }).catch(error => {
            console.log(error.message);
        });

    }, []);

    if(isLoading) {
        return (
            <div className='flex justify-center items-center w-full h-full bg-white'>
                <LoadingAnimation />
            </div>
        )
    }

    return (
        <div className='flex flex-col overflow-y-scoll py-4'>
            <div className='w-[95%] h-[354.35px] rounded-l-full self-end mt-4 px-40 py-2 overflow-x-scroll overflow-y-hidden bg-[#d2c2b5] flex flex-col gap-4 justify-center items-start'>
                <p className='font-bold text-2xl sticky left-0'>Top Rated</p>
                <div className='flex gap-10'>
                    {topRatedBooks && topRatedBooks.map(book => <BookCard key={book.id} id={book.id} title={book.title} authorName={book.authorName} coverImageUrl={book.coverImageUrl} />)}
                </div>
            </div>

            <div className='w-[95%] h-[354.35px] rounded-r-full self-start mt-4 px-40 py-2 overflow-x-scroll overflow-y-hidden bg-[#d2c2b5] flex flex-col gap-4 justify-center items-start'>
                <p className='font-bold text-2xl sticky left-0'>Latest</p>
                <div className='flex gap-10'>
                    {latestBooks && latestBooks.map(book => <BookCard key={book.id} id={book.id} title={book.title} authorName={book.authorName} coverImageUrl={book.coverImageUrl} />)}
                </div>
            </div>

            {genres && genres.map((genre, index) => (
                <div key={index} className={`${(index%2==0) ? 'rounded-l-full rounded-r-none self-end' : 'rounded-r-full rounded-l-none self-start'} w-[95%] h-[354.35px] rounded-r-full mt-4 px-40 py-2 overflow-x-scroll overflow-y-hidden bg-[#d2c2b5] flex flex-col gap-4 justify-center items-start`}>
                    <p className='font-bold text-2xl sticky left-0'>{genre[0].genre}</p>
                    <div className='flex gap-10'>
                    {Array.isArray(genre) && genre.map(book => (
                        <BookCard 
                            key={book.id} 
                            id={book.id} 
                            title={book.title} 
                            authorName={book.authorName} 
                            coverImageUrl={book.coverImageUrl} 
                        />
                    ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Recommendations
