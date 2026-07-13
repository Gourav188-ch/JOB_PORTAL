import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_ENDPOINT } from '@/utils/data';
import { setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const EditProfileModel = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((store) => store.auth);

    const [input, setInput] = useState({
        name: user?.fullname,
        email: user?.email,
        phone: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map((skills) => skills),
        file: user?.profile?.resume,
    });

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    // handleFileChange
    const handleFileChange = async (e) => {
        e.preventDefault();

        setLoading(true);

        const formData = new FormData();

        formData.append("fullname", input.name);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phone);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);

        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);

            const res = await axios.post(
                `${USER_API_ENDPOINT}/profile/update`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
            }

        } catch (error) {

            console.log(error);
            toast.error("Failed to update profile.");

        } finally {

            setLoading(false);

        }
    }


    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    // return (
    //     <div>
    //         <Dialog open={open} onOpenChange={setOpen}>
    //             <DialogContent className='sm:max-w-[500px]' onInteractOutside={() => setOpen(false)}>
    //                 <DialogHeader>
    //                     <DialogTitle>
    //                         Edit Profile
    //                     </DialogTitle>
    //                 </DialogHeader>
    //                 {/* Form for editing profile */}
    //                 <form onSubmit={handleFileChange}>
    //                     <div className='grid gap-4 py-4'>
    //                         <Label htmlFor="name" className="text-right">Name</Label>
    //                         <input
    //                             type='text'
    //                             id="name"
    //                             value={input.name}
    //                             name='name'
    //                             onChange={changeEventHandler}
    //                             className="w-full border border-gray-300 rounded-md p-2">
    //                         </input>
    //                     </div>
    //                     <div className='grid gap-4 py-4'>
    //                         <Label htmlFor="email" className="text-right">Email</Label>
    //                         <input
    //                             type='email'
    //                             id="email"
    //                             name='email'
    //                             value={input.email}
    //                             onChange={changeEventHandler}
    //                             className="w-full border border-gray-300 rounded-md p-2">
    //                         </input>
    //                     </div>
    //                     <div className='grid gap-4 py-4'>
    //                         <Label htmlFor="phone" className="text-right">Phone</Label>
    //                         <input
    //                             type='tel'
    //                             id="phone"
    //                             name='phone'
    //                             value={input.phone}
    //                             onChange={changeEventHandler}
    //                             className="w-full border border-gray-300 rounded-md p-2">
    //                         </input>
    //                     </div>
    //                     <div className='grid gap-4 py-4'>
    //                         <Label htmlFor="bio" className="text-right">Bio</Label>
    //                         <input
    //                             type='text'
    //                             id="bio"
    //                             name='bio'
    //                             value={input.bio}
    //                             onChange={changeEventHandler}
    //                             className="w-full border border-gray-300 rounded-md p-2">
    //                         </input>
    //                     </div>
    //                     <div className='grid gap-4 py-4'>
    //                         <Label htmlFor="skills" className="text-right">Skills</Label>
    //                         <input
    //                             type='text'
    //                             id="skills"
    //                             name='skills'
    //                             onChange={changeEventHandler}
    //                             value={input.skills}
    //                             className="w-full border border-gray-300 rounded-md p-2">
    //                         </input>
    //                     </div>
    //                     <div className='grid gap-4 py-4'>
    //                         <Label htmlFor="file" className="text-right">Resume</Label>
    //                         <input
    //                             type='file'
    //                             id="file"
    //                             name='file'
    //                             onChange={fileChangeHandler}
    //                             accept='application/pdf'
    //                             className="w-full border border-gray-300 rounded-md p-2">
    //                         </input>
    //                     </div>
    //                 </form>
    //                 <DialogFooter>
    //                     {
    //                         loading ? (
    //                             <div className='flex items-center justify-center my-10'>
    //                                 <div className='spinner-border text-blue-600' role='status'>
    //                                     <span className='sr-only'>Loading...</span>
    //                                 </div>
    //                             </div>
    //                         ) : (
    //                             <Button className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-800/90 rounded-md">
    //                                 Save
    //                             </Button>
    //                         )
    //                     }
    //                 </DialogFooter>
    //             </DialogContent>
    //         </Dialog>
    //     </div>
    // )
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>

                <DialogContent
                    className='sm:max-w-[500px] rounded-2xl p-6 max-h-[90vh] overflow-y-auto'
                    onInteractOutside={() => setOpen(false)}
                >

                    {/* Header */}
                    <DialogHeader>

                        <DialogTitle className='text-2xl font-bold text-gray-800'>
                            Edit Profile
                        </DialogTitle>

                        <p className='text-sm text-gray-500 mt-1'>
                            Update your profile information below.
                        </p>

                    </DialogHeader>

                    {/* Form */}
                    <form
                        onSubmit={handleFileChange}
                        className='space-y-5 mt-5'
                    >

                        {/* Name */}
                        <div className='space-y-2'>

                            <Label
                                htmlFor="name"
                                className="font-medium text-gray-700"
                            >
                                Name
                            </Label>

                            <input
                                type='text'
                                id="name"
                                value={input.name}
                                name='name'
                                onChange={changeEventHandler}
                                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#6B3AC2]/30"
                            />

                        </div>

                        {/* Email */}
                        <div className='space-y-2'>

                            <Label
                                htmlFor="email"
                                className="font-medium text-gray-700"
                            >
                                Email
                            </Label>

                            <input
                                type='email'
                                id="email"
                                name='email'
                                value={input.email}
                                onChange={changeEventHandler}
                                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#6B3AC2]/30"
                            />

                        </div>

                        {/* Phone */}
                        <div className='space-y-2'>

                            <Label
                                htmlFor="phone"
                                className="font-medium text-gray-700"
                            >
                                Phone
                            </Label>

                            <input
                                type='tel'
                                id="phone"
                                name='phone'
                                value={input.phone}
                                onChange={changeEventHandler}
                                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#6B3AC2]/30"
                            />

                        </div>

                        {/* Bio */}
                        <div className='space-y-2'>

                            <Label
                                htmlFor="bio"
                                className="font-medium text-gray-700"
                            >
                                Bio
                            </Label>

                            <textarea
                                id="bio"
                                name='bio'
                                value={input.bio}
                                onChange={changeEventHandler}
                                rows={4}
                                className="w-full border border-gray-300 rounded-lg p-3 outline-none resize-none focus:ring-2 focus:ring-[#6B3AC2]/30"
                            />

                        </div>

                        {/* Skills */}
                        <div className='space-y-2'>

                            <Label
                                htmlFor="skills"
                                className="font-medium text-gray-700"
                            >
                                Skills
                            </Label>

                            <input
                                type='text'
                                id="skills"
                                name='skills'
                                onChange={changeEventHandler}
                                value={input.skills}
                                placeholder='React, Node, MongoDB'
                                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#6B3AC2]/30"
                            />

                        </div>

                        {/* Resume */}
                        <div className='space-y-2'>

                            <Label
                                htmlFor="file"
                                className="font-medium text-gray-700"
                            >
                                Resume
                            </Label>

                            <input
                                type='file'
                                id="file"
                                name='file'
                                onChange={fileChangeHandler}
                                accept='application/pdf'
                                className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[#6B3AC2] file:text-white file:rounded-md hover:file:bg-[#552d9b]"
                            />

                        </div>

                        {/* Footer */}
                        <DialogFooter className='mt-6'>

                            {
                                loading ? (

                                    <Button
                                        disabled
                                        className="w-full bg-gray-500"
                                    >
                                        <Loader2 className='mr-2 h-4 animate-spin' />Please wait...{""}
                                    </Button>

                                ) : (

                                    <Button
                                        type="submit"
                                        className="w-full bg-[#6B3AC2] hover:bg-[#552d9b] text-white rounded-lg py-3"
                                    >
                                        Save Changes
                                    </Button>

                                )
                            }

                        </DialogFooter>

                    </form>

                </DialogContent>

            </Dialog>
        </div>
    )
}

export default EditProfileModel
