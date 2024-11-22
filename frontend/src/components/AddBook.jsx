import React from 'react'

const AddBook = ({ showAddBook, setShowAddBook }) => {
    return (
        <div onClick={() => setShowAddBook(false)} className={`${showAddBook ? 'flex' : 'hidden'} w-full h-full items-center justify-center bg-inherit backdrop-blur-sm z-50 fixed top-0 right-0 left-0 bottom-0`}>
            <div onClick={(e) => e.stopPropagation()} className='w-[30%] flex flex-col px-4 py-8 items-center justify-center bg-[#d2c2b57a] rounded-lg'>
                <h1 className='font-bold text-lg text-center'>Add Book</h1>
            </div>
        </div>
    )
}

export default AddBook
