import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover";

import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";
import { Download } from "lucide-react";

// const shortlistingStatus = [
//     "Accepted",
//     "Rejected",
// ];
const shortlistingStatus = [
    "Accepted",
    "Rejected",
    "Schedule Interview",
];

const ApplicantsTable = ({ searchText }) => {


    const { applicants } = useSelector(
        (store) => store.application
    );

    const filteredApplicants =
        applicants?.applications?.filter((item) => {

            if (!searchText) return true;

            const query = searchText.toLowerCase();

            return (
                item?.applicant?.fullname
                    ?.toLowerCase()
                    .includes(query) ||

                item?.applicant?.email
                    ?.toLowerCase()
                    .includes(query) ||

                item?.applicant?.phoneNumber
                    ?.toLowerCase()
                    .includes(query)
            );
        }) || [];

    // new functionality add 

    const [showInterviewForm, setShowInterviewForm] =
        useState(false);

    const [selectedApplicationId, setSelectedApplicationId] =
        useState("");

    const [interviewDate, setInterviewDate] =
        useState("");

    const [interviewLink, setInterviewLink] =
        useState("");

    const statusHandler = async (status, id) => {

        if (status === "Schedule Interview") {
            setSelectedApplicationId(id);
            setShowInterviewForm(true);
            return;
        }

        try {
            const res = await axios.post(
                `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
                { status },
                {
                    withCredentials: true
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                window.location.reload();
            }

        } catch (error) {
            console.log(error);
            toast.error(
                error?.response?.data?.message || "Something went wrong"
            );
        }
    };
    // const statusHandler = async (status, id) => {
    //     if (status === "Schedule Interview") {

    //         setSelectedApplicationId(id);

    //         setShowInterviewForm(true);

    //         return;
    //     }
    //     console.log("Status:", status);
    //     console.log("Application ID:", id);

    //     try {
    //         axios.defaults.withCredentials = true;

    //         const res = await axios.post(
    //             `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
    //             { status },
    //             {
    //                 withCredentials: true
    //             }
    //         );

    //         console.log("Response:", res.data);

    //         // if (res.data.success) {
    //         //     toast.success(res.data.message);
    //         // }
    //         if (res.data.success) {
    //             toast.success(res.data.message);
    //             window.location.reload();
    //         }
    //     } catch (error) {
    //         console.log("Error:", error.response?.data);
    //         toast.error(error.response?.data?.message);
    //     }
    // };


    const scheduleInterviewHandler = async () => {

        console.log("SCHEDULE BUTTON CLICKED");
        console.log("Date:", interviewDate);
        console.log("Link:", interviewLink);

        try {

            console.log("BEFORE API CALL");

            const res = await axios.post(
                `${APPLICATION_API_ENDPOINT}/schedule/${selectedApplicationId}`,
                {
                    interviewDate,
                    interviewLink,
                },
                {
                    withCredentials: true,
                }
            );

            console.log("AFTER API CALL");
            console.log("API RESPONSE:", res.data);

            if (res.data.success) {
                toast.success("Interview Scheduled Successfully");
                setShowInterviewForm(false);
                setInterviewDate("");
                setInterviewLink("");
                window.location.reload();
            }

        } catch (error) {

            console.log("FULL ERROR:", error);

            console.log(
                "ERROR RESPONSE:",
                error?.response?.data
            );

            toast.error(
                error?.response?.data?.message ||
                "Something went wrong"
            );
        }
    };

    return (
        <div>
            {showInterviewForm && (
                <div className="mb-5 p-4 border rounded-lg bg-gray-50">

                    <h2 className="font-bold text-lg mb-3">
                        Schedule Interview
                    </h2>

                    <div className="flex flex-col gap-3">

                        <input
                            type="datetime-local"
                            value={interviewDate}
                            onChange={(e) =>
                                setInterviewDate(e.target.value)
                            }
                            className="border p-2 rounded"
                        />

                        <input
                            type="text"
                            placeholder="Google Meet Link"
                            value={interviewLink}
                            onChange={(e) =>
                                setInterviewLink(e.target.value)
                            }
                            className="border p-2 rounded"
                        />

                        <div className="flex gap-3">

                            <button
                                onClick={scheduleInterviewHandler}
                                className="
                        bg-green-600
                        text-white
                        px-4
                        py-2
                        rounded
                    "
                            >
                                Schedule
                            </button>

                            <button
                                onClick={() =>
                                    setShowInterviewForm(false)
                                }
                                className="
                        bg-gray-500
                        text-white
                        px-4
                        py-2
                        rounded
                    "
                            >
                                Cancel
                            </button>

                        </div>

                    </div>
                </div>
            )}
            <Table>
                <TableCaption>
                    A list of applicants
                </TableCaption>

                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filteredApplicants.length > 0 ? (
                        filteredApplicants.map(
                            (item) => (
                                <TableRow key={item._id}>
                                    <TableCell>
                                        {
                                            item?.applicant
                                                ?.fullname
                                        }
                                    </TableCell>

                                    <TableCell>
                                        {
                                            item?.applicant
                                                ?.email
                                        }
                                    </TableCell>

                                    <TableCell>
                                        {
                                            item?.applicant
                                                ?.phoneNumber
                                        }
                                    </TableCell>

                                    {/* <TableCell>
                                        {item?.applicant
                                            ?.profile
                                            ?.resume ? (
                                            <a
                                                href={
                                                    item
                                                        ?.applicant
                                                        ?.profile
                                                        ?.resume
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                Download
                                            </a>
                                        ) : (
                                            <span>
                                                N/A
                                            </span>
                                        )}
                                    </TableCell> */}
                                    <TableCell>
                                        {item?.applicant?.profile?.resume ? (
                                            <div className="flex flex-col gap-1">

                                                <span className="text-sm text-gray-600">
                                                    {
                                                        item?.applicant?.profile
                                                            ?.resumeOriginalname
                                                    }
                                                </span>

                                                <a
                                                    href={item?.applicant?.profile?.resume}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="
        flex items-center gap-1
        text-blue-600
        hover:text-blue-800
    "
                                                >
                                                    <Download className="w-4 h-4" />
                                                    Download
                                                </a>

                                            </div>
                                        ) : (
                                            <span className="text-gray-400">
                                                No Resume
                                            </span>
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        {/* <span
                                            className={`font-medium ${item?.status ===
                                                "Accepted"
                                                ? "text-green-600"
                                                : item?.status ===
                                                    "Rejected"
                                                    ? "text-red-600"
                                                    : "text-yellow-600"
                                                }`}
                                        >
                                            {item?.status ||
                                                "Pending"}
                                        </span> */}
                                        <span
                                            className={`font-medium ${item?.status?.toLowerCase() === "accepted"
                                                ? "text-green-600"
                                                : item?.status?.toLowerCase() === "rejected"
                                                    ? "text-red-600"
                                                    : "text-yellow-600"
                                                }`}
                                        >
                                            {item?.status
                                                ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
                                                : "Pending"}
                                        </span>
                                    </TableCell>

                                    <TableCell>
                                        {item
                                            ?.createdAt
                                            ? item.createdAt.split(
                                                "T"
                                            )[0]
                                            : "N/A"}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <Popover>
                                            <PopoverTrigger
                                                asChild
                                            >
                                                <button>
                                                    <MoreHorizontal className="cursor-pointer" />
                                                </button>
                                            </PopoverTrigger>

                                            <PopoverContent className="w-36">
                                                {shortlistingStatus.map(
                                                    (
                                                        status,
                                                        index
                                                    ) => (
                                                        <div
                                                            key={
                                                                index
                                                            }
                                                            onClick={() =>
                                                                statusHandler(
                                                                    status,
                                                                    item._id
                                                                )
                                                            }
                                                            className="cursor-pointer py-2 hover:text-blue-600"
                                                        >
                                                            {
                                                                status
                                                            }
                                                        </div>
                                                    )
                                                )}
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            )
                        )
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={7}
                                className="text-center py-6"
                            >
                                No Matching Applicants Found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsTable;



















// import React from "react";
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
// import { MoreHorizontal } from "lucide-react";
// import { useSelector } from "react-redux";
// import { toast } from "sonner";
// import axios from "axios";
// import { APPLICATION_API_ENDPOINT } from "@/utils/data";

// const shortlistingStatus = ["Accepted", "Rejected"];

// const ApplicantsTable = () => {
//     const { applicants } = useSelector((store) => store.application);

//     const statusHandler = async (status, id) => {
//         console.log("called");
//         try {
//             axios.defaults.withCredentials = true;
//             const res = await axios.post(
//                 `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
//                 { status }
//             );
//             console.log(res);
//             if (res.data.success) {
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             toast.error(error.response.data.message);
//         }
//     };

//     return (
//         <div>
//             <Table>
//                 <TableCaption>A list of your recent applied user</TableCaption>
//                 <TableHeader>
//                     <TableRow>
//                         <TableHead>FullName</TableHead>
//                         <TableHead>Email</TableHead>
//                         <TableHead>Contact</TableHead>
//                         <TableHead>Resume</TableHead>
//                         <TableHead>Date</TableHead>
//                         <TableHead className="text-right">Action</TableHead>
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {applicants &&
//                         applicants?.applications?.map((item) => (
//                             <tr key={item._id}>
//                                 <TableCell>{item?.applicant?.fullname}</TableCell>
//                                 <TableCell>{item?.applicant?.email}</TableCell>
//                                 <TableCell>{item?.applicant?.phoneNumber}</TableCell>
//                                 <TableCell>
//                                     {item.applicant?.profile?.resume ? (
//                                         <a
//                                             className="text-blue-600 cursor-pointer"
//                                             href={item?.applicant?.profile?.resume}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             Download
//                                             {/* {item?.applicant?.profile?.resume} */}
//                                         </a>
//                                     ) : (
//                                         <span>NA</span>
//                                     )}
//                                 </TableCell>
//                                 <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
//                                 <TableCell className="float-right cursor-pointer">
//                                     <Popover>
//                                         <PopoverTrigger>
//                                             <MoreHorizontal />
//                                         </PopoverTrigger>
//                                         <PopoverContent className="w-32">
//                                             {shortlistingStatus.map((status, index) => {
//                                                 return (
//                                                     <div
//                                                         onClick={() => statusHandler(status, item?._id)}
//                                                         key={index}
//                                                         className="flex w-fit items-center my-2 cursor-pointer"
//                                                     >
//                                                         <input
//                                                             type="radio"
//                                                             name="shortlistingStatus"
//                                                             value={status}
//                                                         />{" "}
//                                                         {status}
//                                                     </div>
//                                                 );
//                                             })}
//                                         </PopoverContent>
//                                     </Popover>
//                                 </TableCell>
//                             </tr>
//                         ))}
//                 </TableBody>
//             </Table>
//         </div>
//     );
// };

// export default ApplicantsTable;