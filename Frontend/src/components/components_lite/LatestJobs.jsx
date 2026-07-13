import React from 'react';
import JobCards from './JobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {

    const allJobs = useSelector(
        (store) => store.job?.allJobs || []
    );

    console.log("Redux Jobs:", allJobs);

    // const navigate = useNavigate();

    return (
        <div className='max-w-7xl mx-auto my-20'>

            <h2 className='text-4xl font-bold'>
                <span className='text-[#6A38C2]'>
                    Latest & Top
                </span>{" "}
                Job Openings
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>

                {allJobs.length === 0 ? (

                    <span>No Job Available</span>

                ) : (

                    allJobs
                        .slice(0, 6)
                        .map((job) => (

                            <JobCards
                                // onClick={()=>navigate}
                                key={job._id}
                                job={job}
                            />

                        ))
                )}

            </div>

        </div>
    );
};

export default LatestJobs;


// import React from 'react'
// import JobCards from './JobCards';
// import { useSelector } from 'react-redux';

// //const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// const LatestJobs = () => {
//     // const { allJobs } = useSelector((state) => state.jobs?.allJobs || []);
//     // const { allJobs = [] } = useSelector(store => store.job || {});
//     // const allJobs = useSelector((store) => store.job.allJobs);
//     //  console.log(allJobs);
//     const allJobs = useSelector((store) => store.job.allJobs);

//     console.log("Redux Jobs:", allJobs);
//     return (
//         <div className='max-w-7xl mx-auto my-20'>
//             <h2 className='text-4xl font-bold'>
//                 <span className='text-[#6A38C2]'>Latest & Top </span>
//                 Job Openings
//             </h2>
//             {/* job Cards */}
//             <div className='grid grid-cols-3 gap-4 my-5'>
//                 {allJobs.length === 0 ? (
//                     <span>No Job Available</span>
//                 ) : (
//                     allJobs
//                         .slice(0, 6)
//                         .map((job) =>
//                             job?._id ? (
//                                 <JobCards key={job._id} job={job}></JobCards>
//                             ) : (
//                                 <span key={Math.random()}>Invalid Job Data</span>
//                             )
//                         )
//                 )}
//             </div>
//         </div>
//     )
// }

// export default LatestJobs;
