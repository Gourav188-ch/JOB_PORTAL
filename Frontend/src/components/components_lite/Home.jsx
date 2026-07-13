import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";

import useGetAllJobs from "@/hooks/useGetAllJobs";

const Home = () => {

    const { loading, error } = useGetAllJobs();

    const { user } = useSelector((store) => store.auth);

    const navigate = useNavigate();

    useEffect(() => {

        if (user?.role === "Recruiter") {

            navigate("/admin/companies");

        }

    }, [user, navigate]);

    return (

        <div>

            <Navbar />

            <Header />

            <Categories />

            {loading && (
                <div className="text-center my-5 text-lg">
                    Loading jobs...
                </div>
            )}

            {error && (
                <div className="text-center my-5 text-red-500">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <LatestJobs />
            )}

            <Footer />

        </div>
    );
};

export default Home;



// import React from 'react'
// import Navbar from './Navbar'
// import Header from './Header'
// import Categories from './Categories'
// import LatestJobs from './LatestJobs'
// import Footer from './Footer'
// import useGetAllJobs from '@/hooks/useGetAllJobs'

// const Home = () => {
//     useGetAllJobs();
//     return (
//         <div>
//             <Navbar></Navbar>
//             <Header />
//             <Categories />
//             <LatestJobs />
//             <Footer />
//         </div>
//     )
// }

// export default Home
