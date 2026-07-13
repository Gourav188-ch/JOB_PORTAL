
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Job1 from "./Job1";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
    useGetAllJobs();

    const { allJobs, searchedQuery } = useSelector(
        (store) => store.job
    );

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    return (
        <div>
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 my-10">
                <h1 className="font-bold text-2xl mb-8">
                    {searchedQuery
                        ? `Results for "${searchedQuery}" (${allJobs.length})`
                        : `Search Results (${allJobs.length})`}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allJobs.length > 0 ? (
                        allJobs.map((job) => (
                            <Job1 key={job._id} job={job} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10">
                            <h2 className="text-xl font-semibold text-gray-500">
                                No Jobs Found 😔
                            </h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Browse;












// import React, { useEffect } from "react";
// import Navbar from "./Navbar";
// import Job1 from "./Job1";
// import { useDispatch, useSelector } from "react-redux";
// import { setSearchedQuery } from "@/redux/jobSlice";
// import useGetAllJobs from "@/hooks/useGetAllJobs";

// const Browse = () => {
//     // const { allJobs, searchedQuery } = useSelector(
//     //     (store) => store.job
//     // );
//     useGetAllJobs();
//     const { allJobs, searchedQuery } = useSelector(
//         (store) => store.job
//     );

//     console.log("searchedQuery =", searchedQuery);
//     console.log("allJobs =", allJobs);

//     const dispatch = useDispatch();

//     // Filter jobs according to category search
//     const filteredJobs = allJobs.filter((job) => {
//         if (!searchedQuery) return true;

//         return (
//             job?.title
//                 ?.toLowerCase()
//                 .includes(searchedQuery.toLowerCase()) ||
//             job?.description
//                 ?.toLowerCase()
//                 .includes(searchedQuery.toLowerCase()) ||
//             job?.location
//                 ?.toLowerCase()
//                 .includes(searchedQuery.toLowerCase())
//         );
//     });

//     // Clear search when leaving browse page
//     useEffect(() => {
//         return () => {
//             dispatch(setSearchedQuery(""));
//         };
//     }, [dispatch]);

//     return (
//         <div>
//             <Navbar />

//             <div className="max-w-7xl mx-auto px-4 py-10">
//                 {/* Heading */}
//                 <div className="mb-8">
//                     <h1 className="text-3xl font-bold text-gray-900">
//                         Search Results
//                     </h1>

//                     <p className="text-gray-500 mt-2">
//                         {searchedQuery
//                             ? `Results for "${searchedQuery}" (${filteredJobs.length})`
//                             : `Total Jobs (${filteredJobs.length})`}
//                     </p>
//                 </div>

//                 {/* Jobs Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {filteredJobs.length > 0 ? (
//                         filteredJobs.map((job) => (
//                             <Job1
//                                 key={job._id}
//                                 job={job}
//                             />
//                         ))
//                     ) : (
//                         <div className="col-span-full flex items-center justify-center h-40 border rounded-xl bg-gray-50">
//                             <p className="text-lg text-gray-500 font-medium">
//                                 No jobs found 😔
//                             </p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Browse;



















// import React, { useEffect } from "react";
// import Navbar from "./Navbar";
// import Job1 from "./Job1";
// import { useDispatch, useSelector } from "react-redux";
// import { setSearchedQuery } from "@/redux/jobSlice";

// const Browse = () => {
//     // const { allJobs } = useSelector((store) => store.job);
//     const { allJobs, searchedQuery } = useSelector((store) => store.job);

//     console.log("Browse Query:", searchedQuery);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         return () => {
//             dispatch(setSearchedQuery(""));
//         };
//     }, [dispatch]);

//     return (
//         <div>
//             <Navbar />

//             <div className="max-w-7xl mx-auto px-4 my-10">
//                 <h1 className="font-bold text-2xl mb-8">
//                     Search Results ({allJobs.length})
//                 </h1>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {allJobs.length > 0 ? (
//                         allJobs.map((job) => (
//                             <Job1 key={job._id} job={job} />
//                         ))
//                     ) : (
//                         <div className="col-span-full text-center text-gray-500 text-lg">
//                             No jobs found.
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Browse;
















// import React, { useEffect } from 'react'
// import Navbar from './Navbar'
// import Job1 from './Job1';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSearchedQuery } from '@/redux/jobSlice';


// // const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// const Browse = () => {
//     const { allJobs } = useSelector((store) => store.job);
//     const dispatch = useDispatch();
//     useEffect(() => {
//         return () => {
//             dispatch(setSearchedQuery(""));
//         };
//     }, []);

//     return (
//         <div>
//             <Navbar />
//             <div className='max-w-7xl mx-auto my-10'>
//                 <h1 className='font-bold text-xl my-10'>Search Results {allJobs.length}</h1>
//                 <div className='grid grid-cols-3 gap-4 '>
//                     {allJobs.map((job) => {
//                         return <Job1 key={job._id} job={job} />;
//                     })}
//                 </div>

//             </div>

//         </div>
//     )
// }

// export default Browse
