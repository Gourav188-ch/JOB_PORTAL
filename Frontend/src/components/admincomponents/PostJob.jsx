import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
// import store from "@/redux/store";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import usegetAllCompanies from "@/hooks/usegetAllCompanies";

const companyArray = [];

const PostJob = () => {
    usegetAllCompanies();
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: "",
    });
    const navigate = useNavigate();
    const { companies } = useSelector((store) => store.company);
    console.log("Companies:", companies);
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };
    const [loading, setLoading] = useState(false);

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find(
            (company) => company.name.toLowerCase() === value
        );
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            } else {
                toast.error(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message || "Something went wrong");
            } else {
                toast.error("An unexpected error occurred");
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center w-screen my-5">
                <form
                    onSubmit={submitHandler}
                    className="p-8 max-w-4xl border border-gray-500 shadow-sm hover:shadow-xl hover:shadow-red-300 rounded-lg"
                >
                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                placeholder="Enter job title"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className="col-span-2">
                            <Label>Description</Label>
                            <Input
                                name="description"
                                value={input.description}
                                placeholder="Enter job description"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400 "
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                placeholder="Enter job location"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="number"
                                name="salary"
                                value={input.salary}
                                placeholder="Enter job salary"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Position</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                placeholder="Enter job position"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                placeholder="React, Node.js, MongoDB"
                                className="mt-1"
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Experience</Label>
                            <Input
                                type="number"
                                name="experience"
                                value={input.experience}
                                placeholder="Enter job experience"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                placeholder="Enter job type"
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div className="mt-4 col-span-2">
                            <Label>Select Company</Label>

                            <Select onValueChange={selectChangeHandler}>
                                <SelectTrigger className="w-full mt-2">
                                    <SelectValue placeholder="Select a Company" />
                                </SelectTrigger>

                                <SelectContent
                                    position="popper"
                                    className="z-[9999]"
                                >
                                    <SelectGroup>
                                        {companies.map((company) => (
                                            <SelectItem
                                                key={company._id}
                                                value={company.name.toLowerCase()}
                                            >
                                                {company.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex justify-center mt-10">
                        {loading ? (
                            <Button
                                className="w-64 px-4 py-2 text-sm text-white bg-black rounded-md"
                                disabled
                            >
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </Button>
                        ) : (
                            <div className="flex justify-end mt-5">
                                <Button
                                    type="submit"
                                    className="w-44 bg-[#6B3AC2] hover:bg-[#5a2fb0]"
                                >
                                    Post Job
                                </Button>
                            </div>
                        )}
                    </div>
                    {companies.length === 0 && (
                        <p className="text-sm font-bold my-3 text-center text-red-600">
                            *Please register a company to post jobs.*
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default PostJob;





// import React, { useState } from "react";
// import Navbar from "../components_lite/Navbar";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { useSelector } from "react-redux";
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"


// const companyArray = [11];

// const PostJob = () => {
//     const [input, setInput] = useState({
//         title: "",
//         description: "",
//         requirements: "",
//         salary: "",
//         location: "",
//         jobType: "",
//         experience: "",
//         position: "",
//         companyId: "",
//     });

//     const { companies } = useSelector((store) => store.company);

//     const changeEventHandler = (e) => {
//         setInput({
//             ...input,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const submitHandler = (e) => {
//         e.preventDefault();
//         console.log(input);
//     };

//     return (
//         <>
//             <Navbar />

//             <div className="min-h-screen bg-gray-50 py-10 px-4">
//                 <div className="max-w-5xl mx-auto">
//                     <form
//                         onSubmit={submitHandler}
//                         className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-200"
//                     >
//                         {/* Heading */}
//                         <div className="text-center mb-10">
//                             <h1 className="text-4xl font-bold text-[#6B3AC2]">
//                                 Post New Job
//                             </h1>

//                             <p className="text-gray-500 mt-2">
//                                 Create a new job opportunity for candidates
//                             </p>
//                         </div>

//                         {/* Form Fields */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <Label>Job Title</Label>
//                                 <Input
//                                     type="text"
//                                     name="title"
//                                     value={input.title}
//                                     placeholder="Frontend Developer"
//                                     className="mt-2"
//                                     onChange={changeEventHandler}
//                                 />
//                             </div>

//                             <div>
//                                 <Label>Location</Label>
//                                 <Input
//                                     type="text"
//                                     name="location"
//                                     value={input.location}
//                                     placeholder="Indore"
//                                     className="mt-2"
//                                     onChange={changeEventHandler}
//                                 />
//                             </div>

//                             <div>
//                                 <Label>Salary (LPA)</Label>
//                                 <Input
//                                     type="number"
//                                     name="salary"
//                                     value={input.salary}
//                                     placeholder="12"
//                                     className="mt-2"
//                                     onChange={changeEventHandler}
//                                 />
//                             </div>

//                             <div>
//                                 <Label>Experience (Years)</Label>
//                                 <Input
//                                     type="number"
//                                     name="experience"
//                                     value={input.experience}
//                                     placeholder="2"
//                                     className="mt-2"
//                                     onChange={changeEventHandler}
//                                 />
//                             </div>

//                             <div>
//                                 <Label>Open Positions</Label>
//                                 <Input
//                                     type="number"
//                                     name="position"
//                                     value={input.position}
//                                     placeholder="5"
//                                     className="mt-2"
//                                     onChange={changeEventHandler}
//                                 />
//                             </div>

//                             <div>
//                                 <Label>Job Type</Label>
//                                 <Input
//                                     type="text"
//                                     name="jobType"
//                                     value={input.jobType}
//                                     placeholder="Full Time"
//                                     className="mt-2"
//                                     onChange={changeEventHandler}
//                                 />
//                             </div>

//                             <div>
//                                 <Label>Requirements</Label>
//                                 <Input
//                                     type="text"
//                                     name="requirements"
//                                     value={input.requirements}
//                                     placeholder="React, Node.js, MongoDB"
//                                     className="mt-2"
//                                     onChange={changeEventHandler}
//                                 />
//                             </div>

//                             <div>
//                                 <Label>Company ID</Label>
//                                 <Input
//                                     type="text"
//                                     name="companyId"
//                                     value={input.companyId}
//                                     placeholder="Select Company"
//                                     className="mt-2"
//                                     onChange={changeEventHandler}
//                                 />
//                             </div>

//                             {/* Description */}

//                             <div className="md:col-span-2">
//                                 <Label>Description</Label>

//                                 <textarea
//                                     name="description"
//                                     rows="3"
//                                     className="w-full mt-2 border rounded-lg p-3 resize-none"
//                                     placeholder="Enter complete job description..."
//                                 />
//                             </div>
//                         </div>

//                         <div>
//                             {companies.length > 0 && (
//                                 <Select onValueChange={selectChangeHandler}>
//                                     <SelectTrigger className="mt-2">
//                                         <SelectValue placeholder="Select a Company" />
//                                     </SelectTrigger>

//                                     <SelectContent>
//                                         <SelectGroup>
//                                             {companies.map((company) => (
//                                                 <SelectItem
//                                                     key={company._id}
//                                                     value={company.name.toLowerCase()}
//                                                 >
//                                                     {company.name}
//                                                 </SelectItem>
//                                             ))}
//                                         </SelectGroup>
//                                     </SelectContent>
//                                 </Select>
//                             )}
//                         </div>




//                         {/* Submit Button */}
//                         <Button
//                             type="submit"
//                             className="w-full mt-8 h-12 text-base font-semibold bg-[#6B3AC2] hover:bg-[#5a2fb0]"
//                         >
//                             Post Job
//                         </Button>
//                         {companies.length === 0 && (
//                             <p className="text-sm font-bold my-3 text-center text-red-600">
//                                 *Please register a company to post jobs.*
//                             </p>
//                         )}

//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default PostJob;








// // import React, { useState } from 'react'
// // import Navbar from '../components_lite/Navbar'
// // import { Label } from '../ui/label'
// // import { Input } from '../ui/input'

// // const PostJob = () => {

// //     const [input, setInput] = useState({
// //         title: "",//
// //         description: "",//
// //         requirements: "", //
// //         salary: "", //
// //         location: "", //
// //         jobType: "", //
// //         experience: "", //
// //         position: 0, //
// //         companyId: "",
// //         role: "",
// //     });

// //     const changeEventHandler = (e) => {
// //         setInput({ ...input, [e.target.name]: e.target.value });
// //     };


// //     return (
// //         <form className="p-8 w-full max-w-5xl bg-white border rounded-2xl shadow-lg">

// //             <h1 className="text-3xl font-bold text-center mb-8 text-[#6B3AC2]">
// //                 Post New Job
// //             </h1>

// //             <div className="grid md:grid-cols-2 gap-6">

// //                 <div>
// //                     <Label>Job Title</Label>
// //                     <Input
// //                         type="text"
// //                         name="title"
// //                         value={input.title}
// //                         placeholder="Frontend Developer"
// //                         onChange={changeEventHandler}
// //                         className="mt-2"
// //                     />
// //                 </div>

// //                 <div>
// //                     <Label>Location</Label>
// //                     <Input
// //                         type="text"
// //                         name="location"
// //                         value={input.location}
// //                         placeholder="Indore"
// //                         onChange={changeEventHandler}
// //                         className="mt-2"
// //                     />
// //                 </div>

// //                 <div>
// //                     <Label>Salary (LPA)</Label>
// //                     <Input
// //                         type="number"
// //                         name="salary"
// //                         value={input.salary}
// //                         placeholder="12"
// //                         onChange={changeEventHandler}
// //                         className="mt-2"
// //                     />
// //                 </div>

// //                 <div>
// //                     <Label>Experience (Years)</Label>
// //                     <Input
// //                         type="number"
// //                         name="experience"
// //                         value={input.experience}
// //                         placeholder="2"
// //                         onChange={changeEventHandler}
// //                         className="mt-2"
// //                     />
// //                 </div>

// //                 <div>
// //                     <Label>Open Positions</Label>
// //                     <Input
// //                         type="number"
// //                         name="position"
// //                         value={input.position}
// //                         placeholder="5"
// //                         onChange={changeEventHandler}
// //                         className="mt-2"
// //                     />
// //                 </div>

// //                 <div>
// //                     <Label>Job Type</Label>
// //                     <Input
// //                         type="text"
// //                         name="jobType"
// //                         value={input.jobType}
// //                         placeholder="Full Time"
// //                         onChange={changeEventHandler}
// //                         className="mt-2"
// //                     />
// //                 </div>

// //                 <div>
// //                     <Label>Requirements</Label>
// //                     <Input
// //                         type="text"
// //                         name="requirements"
// //                         value={input.requirements}
// //                         placeholder="React, Node.js, MongoDB"
// //                         onChange={changeEventHandler}
// //                         className="mt-2"
// //                     />
// //                 </div>

// //                 <div>
// //                     <Label>Company ID</Label>
// //                     <Input
// //                         type="text"
// //                         name="companyId"
// //                         value={input.companyId}
// //                         placeholder="Select Company"
// //                         onChange={changeEventHandler}
// //                         className="mt-2"
// //                     />
// //                 </div>

// //                 <div className="md:col-span-2">
// //                     <Label>Description</Label>
// //                     <textarea
// //                         name="description"
// //                         value={input.description}
// //                         onChange={changeEventHandler}
// //                         placeholder="Enter complete job description..."
// //                         className="w-full mt-2 border rounded-md p-3 min-h-[120px]"
// //                     />
// //                 </div>

// //             </div>

// //             <button
// //                 type="submit"
// //                 className="w-full mt-8 bg-[#6B3AC2] hover:bg-[#5b31a5] text-white py-3 rounded-lg font-semibold transition"
// //             >
// //                 Post Job
// //             </button>

// //         </form>
// //     )


// //     //     return (
// //     //         <div>
// //     //             <Navbar />
// //     //             <div className='flex items-center justify-center w-screen my-5'>
// //     //                 <form action="" className='p-8 max-w-4xl border border-gray-500 shadow-lg rounded-lg'>
// //     //                     <div className='grid grid-cols-2 gap-2'>
// //     //                         <div>
// //     //                             <Label>Title</Label>
// //     //                             <Input
// //     //                                 type="text"
// //     //                                 name="title"
// //     //                                 value={input.title}
// //     //                                 placeholder="Enter job title"
// //     //                                 className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 transition-all duration-300 hover:border-blue-400"
// //     //                                 onChange={changeEventHandler}
// //     //                             />
// //     //                         </div>
// //     //                         <div>
// //     //                             <Label>Description</Label>
// //     //                             <Input
// //     //                                 name="description"
// //     //                                 value={input.description}
// //     //                                 placeholder="Enter job description"
// //     //                                 className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 transition-all duration-300 hover:border-blue-400"
// //     //                                 onChange={changeEventHandler}
// //     //                             />
// //     //                         </div>
// //     //                         <div>
// //     //                             <Label>Location</Label>
// //     //                             <Input
// //     //                                 type="text"
// //     //                                 name="location"
// //     //                                 value={input.location}
// //     //                                 placeholder="Enter job location"
// //     //                                 className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 transition-all duration-300 hover:border-blue-400"
// //     //                                 onChange={changeEventHandler}
// //     //                             />
// //     //                         </div>
// //     //                         <div>
// //     //                             <Label>Salary</Label>
// //     //                             <Input
// //     //                                 type="number"
// //     //                                 name="salary"
// //     //                                 value={input.salary}
// //     //                                 placeholder="Enter job salary"
// //     //                                 className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
// //     //                                 onChange={changeEventHandler}
// //     //                             />
// //     //                         </div>
// //     //                         <div>
// //     //                             <Label>Position</Label>
// //     //                             <Input
// //     //                                 type="number"
// //     //                                 name="position"
// //     //                                 value={input.position}
// //     //                                 placeholder="Enter job position"
// //     //                                 className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
// //     //                                 onChange={changeEventHandler}
// //     //                             />
// //     //                         </div>

// //     //                         <div>
// //     //                             <Label>Role</Label>
// //     //                             <Input
// //     //                                 type="text"
// //     //                                 name="role"
// //     //                                 value={input.role}
// //     //                                 placeholder="Enter job role"
// //     //                                 className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 transition-all duration-300 hover:border-blue-400"
// //     //                                 onChange={changeEventHandler}
// //     //                             />
// //     //                         </div>


// //     //                         <div>
// //     //                             <Label>Requirements</Label>
// //     //                             <Input
// //     //                                 type="text"
// //     //                                 name="requirements"
// //     //                                 value={input.requirements}
// //     //                                 placeholder="Enter job requirements"
// //     //                                 className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
// //     //                                 onChange={changeEventHandler}
// //     //                             />
// //     //                         </div>

// //     //                         <div>
// //     //                             <Label>Experience</Label>
// //     //                             <Input
// //     //                                 type="number"
// //     //                                 name="experience"
// //     //                                 value={input.experience}
// //     //                                 placeholder="Enter job experience"
// //     //                                 className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
// //     //                                 onChange={changeEventHandler}
// //     //                             />
// //     //                         </div>

// //     //                         <div>
// //     //                             <Label>Job Type</Label>
// //     //                             <Input
// //     //                                 type="text"
// //     //                                 name="jobType"
// //     //                                 value={input.jobType}
// //     //                                 placeholder="Enter job type"
// //     //                                 className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
// //     //                                 onChange={changeEventHandler}
// //     //                             />
// //     //                         </div>

// //     //                         <div>
// //     //                             <Label>Company Id</Label>
// //     //                             <Input
// //     //                                 type="number"
// //     //                                 name="companyId"
// //     //                                 value={input.companyId}
// //     //                                 placeholder="Enter job type"
// //     //                                 className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
// //     //                                 onChange={changeEventHandler}
// //     //                             />
// //     //                         </div>

// //     //                     </div>
// //     //                 </form>
// //     //             </div>
// //     //         </div>
// //     //     )
// //     //
// // }

// // export default PostJob
