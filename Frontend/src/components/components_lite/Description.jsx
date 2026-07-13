import React, { useEffect, useState } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from '@/utils/data'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleJob } from '@/redux/jobSlice'
import { toast } from 'sonner'


// const applyJobHandler = async () => {
//     try {
//         const res = await axios.get(
//             `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
//             { withCredentials: true }
//         );

//         if (res.data.success) {
//             console.log("Application Response:", res.data);
//             toast.success(res.data.message);
//         }
//     } catch (error) {
//         console.log(error);
//         toast.error(error.response.data.message);
//     }
// }


const Description = () => {

    const params = useParams();
    const jobId = params.id;

    const dispatch = useDispatch();

    const { singleJob } = useSelector((store) => store.job);
    // console.log(singleJob);

    const { user } = useSelector((store) => store.auth);


    useEffect(() => {

        const fetchSingleJob = async () => {

            try {

                const res = await axios.get(
                    `${JOB_API_ENDPOINT}/get/${jobId}`,
                    { withCredentials: true }
                );

                // console.log("Single Job Response:", res.data);

                if (res.data.success) {

                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(app => app.applicant === user?._id));
                }

            } catch (error) {

                console.log(error);
            }
        };

        fetchSingleJob();

    }, [jobId, dispatch, user?._id]);

    // const isApplied = singleJob?.application?.some(application => application.applicant === user?._id) || false;

    // const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const isIntiallyApplied = singleJob?.applications?.some(
        (application) =>
            application?.applicant === user?._id
    ) || false;

    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    
    const applyJobHandler = async () => {

        try {

            const res = await axios.get(
                `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
                { withCredentials: true }
            );

            if (res.data.success) {
                setIsApplied(true);
                const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updateSingleJob));
                console.log("Application Response:", res.data);

                toast.success(res.data.message);
            }

        }
        // catch (error) {
        //     console.log(error);
        //     toast.error(
        //         error?.response?.data?.message || "Something went wrong"
        //     );
        // }
        catch (error) {

            console.log(error.response.data);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }

    return (

        <div className='max-w-7xl mx-auto my-10 px-4'>

            <div className='border border-gray-200 rounded-2xl p-6 shadow-md bg-white'>

                {/* Top Section */}
                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-5'>

                    <div>

                        <h1 className='font-bold text-3xl text-gray-900'>
                            {singleJob?.title || "Software Engineer"}
                        </h1>

                        {/* Badges */}
                        <div className='flex flex-wrap gap-2 items-center mt-5'>

                            <Badge
                                variant='ghost'
                                className='text-blue-600 font-semibold bg-blue-50'
                            >
                                {singleJob?.position || 0} Positions
                            </Badge>

                            <Badge
                                variant='ghost'
                                className='text-orange-600 font-semibold bg-orange-50'
                            >
                                {singleJob?.salary || 0} LPA
                            </Badge>

                            <Badge
                                variant='ghost'
                                className='text-purple-600 font-semibold bg-purple-50 capitalize'
                            >
                                {singleJob?.location || "Remote"}
                            </Badge>

                            <Badge
                                variant='ghost'
                                className='text-green-700 font-semibold bg-green-50'
                            >
                                {singleJob?.jobType || "Full Time"}
                            </Badge>

                        </div>

                    </div>

                    {/* Apply Button */}
                    <div>

                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`rounded-lg px-6 py-2 text-white transition-all duration-300
                            ${isApplied
                                    ? "bg-gray-600 hover:bg-gray-600 cursor-not-allowed"
                                    : "bg-[#6B3AC2] hover:bg-[#552d9b]"
                                }`}
                        >

                            {isApplied ? 'Already Applied' : 'Apply Now'}

                        </Button>

                    </div>

                </div>

                {/* Job Description Section */}
                <div className='my-8'>

                    <h1 className='border-b border-gray-300 pb-4 text-lg font-semibold text-gray-800'>
                        Job Description
                    </h1>

                    <p className='text-gray-600 mt-4 leading-relaxed'>
                        {singleJob?.description || "No description available"}
                    </p>

                </div>

                {/* Job Details */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-6'>

                    <div>
                        <h1 className='font-bold text-gray-800'>
                            Role :
                            <span className='pl-3 font-normal text-gray-600'>
                                {singleJob?.title || "Software Engineer"}
                            </span>
                        </h1>
                    </div>

                    <div>
                        <h1 className='font-bold text-gray-800'>
                            Location :
                            <span className='pl-3 font-normal text-gray-600 capitalize'>
                                {singleJob?.location || "Remote"}
                            </span>
                        </h1>
                    </div>

                    <div>
                        <h1 className='font-bold text-gray-800'>
                            Salary :
                            <span className='pl-3 font-normal text-gray-600'>
                                {singleJob?.salary || 0} LPA
                            </span>
                        </h1>
                    </div>

                    <div>
                        <h1 className='font-bold text-gray-800'>
                            Experience :
                            <span className='pl-3 font-normal text-gray-600'>
                                {singleJob?.experience || 0} Years
                            </span>
                        </h1>
                    </div>

                    <div>
                        <h1 className='font-bold text-gray-800'>
                            Job Type :
                            <span className='pl-3 font-normal text-gray-600'>
                                {singleJob?.jobType || "Full Time"}
                            </span>
                        </h1>
                    </div>

                    <div>
                        <h1 className='font-bold text-gray-800'>
                            Total Applicants :
                            <span className='pl-3 font-normal text-gray-600'>
                                {singleJob?.applications?.length || 0}
                            </span>
                        </h1>
                    </div>
                    <div>
                        <h1 className='font-bold text-gray-800'>
                            Post Date :
                            <span className='pl-3 font-normal text-gray-600'>
                                {/* {singleJob?.created_at ? new Date(singleJob.created_at).toLocaleDateString() : "N/A"} */}
                                {singleJob?.createdAt

                                    ? new Date(singleJob.createdAt).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })
                                    : "N/A"}
                            </span>
                        </h1>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Description


// import React, { useEffect } from 'react'
// import { Badge } from '../ui/badge'
// import { Button } from '../ui/button'
// import { useParams } from 'react-router-dom';
// // import useGetSingleJob from '@/hooks/useGetSingleJob';
// import axios from 'axios';
// import { JOB_API_ENDPOINT } from '@/utils/data';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSingleJob } from '@/redux/jobSlice';

// const Description = () => {
//     const params = useParams();
//     const jobId = params.id;
//     console.log("Job ID in Description :", jobId);
//     const { singleJob } = useSelector((store) => store.job);
//     // useGetSingleJob(jobId);
//     const dispatch = useDispatch();

//     const { user } = useSelector((store) => store.auth);


//     useEffect(() => {

//         const fetchSingleJob = async () => {

//             try {

//                 const res = await axios.get(
//                     `${JOB_API_ENDPOINT}/get/${jobId}`,
//                     { withCredentials: true }
//                 );

//                 console.log("API Response", res.data);

//                 if (res.data.success) {

//                     console.log("Dispatching Jobs:", res.data.jobs);

//                     dispatch(setSingleJob(res.data.jobs));
//                 }

//             } catch (error) {

//                 console.log(error);
//             }
//         };

//         fetchSingleJob();

//     }, [jobId, dispatch, user?._id]);
//     // };


//     const isApplied = true;
//     return (
//         <div>
//             <div className='max-w-7xl mx-auto my-10 px-4'>

//                 <div className='border border-gray-200 rounded-2xl p-6 shadow-sm'>

//                     <div className='flex items-center justify-between'>

//                         <div>

//                             <h1 className='font-bold text-2xl'>
//                                 {singleJob.title || "Software Engineer"}
//                             </h1>

//                             <div className='flex flex-wrap gap-2 items-center mt-5'>

//                                 <Badge
//                                     variant='ghost'
//                                     className='text-blue-600 font-semibold bg-blue-50'
//                                 >
//                                     {singleJob.position || "Software Engineer"}
//                                 </Badge>

//                                 <Badge
//                                     variant='ghost'
//                                     className='text-orange-600 font-semibold bg-orange-50'
//                                 >
//                                     {singleJob.salary || "$50,000-$80,000"}
//                                 </Badge>

//                                 <Badge
//                                     variant='ghost'
//                                     className='text-purple-600 font-semibold bg-purple-50'
//                                 >
//                                     {singleJob.location || "Remote"}
//                                 </Badge>

//                                 <Badge
//                                     variant='ghost'
//                                     className='text-black font-semibold bg-gray-100'
//                                 >
//                                     {singleJob.jobType || "Full Time"}
//                                 </Badge>

//                             </div>

//                         </div>

//                         <div>

//                             <Button
//                                 disabled={isApplied}
//                                 className={`rounded-lg ${isApplied
//                                     ? "bg-gray-600 hover:bg-gray-600 cursor-not-allowed"
//                                     : "bg-[#6B3AC2] hover:bg-[#552d9b]"
//                                     }`}
//                             >
//                                 {isApplied ? 'Already Applied' : 'Apply Now'}
//                             </Button>

//                         </div>

//                     </div>
//                     <div className='my-4'>
//                         <h1 className='border-b-2 border-b-gray-400 font-medium py-4'>{singleJob.description || "Job Description"}</h1>
//                         {/* <h1 className='font-bold my-1'>Role : <span className='pl-4 font-normal text-gray-800'>Software Engineer</span></h1> */}
//                         <div>
//                             <h1 className='font-bold my-1'>Role : <span className='pl-4 font-normal text-gray-800'>{singleJob.title || "Software Engineer"}</span></h1>
//                         </div>
//                         <div>
//                             <h1 className='font-bold my-1'>Location :<span className='pl-4 font-normal text-gray-800'>{singleJob.location || "Remote"}</span></h1>
//                         </div>
//                         <div>
//                             <h1 className='font-bold my-1'>Salary :<span className='pl-4 font-normal text-gray-800'>{singleJob.salary || "$50,000-$80,000"}</span></h1>
//                         </div>
//                         <div>
//                             <h1 className='font-bold my-1'>Experience :<span className='pl-4 font-normal text-gray-800'>{singleJob.experience || "3 Years"}</span></h1>
//                         </div>
//                         <div>
//                             <h1 className='font-bold my-1'>Job Type :<span className='pl-4 font-normal text-gray-800'>{singleJob.jobType || "Full Time"}</span></h1>
//                         </div>
//                         <div>
//                             <h1 className='font-bold my-1'>Total Applicants :<span className='pl-4 font-normal text-gray-800'>{singleJob.applicants || 10}</span></h1>
//                         </div>
//                     </div>
//                 </div>


//             </div>
//         </div>
//     )
// }

// export default Description
