import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

const AppliedJob = () => {
    const { allAppliedJobs = [] } = useSelector((store) => store.job);

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
            <Table>
                <TableCaption className="text-gray-500">
                    Recent Applied Jobs
                </TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {allAppliedJobs.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={4}
                                className="text-center py-8 text-gray-500"
                            >
                                You have not applied for any job yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((appliedJob) => (
                            <TableRow
                                key={appliedJob._id}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                <TableCell>
                                    {appliedJob?.createdAt
                                        ? appliedJob.createdAt.split("T")[0]
                                        : "N/A"}
                                </TableCell>

                                <TableCell className="font-medium">
                                    {appliedJob?.job?.title || "N/A"}
                                </TableCell>

                                <TableCell>
                                    {appliedJob?.job?.company?.name || "N/A"}
                                </TableCell>

                                <TableCell className="text-right">
                                    <Badge
                                        className={`capitalize text-white px-3 py-1
                                            ${appliedJob?.status === "accepted"
                                                ? "bg-green-600 hover:bg-green-700"
                                                : appliedJob?.status === "rejected"
                                                    ? "bg-red-500 hover:bg-red-600"
                                                    : "bg-yellow-500 hover:bg-yellow-600"
                                            }
                                        `}
                                    >
                                        {appliedJob?.status || "pending"}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJob;













// import React from 'react'
// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow
// } from '../ui/table'

// import { Badge } from '../ui/badge'

// const AppliedJob = () => {

//     const appliedJobs = [
//         {
//             date: "15-05-2026",
//             title: "Software Engineer",
//             company: "Microsoft",
//             status: "Selected"
//         },
//         {
//             date: "18-05-2026",
//             title: "Frontend Developer",
//             company: "Google",
//             status: "Pending"
//         },
//         {
//             date: "20-05-2026",
//             title: "Backend Developer",
//             company: "Amazon",
//             status: "Rejected"
//         },
//     ]

//     return (
//         <div className='rounded-xl border border-gray-200 overflow-hidden'>

//             <Table>

//                 <TableCaption className="py-4 text-gray-500">
//                     Recent Applied Jobs
//                 </TableCaption>

//                 <TableHeader className="bg-gray-100">

//                     <TableRow>

//                         <TableHead>Date</TableHead>

//                         <TableHead>Job Title</TableHead>

//                         <TableHead>Company</TableHead>

//                         <TableHead className="text-right">
//                             Status
//                         </TableHead>

//                     </TableRow>

//                 </TableHeader>

//                 <TableBody>

//                     {
//                         appliedJobs.map((job, index) => (

//                             <TableRow
//                                 key={index}
//                                 className="hover:bg-gray-50 transition"
//                             >

//                                 <TableCell>
//                                     {job.date}
//                                 </TableCell>

//                                 <TableCell className="font-medium">
//                                     {job.title}
//                                 </TableCell>

//                                 <TableCell>
//                                     {job.company}
//                                 </TableCell>

//                                 <TableCell className="text-right">

//                                     <Badge
//                                         className={
//                                             job.status === "Selected"
//                                                 ? "bg-green-100 text-green-700 hover:bg-green-100"
//                                                 : job.status === "Pending"
//                                                     ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
//                                                     : "bg-red-100 text-red-700 hover:bg-red-100"
//                                         }
//                                     >
//                                         {job.status}
//                                     </Badge>

//                                 </TableCell>

//                             </TableRow>

//                         ))
//                     }

//                 </TableBody>

//             </Table>

//         </div>
//     )
// }

// export default AppliedJob