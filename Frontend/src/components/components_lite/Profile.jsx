
import React, { useState } from 'react'
import Navbar from './Navbar'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from '../ui/badge'
import AppliedJob from './AppliedJob'
import EditProfileModel from './EditProfileModel'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAllAppliedJobs'

const Profile = () => {

    useGetAppliedJobs();
    const [open, setOpen] = useState(false);

    // ✅ Correct Redux State
    const { user } = useSelector((state) => state.auth);

    return (

        <div className='bg-gray-50 min-h-screen'>

            <Navbar />

            {/* Profile Card */}
            <div
                className='max-w-4xl mx-auto bg-white border border-gray-200 
                rounded-2xl my-5 p-8 shadow-md
                hover:shadow-lg transition-all duration-300'
            >

                {/* Top Section */}
                <div className='flex justify-between items-start gap-5'>

                    <div className='flex items-center gap-5'>

                        <Avatar className='cursor-pointer h-24 w-24 border'>

                            <AvatarImage
                                src={
                                    user?.profile?.profilePhoto ||
                                    "https://github.com/shadcn.png"
                                }
                            />

                        </Avatar>

                        <div>

                            <h1 className='font-bold text-2xl'>
                                {user?.fullname || "Full Name"}
                            </h1>

                            <p className='text-gray-600 leading-relaxed mt-2 max-w-2xl'>
                                {user?.profile?.bio || "No bio added"}
                            </p>

                        </div>

                    </div>

                    <Button
                        className="rounded-full self-start"
                        variant='outline'
                        size='icon'
                        onClick={() => setOpen(true)}
                    >
                        <Pen className='w-4 h-4' />
                    </Button>

                </div>

                {/* Contact Info */}
                <div className='my-7 space-y-3'>

                    <div className='flex items-center gap-3 text-gray-700'>

                        <Mail className='w-5 h-5' />

                        <span>
                            {/* {user?.email || "example@gmail.com"} */}
                            <a href={`mailto:${user?.email || "example@gmail.com"}`}>
                             {user?.email || "example@gmail.com"}
                            </a>
                        </span>

                    </div>

                    <div className='flex items-center gap-3 text-gray-700'>

                        <Contact className='w-5 h-5' />

                        <span>
                            {/* {user?.phoneNumber || "+91 9876543210"} */}
                            <a href={`tel:${user?.phoneNumber || "+919876543210"}`}>
                              {user?.phoneNumber || "+91 9876543210"}
                            </a>
                        </span>

                    </div>

                </div>

                {/* Skills */}
                <div className='my-6'>

                    <h1 className='font-bold text-lg mb-3'>
                        Skills
                    </h1>

                    <div className='flex flex-wrap items-center gap-2'>

                        {
                            user?.profile?.skills?.length > 0 ? (

                                user.profile.skills.map((item, index) => (

                                    <Badge
                                        key={index}
                                        className='px-3 py-1 bg-purple-100 text-purple-700'
                                    >
                                        {item}
                                    </Badge>

                                ))

                            ) : (

                                <span className='text-gray-500'>
                                    No Skills Added
                                </span>

                            )
                        }

                    </div>

                </div>

                {/* Resume */}
                <div className='mt-6'>

                    <label className='text-lg font-bold'>
                        Resume
                    </label>

                    <div className='mt-2'>

                        {
                            user?.profile?.resume ? (

                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href={user?.profile?.resume}
                                    className='text-blue-600 hover:underline'
                                >

                                    {/* <span>Download Resume</span> */}
                                    {
                                        user?.profile?.resumeOriginalname || "Download Resume"

                                    }
                                </a>

                            ) : (

                                <span className='text-gray-500'>
                                    No Resume Found
                                </span>

                            )
                        }

                    </div>

                </div>

            </div>

            {/* Applied Jobs */}
            <div
                className='max-w-4xl mx-auto bg-white rounded-2xl 
                border border-gray-200 shadow-md p-6 mb-10'
            >

                <h1 className='text-2xl font-bold mb-5'>
                    Applied Jobs
                </h1>

                <AppliedJob />

            </div>

            {/* Edit Profile Modal */}
            <EditProfileModel
                open={open}
                setOpen={setOpen}
            />

        </div>
    )
}

export default Profile












// import React, { useState } from 'react'



// import Navbar from './Navbar'
// import { Avatar, AvatarImage } from '../ui/avatar'
// import { Button } from '../ui/button'
// import { Contact, Mail, Pen } from 'lucide-react'
// import { Badge } from '../ui/badge'
// import AppliedJob from './AppliedJob'
// import EditProfileModel from './EditProfileModel'
// import { useSelector } from 'react-redux'

// const skills = []
// //     "JavaScript",
// //     "React",
// //     "Node.js",
// //     "Express",
// //     "MongoDB"
// // ]

// const Profile = () => {
//     const [open, setOpen] = useState(false);
//     const user = useSelector((state) => state.user);

//     const isResume = true

//     return (
//         <div className='bg-gray-50 min-h-screen'>

//             <Navbar />

//             {/* Profile Card */}
//             <div
//                 className='max-w-4xl mx-auto bg-white border border-gray-200 
//                 rounded-2xl my-5 p-8 shadow-md
//                 hover:shadow-lg hover:-translate-y-1
//                 transition-all duration-300'
//             >

//                 {/* Top Section */}
//                 <div className='flex justify-between items-start gap-5'>

//                     <div className='flex items-center gap-5'>

//                         <Avatar className='cursor-pointer h-24 w-24 border'>

//                             <AvatarImage src="https://github.com/shadcn.png" />

//                         </Avatar>

//                         <div>

//                             <h1 className='font-bold text-2xl'>
//                                 {user?.fullname || "Full Name"}
//                             </h1>

//                             <p className='text-gray-600 leading-relaxed mt-2 max-w-2xl'>
//                                 {/* {user?.bio || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."} */}
//                                 {user?.profile?.bio || "..."}
//                             </p>

//                         </div>

//                     </div>

//                     <Button
//                         className="rounded-full self-start"
//                         variant='outline'
//                         size='icon'
//                         onClick={() => setOpen(true)}
//                     >
//                         <Pen className='w-4 h-4' />
//                     </Button>

//                 </div>

//                 {/* Contact Info */}
//                 <div className='my-7 space-y-3'>

//                     <div className='flex items-center gap-3 text-gray-700'>
//                         <Mail className='w-5 h-5' />
//                         <span>{user?.email || "Ashutosh@gmail.com"}</span>
                        
//                     </div>

//                     <div className='flex items-center gap-3 text-gray-700'>
//                         <Contact className='w-5 h-5' />
//                         <span>{user?.phoneNumber || "+91 9876543210"}</span>
                        
//                     </div>

//                 </div>

//                 {/* Skills */}
//                 <div className='my-6'>

//                     <h1 className='font-bold text-lg mb-3'>
//                         Skills
//                     </h1>

//                     <div className='flex flex-wrap items-center gap-2'>

//                         {
//                             user?.profile?.skills?.length !== 0 ? (

//                                 // skills.map((item, index) => (
//                                     user?.profile?.skills?.map((item, index) => (
//                                     <Badge
//                                         key={index}
//                                         className='px-3 py-1'
//                                     >
//                                         {item}
//                                     </Badge>
//                                 ))

//                             ) : (

//                                 <span>NA</span>

//                             )
//                         }

//                     </div>

//                 </div>

//                 {/* Resume */}
//                 <div className='mt-6'>

//                     <label className='text-lg font-bold'>
//                         Resume
//                     </label>

//                     <div className='mt-2'>

//                         {
//                             isResume ? (

//                                 <a
//                                     target="_blank"
//                                     href="https://resume.com"
//                                     className='text-blue-600 hover:underline'
//                                 >
//                                     Download Resume
//                                 </a>

//                             ) : (

//                                 <span>No Resume Found</span>

//                             )
//                         }

//                     </div>

//                 </div>

//             </div>

//             {/* Applied Jobs */}
//             <div
//                 className='max-w-4xl mx-auto bg-white rounded-2xl 
//                 border border-gray-200 shadow-md p-6 mb-10'
//             >

//                 <h1 className='text-2xl font-bold mb-5'>
//                     Applied Jobs
//                 </h1>

//                 <AppliedJob />

//             </div>
//             {/* edit profile model */}
//             <EditProfileModel open={open} setOpen={setOpen} />

//         </div>
//     )
// }

// export default Profile