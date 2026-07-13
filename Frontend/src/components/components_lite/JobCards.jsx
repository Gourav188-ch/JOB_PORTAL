import { useNavigate } from 'react-router-dom'
import { Badge } from '../ui/badge'
import React from 'react'

const JobCards = ({ job }) => {

    const navigate = useNavigate();

    return (
        <div
            onClick={()=>navigate(`/description/${job._id}`)}
            className='w-full p-5 rounded-2xl shadow-md bg-white 
            border border-gray-200 cursor-pointer
            hover:shadow-2xl hover:shadow-blue-100
            hover:-translate-y-1 transition-all duration-300'
        >

            {/* Company Info */}
            <div className='mb-4'>

                <h1 className='text-xl font-semibold text-gray-900'>
                    {job?.company?.name || "Unknown Company"}
                </h1>

                <p className='text-sm text-gray-500 mt-1'>
                    {job?.location || "India"}
                </p>

            </div>

            {/* Job Info */}
            <div>

                <h2 className='font-bold text-2xl text-gray-900 mb-2'>
                    {job?.title || "Job Title"}
                </h2>

                <p className='text-sm text-gray-600 leading-relaxed line-clamp-3'>
                    {job?.description || "Job Description"}
                </p>

            </div>

            {/* Badges */}
            <div className='flex flex-wrap gap-2 items-center mt-5'>

                <Badge
                    variant='ghost'
                    className='text-blue-600 font-semibold bg-blue-50 hover:bg-blue-100'
                >
                    {job?.position || 0} Positions
                </Badge>

                <Badge
                    variant='ghost'
                    className='text-orange-600 font-semibold bg-orange-50 hover:bg-orange-100'
                >
                    {job?.salary || 0} LPA
                </Badge>

                <Badge
                    variant='ghost'
                    className='text-purple-600 font-semibold bg-purple-50 hover:bg-purple-100'
                >
                    {job?.jobType || "Full Time"}
                </Badge>

                <Badge
                    variant='ghost'
                    className='text-green-700 font-semibold bg-green-50 hover:bg-green-100'
                >
                    {job?.experience || 0} Year Exp
                </Badge>

            </div>

        </div>
    )
}

export default JobCards



// import { Badge } from '../ui/badge'
// import React from 'react'

// const JobCards = ({ job }) => {
//     console.log(job);
//     return (
//         <div className='p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer
//         hover:shadow-2xl hover:shadow-blue-200 hover:p-3'>
//             <div>
//                 <h1 className='text-lg font-medium'>{job?.company?.name || "Unknown Company"}</h1>
//                 <p className='text-sm text-gray-600'>India</p>
//             </div>
//             <div>
//                 <h2 className='font-bold text-lg my-2'>{job?.title || "Job Title"}</h2>
//                 <p className='text-sm text-gray-600'>
//                     {job?.description || "Job Description"}
//                 </p>
//             </div>
//             <div className='flex flex-wrap gap-2 items-center mt-5'>

//                 <Badge
//                     variant='ghost'
//                     className='text-blue-600 font-semibold bg-blue-50'
//                 >
//                     10 Positions
//                 </Badge>

//                 <Badge
//                     variant='ghost'
//                     className='text-orange-600 font-semibold bg-orange-50'
//                 >
//                     {job?.salary} LPA
//                 </Badge>

//                 <Badge
//                     variant='ghost'
//                     className='text-purple-600 font-semibold bg-purple-50'
//                 >
//                     {job?.jobType || "Job Type"}
//                 </Badge>

//                 <Badge
//                     variant='ghost'
//                     className='text-black font-semibold bg-gray-100'
//                 >
//                     Full Time
//                 </Badge>

//             </div>
//         </div>
//     )
// }

// export default JobCards
