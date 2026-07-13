
import { setAllJobs } from "../redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";




const useGetAllJobs = () => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { searchedQuery } = useSelector((store) => store.job);




    // useEffect(() => {

    //     const fetchAllJobs = async () => {

    //         try {

    //             setLoading(true);

    //             const res = await axios.get(
    //                 `${JOB_API_ENDPOINT}/get?keyword=${searchedQuery}`,
    //                 { withCredentials: true }
    //             );

    //             console.log("API Response:", res.data);

    //             if (res.data.success) {

    //                 dispatch(setAllJobs(res.data.jobs));

    //             }

    //         } catch (error) {

    //             console.log(error);

    //             setError(
    //                 error?.response?.data?.message ||
    //                 error.message ||
    //                 "Failed to fetch jobs"
    //             );

    //         } finally {

    //             setLoading(false);

    //         }
    //     };

    //     fetchAllJobs();

    // }, [dispatch]);

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                setLoading(true);

                const res = await axios.get(
                    `${JOB_API_ENDPOINT}/get?keyword=${searchedQuery}`,
                    { withCredentials: true }
                );

                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllJobs();

    }, [dispatch, searchedQuery]); // 👈 ye add karo
    return { loading, error };
};

export default useGetAllJobs;




// import { setAllJobs } from "../redux/jobSlice";
// import { JOB_API_ENDPOINT } from "@/utils/data";
// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

// const useGetAllJobs = () => {

//     const dispatch = useDispatch();

//     useEffect(() => {

//         const fetchAllJobs = async () => {

//             try {

//                 const res = await axios.get(
//                     `${JOB_API_ENDPOINT}/get`,
//                     { withCredentials: true }
//                 );

//                 console.log("API Response", res.data);

//                 if (res.data.success) {

//                     console.log("Dispatching Jobs:", res.data.jobs);

//                     dispatch(setAllJobs(res.data.jobs));
//                 }

//             } catch (error) {

//                 console.log(error);
//             }
//         };

//         fetchAllJobs();

//     }, [dispatch]);
// };

// export default useGetAllJobs;






// ****************************************************************************************





// import { setAllJobs } from '@/redux/jobSlice';
// import { JOB_API_ENDPOINT } from '@/utils/data';
// import axios from 'axios';
// // import React, { useEffect } from 'react'
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';

// const useGetAllJobs = () => {

//     const dispatch = useDispatch();


//     useEffect(() => {
//         // fetch all the jobs from the api
//         const fetchAllJobs = async () => {
//             try {

//                 const res = await axios.get(`${JOB_API_ENDPOINT}/get`, { withCredentials: true });
//                 console.log("API Response", res.data);

//                 // if (res.data.success) {
//                 //     // dispatch the jobs to the store
//                 //     // dispatch(setAllJobs(res.data.jobs));
//                 //     dispatch(setAllJobs(res.data.jobs));
//                 // }
//                 if (res.data.status) {
//                     dispatch(setAllJobs(res.data.jobs));
//                     console.log("Dispatched Jobs:", res.data.jobs);
//                     // console.log("Dispatching:", res.data.jobs);
//                     // dispatch(setAllJobs(res.data.jobs));
//                 }



//             } catch (error) {
//                 console.error(error);
//             }

//         }
//         fetchAllJobs();
//     }, []);
// }

// export default useGetAllJobs
