import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { useNavigate } from 'react-router-dom'

const Job1 = ({ job }) => {

    const navigate = useNavigate();

    // Calculate Days Ago
    const daysAgo = (mongodbTime) => {

        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();

        const currDiff = currentTime.getTime() - createdAt.getTime();

        const timeDiff = Math.floor(
            currDiff / (1000 * 60 * 60 * 24)
        );

        return timeDiff;
    };

    // Safe Job Age
    const jobAge = job?.createdAt
        ? daysAgo(job.createdAt)
        : 0;

    // Bookmark State
    const [saved, setSaved] = useState(false);

    // Apply Handler
    const applyJobHandler = () => {
        navigate(`/description/${job?._id}`);
    };

    return (

        <div
            onClick={() => navigate(`/description/${job?._id}`)}
            className='p-5 rounded-2xl shadow-md bg-white border border-gray-200 
            cursor-pointer hover:shadow-2xl hover:shadow-blue-200 
            hover:-translate-y-1 transition-all duration-300'
        >

            {/* Top Section */}
            <div className='flex items-center justify-between'>

                {/* Posted Time */}
                <p className='text-sm text-gray-500'>

                    {
                        jobAge === 0
                            ? "Today"
                            : jobAge === 1
                                ? "1 day ago"
                                : `${jobAge} days ago`
                    }

                </p>

                {/* Bookmark Button */}
                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        setSaved(!saved);
                    }}
                    variant='outline'
                    className={`rounded-full transition-all duration-300
                    ${saved
                            ? "bg-yellow-100 border-yellow-400"
                            : "bg-white"
                        }`}
                    size='icon'
                >

                    {
                        saved ? (

                            <BookmarkCheck
                                className='w-4 h-4 text-yellow-600 fill-yellow-400'
                            />

                        ) : (

                            <Bookmark className='w-4 h-4' />

                        )
                    }

                </Button>

            </div>

            {/* Company Info */}
            <div className='flex items-center gap-3 my-5'>

                <Avatar className="w-12 h-12 border">

                    <AvatarImage
                        src={
                            job?.company?.logo ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaKNdSgDfYAsZ59polGMwHVb0KODXLTJ36vw&s"
                        }
                    />

                </Avatar>

                <div>

                    <h1 className='text-lg font-semibold text-gray-900'>
                        {job?.company?.name || "Unknown Company"}
                    </h1>

                    <p className='text-sm text-gray-500 capitalize'>
                        {job?.location || "India"}
                    </p>

                </div>

            </div>

            {/* Job Info */}
            <div>

                <h2 className='font-bold text-xl mb-2 text-gray-900'>
                    {job?.title || "Job Title"}
                </h2>

                <p className='text-sm text-gray-600 leading-relaxed line-clamp-3'>
                    {job?.description || "Job Description"}
                </p>

            </div>

            {/* Badges */}
            <div className='flex flex-wrap gap-2 items-center mt-5'>

                {/* Position */}
                <Badge
                    variant='ghost'
                    className='text-blue-600 font-semibold bg-blue-50 hover:bg-blue-100'
                >
                    {job?.position || 0} Positions
                </Badge>

                {/* Salary */}
                <Badge
                    variant='ghost'
                    className='text-orange-600 font-semibold bg-orange-50 hover:bg-orange-100'
                >
                    {job?.salary || 0} LPA
                </Badge>

                {/* Location */}
                <Badge
                    variant='ghost'
                    className='text-purple-600 font-semibold bg-purple-50 hover:bg-purple-100 capitalize'
                >
                    {job?.location || "Remote"}
                </Badge>

                {/* Experience */}
                <Badge
                    variant='ghost'
                    className='text-green-700 font-semibold bg-green-50 hover:bg-green-100'
                >
                    {job?.experience || 0} Year Exp
                </Badge>

            </div>

            {/* Buttons */}
            <div className='flex items-center gap-3 mt-6'>

                {/* Details */}
                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/description/${job?._id}`);
                    }}
                    variant='outline'
                    size='sm'
                    className="text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-200"
                >
                    Details
                </Button>

                {/* Apply */}
                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        applyJobHandler();
                    }}
                    size='sm'
                    className="bg-[#6A38C2] hover:bg-[#552d9b] text-white"
                >
                    Apply Now
                </Button>

            </div>

        </div>
    )
}

export default Job1



// import React, { useState } from 'react'
// import { Button } from '../ui/button'
// import { Badge } from '../ui/badge'
// import { Bookmark, BookmarkCheck } from 'lucide-react'
// import { Avatar, AvatarImage } from '../ui/avatar'
// import { useNavigate } from 'react-router-dom'

// const Job1 = ({ job }) => {

//     const navigate = useNavigate();

//     const daysAgo = (mongodbTime) => {
//         const createdAt = new Date(mongodbTime);
//         const currentTime = new Date();
//         const currDiff = currentTime.getTime() - createdAt.getTime();
//         const timeDiff = Math.floor(currDiff / (1000 * 3600 * 24));
//         return timeDiff;
//     }

//     // Bookmark State
//     const [saved, setSaved] = useState(false);

//     return (

//         <div
//             className='p-5 rounded-2xl shadow-md bg-white border border-gray-200
//             cursor-pointer hover:shadow-2xl hover:shadow-blue-200
//             hover:-translate-y-1 transition-all duration-300'
//         >

//             {/* Top Section */}
//             <div className='flex items-center justify-between'>

//                 <p className='text-sm text-gray-500'>
//                     {
//                         daysAgo(job?.createdAt) === 0
//                             ? "Today"
//                             : daysAgo(job?.createdAt) === 1
//                                 ? "1 day ago"
//                                 : `${daysAgo(job?.createdAt)} days ago`
//                     }
//                 </p>

//                 {/* Bookmark Button */}
//                 <Button
//                     onClick={() => setSaved(!saved)}
//                     variant='outline'
//                     className={`rounded-full transition-all duration-300
//                     ${saved
//                             ? "bg-yellow-100 border-yellow-400"
//                             : "bg-white"
//                         }`}
//                     size='icon'
//                 >

//                     {
//                         saved ? (
//                             <BookmarkCheck
//                                 className='w-4 h-4 text-yellow-600 fill-yellow-400'
//                             />
//                         ) : (
//                             <Bookmark className='w-4 h-4' />
//                         )
//                     }

//                 </Button>

//             </div>

//             {/* Company Info */}
//             <div className='flex items-center gap-3 my-5'>

//                 <Avatar className="w-12 h-12 border">

//                     <AvatarImage
//                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaKNdSgDfYAsZ59polGMwHVb0KODXLTJ36vw&s"
//                     />

//                 </Avatar>

//                 <div>

//                     <h1 className='text-lg font-semibold text-gray-900'>
//                         {job?.company?.name || "Unknown Company"}
//                     </h1>

//                     <p className='text-sm text-gray-500 capitalize'>
//                         {job?.location || "India"}
//                     </p>

//                 </div>

//             </div>

//             {/* Job Info */}
//             <div>

//                 <h2 className='font-bold text-xl mb-2 text-gray-900'>
//                     {job?.title || "Job Title"}
//                 </h2>

//                 <p className='text-sm text-gray-600 leading-relaxed line-clamp-3'>
//                     {job?.description || "Job Description"}
//                 </p>

//             </div>

//             {/* Badges */}
//             <div className='flex flex-wrap gap-2 items-center mt-5'>

//                 <Badge
//                     variant='ghost'
//                     className='text-blue-600 font-semibold bg-blue-50 hover:bg-blue-100'
//                 >
//                     {job?.position || 0} Positions
//                 </Badge>

//                 <Badge
//                     variant='ghost'
//                     className='text-orange-600 font-semibold bg-orange-50 hover:bg-orange-100'
//                 >
//                     {job?.salary || 0} LPA
//                 </Badge>

//                 <Badge
//                     variant='ghost'
//                     className='text-purple-600 font-semibold bg-purple-50 hover:bg-purple-100 capitalize'
//                 >
//                     {job?.location || "Remote"}
//                 </Badge>

//                 <Badge
//                     variant='ghost'
//                     className='text-green-700 font-semibold bg-green-50 hover:bg-green-100'
//                 >
//                     {job?.experience || 0} Year Exp
//                 </Badge>

//             </div>

//             {/* Buttons */}
//             <div className='flex items-center gap-3 mt-6'>

//                 <Button
//                     onClick={() => navigate(`/description/${job?._id}`)}
//                     variant='outline'
//                     size='sm'
//                     className="text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-200"
//                 >
//                     Details
//                 </Button>

//                 <Button
//                     size='sm'
//                     className="bg-[#6A38C2] hover:bg-[#552d9b] text-white"
//                 >
//                     Apply Now
//                 </Button>

//             </div>

//         </div>
//     )
// }

// export default Job1










// import React from 'react'
// import { Button } from '../ui/button'
// import { Badge } from '../ui/badge'
// import { Bookmark } from 'lucide-react'
// import { Avatar, AvatarImage } from '../ui/avatar'
// import { useNavigate } from 'react-router-dom'

// const Job1 = ({ job }) => {
//     const navigate = useNavigate();

//     // const jobId = "jdfj";
//     return (
//         <div
//             className='p-5 rounded-2xl shadow-md bg-white border border-gray-200
//             cursor-pointer hover:shadow-2xl hover:shadow-blue-200
//             transition-all duration-300'
//         >

//             {/* Top Section */}
//             <div className='flex items-center justify-between'>

//                 <p className='text-sm text-gray-500'>
//                     3 days ago
//                 </p>

//                 <Button
//                     variant='outline'
//                     className="rounded-full"
//                     size='icon'
//                 >
//                     <Bookmark className='w-4 h-4 ' />
//                 </Button>

//             </div>

//             {/* Company Info */}
//             <div className='flex items-center gap-3 my-5'>

//                 <Avatar className="w-12 h-12 border">
//                     <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaKNdSgDfYAsZ59polGMwHVb0KODXLTJ36vw&s" />
//                 </Avatar>

//                 <div>
//                     <h1 className='text-lg font-semibold'>
//                         {job?.company?.name || "Unknown Company"}
//                     </h1>

//                     <p className='text-sm text-gray-500'>
//                         {job?.location || "India"}
//                     </p>
//                 </div>

//             </div>

//             {/* Job Info */}
//             <div>

//                 <h2 className='font-bold text-xl mb-2'>
//                     {job?.title || "Job Title"}
//                 </h2>

//                 <p className='text-sm text-gray-600 leading-relaxed'>
//                    {job?.description || "Job Description"}
//                 </p>

//             </div>

//             {/* Badges */}
//             <div className='flex flex-wrap gap-2 items-center mt-5'>

//                 <Badge
//                     variant='ghost'
//                     className='text-blue-600 font-semibold bg-blue-50'
//                 >
//                     {job?.position || 0} Positions
//                 </Badge>

//                 <Badge
//                     variant='ghost'
//                     className='text-orange-600 font-semibold bg-orange-50'
//                 >
//                    {job?.salary || 0} LPA
//                 </Badge>

//                 <Badge
//                     variant='ghost'
//                     className='text-purple-600 font-semibold bg-purple-50'
//                 >
//                     Remote
//                 </Badge>

//                 <Badge
//                     variant='ghost'
//                     className='text-black font-semibold bg-gray-100'
//                 >
//                    {job?.jobType || "Full Time"}
//                 </Badge>

//             </div>

//             <div className='flex items-center gap-2 mt-5'>

//                 <Button
//                     onClick={() => {
//                         navigate(`/description/${job._id}`);
//                     }}
//                     variant='outline'
//                     size='sm'
//                     className="text-blue-600 bg-blue-50 hover:bg-blue-100 text-xs px-3"
//                 >
//                     Details
//                 </Button>

//                 <Button
//                     variant='outline'
//                     size='sm'
//                     className="text-orange-600 bg-orange-50 hover:bg-orange-100 text-xs px-3"
//                 >
//                     Save For Later
//                 </Button>

//             </div>
//         </div>
//     )
// }

// export default Job1