import React, { useEffect, useState } from 'react'
import { SearchIcon } from 'lucide-react'
import axios from 'axios';
import { apiUrl } from '../../config';
import LoadingAnimation from './LoadingAnimation';
import BookCard from './BookCard';

const Search = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('title');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSearch = () => {
        setSearchQuery(searchQuery.trim());
        if(searchQuery != '') {
            setIsLoading(true);
            let filterPath = (filter == 'title') ? '' : (filter == 'authorName') ? 'author' : (filter == 'isbn') ? 'isbn' : 'genre';
            const encodedQuery = encodeURIComponent(searchQuery);
            axios.get(apiUrl+'search/'+filterPath+'?query='+encodedQuery).then(res => {
                if (res.status == 200) {
                    console.log(res.data);
                    setIsLoading(false);
                    setSearchResults(res.data);
                }
            }).catch(error => {
                setIsLoading(false);
                console.log(error.message);
            });
        }
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            handleSearch();
        }
    }
    
    useEffect(() => {
        handleSearch();
    }, [filter]);

    return (
        <div className='w-[80%] m-auto my-4 flex flex-col gap-4'>
            <div className='flex gap-2 w-full bg-[#f1ebe1] text-[#5b3e35] rounded-full px-4 py-2'>
                <div onClick={handleSearch} className='cursor-pointer hover:bg-[#d2c2b5] rounded-full p-2'>
                    <SearchIcon />
                </div>
                <input onKeyDown={handleKeyDown} onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} className='flex-1 bg-inherit focus:outline-none' type='text' placeholder='Search for books' />
            </div>
            <div className='flex gap-4'>
                <div className={`${(filter == 'title') ? 'bg-[#5b3e35]' : 'bg-[#d2c2b5]'} border-2 border-solid border-[#5b3e35] rounded-full px-4 py-2 cursor-pointer`} onClick={() => {setFilter('title')}}>Title</div>
                <div className={`${(filter == 'authorName') ? 'bg-[#5b3e35]' : 'bg-[#d2c2b5]'} border-2 border-solid border-[#5b3e35] rounded-full px-4 py-2 cursor-pointer`} onClick={() => {setFilter('authorName')}}>Author</div>
                <div className={`${(filter == 'isbn') ? 'bg-[#5b3e35]' : 'bg-[#d2c2b5]'} border-2 border-solid border-[#5b3e35] rounded-full px-4 py-2 cursor-pointer`} onClick={() => {setFilter('isbn')}}>ISBN</div>
                <div className={`${(filter == 'genre') ? 'bg-[#5b3e35]' : 'bg-[#d2c2b5]'} border-2 border-solid border-[#5b3e35] rounded-full px-4 py-2 cursor-pointer`} onClick={() => {setFilter('genre')}}>Genre</div>
            </div>
            
            <div className='flex flex-wrap gap-4'>
                {isLoading ? <LoadingAnimation /> : searchResults.map((book, index) => (
                    <BookCard key={index} id={book.id} title={book.title} authorName={book.authorName} coverImageUrl={book.coverImageUrl} />
                ))}
            </div>

        </div>
    )
}

export default Search
