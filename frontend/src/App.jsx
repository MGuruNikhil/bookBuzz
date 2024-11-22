import { useState } from "react";
import LoginSignup from "./components/LoginSignup"
import NavBar from "./components/NavBar"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./components/Home";
import Recommendations from "./components/Recommendations";
import Search from "./components/Search";
import Book from "./components/Book";
import AddBook from "./components/AddBook";

function App() {

    const [showLoginSignup, setShowLoginSignup] = useState(false);
    const [showAddBook, setShowAddBook] = useState(false);

    return (
        <div className="w-full h-full overflow-auto">
            <BrowserRouter>
                <NavBar setShowLoginSignup={setShowLoginSignup} setShowAddBook={setShowAddBook} />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/recommendations' element={<Recommendations />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/book/:id' element={<Book />} />
                </Routes>
                <LoginSignup showLoginSignup={showLoginSignup} setShowLoginSignup={setShowLoginSignup} />
                <AddBook showAddBook={showAddBook} setShowAddBook={setShowAddBook} />
            </BrowserRouter>
        </div>
    )
}

export default App
