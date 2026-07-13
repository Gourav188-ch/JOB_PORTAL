import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import {
    Edit2,
    Eye,
    MoreHorizontal,
    Trash2,
} from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";

import { setAllAdminJobs } from "@/redux/jobSlice";

const AdminJobsTable = () => {
    const { companies } = useSelector(
        (store) => store.company
    );

    const { allAdminJobs, searchJobByText } = useSelector(
        (store) => store.job
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [filterJobs, setFilterJobs] = useState([]);

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;

            return (
                job?.title
                    ?.toLowerCase()
                    .includes(searchJobByText.toLowerCase()) ||
                job?.company?.name
                    ?.toLowerCase()
                    .includes(searchJobByText.toLowerCase())
            );
        });

        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    const deleteJobHandler = async (jobId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this job?"
        );

        if (!confirmDelete) return;

        try {
            const res = await axios.delete(
                `${JOB_API_ENDPOINT}/delete/${jobId}`,
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);

                const updatedJobs = allAdminJobs.filter(
                    (job) => job._id !== jobId
                );

                dispatch(setAllAdminJobs(updatedJobs));
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Failed to delete job"
            );
        }
    };

    if (!companies) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filterJobs.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                className="text-center py-10 text-gray-500"
                            >
                                No Jobs Found
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterJobs.map((job) => (
                            <TableRow key={job._id}>
                                <TableCell>
                                    {job?.company?.name || "N/A"}
                                </TableCell>

                                <TableCell>
                                    {job?.title || "N/A"}
                                </TableCell>

                                <TableCell>
                                    {job?.createdAt
                                        ? job.createdAt.split("T")[0]
                                        : "N/A"}
                                </TableCell>

                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button>
                                                <MoreHorizontal className="cursor-pointer" />
                                            </button>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-40">

                                            {/* Edit */}
                                            <div
                                                onClick={() =>
                                                    navigate(
                                                        `/admin/jobs/edit/${job._id}`
                                                    )
                                                }
                                                className="flex items-center gap-2 cursor-pointer mb-2 hover:text-blue-600"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                                <span>Edit</span>
                                            </div>

                                            <hr />

                                            {/* Applicants */}
                                            <div
                                                onClick={() =>
                                                    navigate(
                                                        `/admin/jobs/${job._id}/applicants`
                                                    )
                                                }
                                                className="flex items-center gap-2 cursor-pointer my-2 hover:text-green-600"
                                            >
                                                <Eye className="w-4 h-4" />
                                                <span>Applicants</span>
                                            </div>

                                            <hr />

                                            {/* Delete */}
                                            <div
                                                onClick={() =>
                                                    deleteJobHandler(
                                                        job._id
                                                    )
                                                }
                                                className="flex items-center gap-2 cursor-pointer mt-2 text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                <span>Delete</span>
                                            </div>

                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;
















// import React, { useEffect, useState } from "react";
// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "../ui/table";

// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { Edit2, Eye, MoreHorizontal } from "lucide-react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// // deletejob ke liye
// // import { Trash2 } from "lucide-react";
// // import axios from "axios";
// // import { JOB_API_ENDPOINT } from "@/utils/data";
// // import { toast } from "sonner";
// // import { useDispatch } from "react-redux";
// // import { setAllAdminJobs } from "@/redux/jobSlice";

// const AdminJobsTable = () => {
//     const { companies, searchCompanyByText } = useSelector(
//         (store) => store.company
//     );
//     const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
//     const navigate = useNavigate();

//     const [filterJobs, setFilterJobs] = useState(allAdminJobs);

//     useEffect(() => {
//         const filteredJobs =
//             allAdminJobs.length >= 0 &&
//             allAdminJobs.filter((job) => {
//                 if (!searchJobByText) {
//                     return true;
//                 }
//                 return (
//                     job.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
//                     job?.company?.name
//                         .toLowerCase()
//                         .includes(searchJobByText.toLowerCase())
//                 );
//             });
//         setFilterJobs(filteredJobs);
//     }, [allAdminJobs, searchJobByText]);

//     console.log("COMPANIES", companies);
//     if (!companies) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <Table>
//                 {/* <TableCaption>Your recent Posted Jobs</TableCaption> */}
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead>Company Name</TableHead>
//                         <TableHead>Role</TableHead>
//                         <TableHead>Date</TableHead>
//                         <TableHead className="text-right">Action</TableHead>
//                     </TableRow>
//                 </TableHeader>

//                 <TableBody>
//                     {filterJobs.length === 0 ? (
//                         <TableRow>
//                             <TableCell
//                                 colSpan={4}
//                                 className="text-center py-6 text-gray-500"
//                             >
//                                 No Job Added
//                             </TableCell>
//                         </TableRow>
//                     ) : (
//                         filterJobs.map((job) => (
//                             <TableRow key={job._id}>
//                                 <TableCell>
//                                     {job?.company?.name || "N/A"}
//                                 </TableCell>

//                                 <TableCell>
//                                     {job?.title || "N/A"}
//                                 </TableCell>

//                                 <TableCell>
//                                     {job?.createdAt
//                                         ? job.createdAt.split("T")[0]
//                                         : "N/A"}
//                                 </TableCell>

//                                 <TableCell className="text-right">
//                                     <Popover>
//                                         <PopoverTrigger asChild>
//                                             <button>
//                                                 <MoreHorizontal className="cursor-pointer" />
//                                             </button>
//                                         </PopoverTrigger>

//                                         <PopoverContent className="w-36">
//                                             <div
//                                                 onClick={() =>
//                                                     // navigate(`/admin/companies/${job._id}`)
//                                                     navigate(`/admin/jobs/edit/${job._id}`)
//                                                 }
//                                                 className="flex items-center gap-2 cursor-pointer mb-2"
//                                             >
//                                                 <Edit2 className="w-4 h-4" />
//                                                 <span>Edit</span>
//                                             </div>

//                                             <hr />

//                                             <div
//                                                 onClick={() =>
//                                                     navigate(`/admin/jobs/${job._id}/applicants`)
//                                                 }
//                                                 className="flex items-center gap-2 cursor-pointer mt-2"
//                                             >
//                                                 <Eye className="w-4 h-4" />
//                                                 <span>Applicants</span>
//                                             </div>
//                                         </PopoverContent>
//                                     </Popover>
//                                 </TableCell>
//                             </TableRow>
//                         ))
//                     )}
//                 </TableBody>
//             </Table>
//         </div>
//     );
// };

// export default AdminJobsTable;







// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "../ui/table";

// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "../ui/popover";

// import { Edit2, Eye, MoreHorizontal } from "lucide-react";

// const AdminJobsTable = () => {
//     const navigate = useNavigate();

//     // const { searchCompanyByText } = useSelector(
//     //     (store) => store.company
//     // );

//     const {
//         allAdminJobs = [],
//         searchJobByText
//     } = useSelector((store) => store.job);

//     const [filterJob, setFilterJob] = useState([]);

//     useEffect(() => {
//         const filtered = allAdminJobs.filter((job) => {
//             if (!searchJobByText) return true;

//             const search = searchJobByText.toLowerCase();

//             return (
//                 job?.company?.name
//                     ?.toLowerCase()
//                     ?.includes(search) ||
//                 job?.title
//                     ?.toLowerCase()
//                     ?.includes(search)
//             );
//         });

//         setFilterJob(filtered);
//     }, [allAdminJobs, searchJobByText]);
//     return (
//         <div className="bg-white rounded-xl shadow-md border p-4">
//             <Table>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead>Company Name</TableHead>
//                         <TableHead>Role</TableHead>
//                         <TableHead>Date</TableHead>
//                         <TableHead className="text-right">
//                             Action
//                         </TableHead>
//                     </TableRow>
//                 </TableHeader>

//                 <TableBody>
//                     {filterJob.length === 0 ? (
//                         <TableRow>
//                             <TableCell
//                                 colSpan={4}
//                                 className="text-center py-6"
//                             >
//                                 No Jobs Added
//                             </TableCell>
//                         </TableRow>
//                     ) : (
//                         filterJob.map((job) => (
//                             <TableRow key={job._id}>
//                                 <TableCell>
//                                     {job?.company?.name || "N/A"}
//                                 </TableCell>

//                                 <TableCell>
//                                     {job?.title || "N/A"}
//                                 </TableCell>

//                                 <TableCell>
//                                     {job?.createdAt
//                                         ? new Date(
//                                             job.createdAt
//                                         ).toLocaleDateString()
//                                         : "N/A"}
//                                 </TableCell>

//                                 <TableCell className="text-right">
//                                     <Popover>
//                                         <PopoverTrigger asChild>
//                                             <button>
//                                                 <MoreHorizontal className="cursor-pointer" />
//                                             </button>
//                                         </PopoverTrigger>

//                                         <PopoverContent className="w-32">
//                                             <div
//                                                 onClick={() => navigate(`/admin/companies/${job._id}`)}
//                                                 className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
//                                             >
//                                                 <Edit2 className="w-4 h-4" />
//                                                 <span>Edit</span>
//                                             </div>

//                                             <hr />
//                                             <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center gap-2 w-fit cursor-pointer mt-1">
//                                                 <Eye className="w-4"></Eye>
//                                                 <span>Applicants</span>
//                                             </div>
//                                         </PopoverContent>
//                                     </Popover>
//                                 </TableCell>
//                             </TableRow>
//                         ))
//                     )}
//                 </TableBody>
//             </Table>
//         </div>
//     );
// };

// export default AdminJobsTable;































// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "../ui/table";

// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "../ui/popover";

// import { Edit2, MoreHorizontal } from "lucide-react";
// import { searchCompanyByText } from "@/redux/companyslice";

// const AdminJobsTable = () => {
//     const navigate = useNavigate();

//     const { searchCompanyByText } = useSelector(
//         (store) => store.company
//     );

//     const { allAdminJobs, searchJobByText } = useSelector(
//         (store) => store.job
//     );
//     console.log("Redux Admin Jobs:", allAdminJobs);

//     const [filterJob, setFilterJob] = useState([]);

//     useEffect(() => {
//         const filtered = allAdminJobs.filter((job) => {
//             if (!searchCompanyByText) return true;

//             const search = searchCompanyByText.toLowerCase();

//             return (
//                 job?.company?.name?.toLowerCase().includes(search) ||
//                 job?.title?.toLowerCase().includes(search)
//             );
//         });
//         // const filtered = allAdminJobs.filter((job) => {
//         //     if (!searchJobByText) return true;

//         //     return job?.title
//         //         ?.toLowerCase()
//         //         .includes(searchJobByText.toLowerCase()) || false; // job?.company?.name.toLowerCase.includes(searchJobByText.toLowerCase());
//         // });

//         setFilterJob(filtered);
//     }, [allAdminJobs, searchJobByText]);

//     return (
//         <div className="bg-white rounded-xl shadow-md border p-4">
//             <Table>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead>Company Name</TableHead>
//                         <TableHead>Role</TableHead>
//                         <TableHead>Date</TableHead>
//                         <TableHead className="text-right">
//                             Action
//                         </TableHead>
//                     </TableRow>
//                 </TableHeader>

//                 <TableBody>
//                     {filterJob.length === 0 ? (
//                         <TableRow>
//                             <TableCell
//                                 colSpan={4}
//                                 className="text-center py-6"
//                             >
//                                 No Jobs Added
//                             </TableCell>
//                         </TableRow>
//                     ) : (
//                         filterJob.map((job) => (
//                             <TableRow key={job._id}>
//                                 <TableCell>
//                                     {job?.company?.name || "N/A"}
//                                 </TableCell>

//                                 <TableCell>
//                                     {job?.title || "N/A"}
//                                 </TableCell>

//                                 <TableCell>
//                                     {job?.createdAt
//                                         ? job.createdAt.split("T")[0]
//                                         : "N/A"}
//                                 </TableCell>

//                                 <TableCell className="text-right">
//                                     <Popover>
//                                         <PopoverTrigger asChild>
//                                             <button>
//                                                 <MoreHorizontal className="cursor-pointer" />
//                                             </button>
//                                         </PopoverTrigger>

//                                         <PopoverContent className="w-32">
//                                             <div
//                                                 onClick={() => {
//                                                     // console.log("Clicked");
//                                                     // console.log(job._id);
//                                                     navigate(`/admin/jobs/${job._id}`);
//                                                 }}
//                                                 className="flex items-center gap-2 cursor-pointer"
//                                             >
//                                                 <Edit2 className="w-4 h-4" />
//                                                 <span>Edit</span>
//                                             </div>
//                                         </PopoverContent>
//                                     </Popover>
//                                 </TableCell>
//                             </TableRow>
//                         ))
//                     )}
//                 </TableBody>
//             </Table>
//         </div>
//     );
// };

// export default AdminJobsTable;




















// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";

// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "../ui/table";

// // import { Avatar, AvatarImage } from "../ui/avatar";
// // import { searchCompanyByText } from '@/redux/companyslice';

// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "../ui/popover";

// import { Edit2, MoreHorizontal } from "lucide-react";

// const AdminJobsTable = () => {
//     const { companies, searchCompanyByText } = useSelector((store) => store.company);

//     const navigate = useNavigate();

//     const { allAdminJobs } = useSelector((store) => store.job);

//     const [filterJob, setFilterJob] = useState(allAdminJobs);




//     useEffect(() => {
//         const filtered = allAdminJobs.filter((job) => {
//             if (!searchCompanyByText) return true;

//             return company.name
//                 .toLowerCase()
//                 .includes(searchCompanyByText.toLowerCase());
//         });

//         setFilterJob(filtered);
//     }, [companies, searchCompanyByText]);

//     console.log("Redux Companies:", companies);

//     return (
//         <div className="bg-white rounded-xl shadow-md border p-4">
//             <Table>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead>Company Name</TableHead>
//                         <TableHead>Role</TableHead>
//                         <TableHead>Date</TableHead>
//                         <TableHead className="text-right">Action</TableHead>
//                     </TableRow>
//                 </TableHeader>

//                 <TableBody>
//                     {filterJob.length === 0 ? (
//                         // <span></span>
//                         <TableRow>
//                             <TableCell colSpan={4} className="text-center py-6">
//                                 No Job added
//                             </TableCell>
//                         </TableRow>
//                     ) : (
//                         filterJob.map((job) => (
//                             <TableRow key={job._id}>
//                                 <TableCell>

//                                 </TableCell>

//                                 <TableCell>{job.name}</TableCell>

//                                 <TableCell>
//                                     {job.createdAt
//                                         ? job.createdAt.split("T")[0]
//                                         : "N/A"}
//                                 </TableCell>

//                                 <TableCell className="text-right">
//                                     <Popover>
//                                         <PopoverTrigger asChild>
//                                             <button>
//                                                 <MoreHorizontal className="cursor-pointer" />
//                                             </button>
//                                         </PopoverTrigger>

//                                         <PopoverContent className="w-32">
//                                             <div
//                                                 onClick={() => navigate(`/admin/companies/${job._id}`)}
//                                                 className="flex items-center gap-2 w-fit cursor-pointer mb-1"
//                                             >
//                                                 <Edit2 className="w-4" />
//                                                 <span>Edit</span>
//                                             </div>


//                                             {/* <Link
//                                                 to={`/admin/companies/${job._id}`}
//                                             >
//                                                 <div className="flex items-center gap-2 cursor-pointer">
//                                                     <Edit2 className="w-4 h-4" />
//                                                     <span>Edit</span>
//                                                 </div>
//                                             </Link> */}
//                                         </PopoverContent>
//                                     </Popover>
//                                 </TableCell>
//                             </TableRow>
//                         ))
//                     )}
//                 </TableBody>
//             </Table>
//         </div>
//     );
// };

// export default AdminJobsTable;
