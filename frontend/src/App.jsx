import { useState } from "react";
import LoginSignup from "./components/LoginSignup"
import NavBar from "./components/NavBar"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./components/Home";
import Recommendations from "./components/Recommendations";
import Search from "./components/Search";

function App() {

    const [showLoginSignup, setShowLoginSignup] = useState(false);

    return (
        <div className="w-full h-full flex flex-col">
            <BrowserRouter>
                <NavBar setShowLoginSignup={setShowLoginSignup}/>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/recommendations' element={<Recommendations />} />
                    <Route path='/search' element={<Search />} />
                </Routes>
                <LoginSignup showLoginSignup={showLoginSignup} setShowLoginSignup={setShowLoginSignup}/>
            </BrowserRouter>
        </div>
    )
}

export default App
