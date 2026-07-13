import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { SiOnlyoffice } from "react-icons/si";
import { useDispatch } from 'react-redux';
// import { setSearchJobByText } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

function Header() {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const searchJobHandler = () => {
        // dispatch(setSearchJobByText(query));
        // setQuery("");
        dispatch(setSearchedQuery(query));
        navigate("/browse");

    }
    return (
        <div className="py-12 md:py-16 px-4">
            <div className="text-center max-w-4xl mx-auto">

                <span className="px-4 mx-auto flex justify-center items-center py-2 gap-2 rounded-full bg-gray-200 text-red-600 font-medium">
                    <SiOnlyoffice className="text-[#614232] text-lg" />
                    No.1 Job Hunt Website
                </span>

                <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                    Search Apply & <br />
                    Get Your <span className="text-[#6A38C2]">Dream Job</span>
                </h2>

                <p className="text-gray-600 mb-8">
                    Start your hunt for the best, life-changing career opportunities
                    from here in your selected areas conveniently and get hired quickly.
                </p>

                {/* Search Box */}
                <div className="flex items-center w-full md:w-[60%] mx-auto shadow-md border border-gray-300 rounded-full overflow-hidden">

                    <input
                        type="text"
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Find Your Dream Job"
                        className="flex-1 px-4 py-3 outline-none focus:ring-2 focus:ring-[#6A38C2]/30"
                    />

                    <Button onClick={searchJobHandler} className="rounded-none rounded-r-full px-6 py-3 bg-transparent hover:bg-transparent cursor-pointer">
                        <Search className="h-5 w-5 text-black hover:scale-110 hover:text-gray-800 transition-all duration-200 ease-in-out" />
                    </Button>

                </div>

            </div>
        </div>
    )
}

export default Header