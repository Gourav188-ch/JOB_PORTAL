import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import FilterCard from "./Filtercard";
import Job1 from "./Job1";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector(
    (store) => store.job
  );

  const [filterJobs, setFilterJobs] = useState([]);

  useEffect(() => {
    if (!searchedQuery || searchedQuery.trim() === "") {
      setFilterJobs(allJobs);
      return;
    }

    const query = searchedQuery.toLowerCase();

    const filteredJobs = allJobs.filter((job) => {
      return (
        job?.title?.toLowerCase().includes(query) ||
        job?.description?.toLowerCase().includes(query) ||
        job?.location?.toLowerCase().includes(query) ||
        String(job?.experience || "").includes(query) ||
        String(job?.salary || "").includes(query)
      );
    });

    setFilterJobs(filteredJobs);
  }, [allJobs, searchedQuery]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Filter Sidebar */}
          <div className="w-full lg:w-1/4">
            <FilterCard />
          </div>

          {/* Jobs Section */}
          <div className="flex-1">

            {/* Heading */}
            <div className="mb-5">
              <h1 className="text-2xl font-bold text-gray-800">
                Available Jobs
              </h1>

              <p className="text-gray-500 mt-1">
                {searchedQuery
                  ? `Results for "${searchedQuery}" (${filterJobs.length})`
                  : `${filterJobs.length} Jobs Found`}
              </p>
            </div>

            {/* No Jobs Found */}
            {filterJobs.length === 0 ? (
              <div className="flex justify-center items-center h-[50vh] bg-white rounded-xl shadow-sm border">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-gray-500">
                    No Jobs Found 😔
                  </h1>

                  <p className="text-gray-400 mt-2">
                    Try searching with another keyword.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                {filterJobs.map((job) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Job1 job={job} />
                  </motion.div>
                ))}

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
























// import React from 'react'

// import Navbar from './Navbar'
// import Filtercard from './Filtercard'
// import Job1 from './Job1'
// import { useSelector } from 'react-redux'

// // const jobArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]

// const Jobs = () => {
//   const { allJobs = [] } = useSelector((store) => store.job || {}); // Assuming you have a custom hook to fetch all jobs
//   return (
//     <div>

//       <Navbar />

//       <div className='max-w-7xl mx-auto mt-5 px-4'>

//         <div className='flex gap-5'>

//           {/* Filter Sidebar */}
//           <div className='w-1/4 sticky top-5 h-fit'>
//             <Filtercard />
//           </div>

//           {/* Job Cards */}
//           {
//             allJobs.length <= 0 ? (

//               <span>No jobs found</span>

//             ) : (

//               <div className='flex-1 h-screen overflow-y-auto pb-5'>

//                 <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

//                   {/* {
//                     allJobs.map((job, index) => (
//                       <Job1 key={index} />
//                     ))
//                   } */}
//                   {
//                     allJobs.map((job) => (
//                       <Job1 key={job._id} job={job} />
//                     ))
//                   }

//                 </div>

//               </div>

//             )
//           }

//         </div>

//       </div>

//     </div>
//   )
// }

// export default Jobs