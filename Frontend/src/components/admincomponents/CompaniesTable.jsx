import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

import { Avatar, AvatarImage } from "../ui/avatar";
// import { searchCompanyByText } from '@/redux/companyslice';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover";

import { Edit2, MoreHorizontal } from "lucide-react";

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector((store) => store.company);

    const [filter, setFilter] = useState(companies);

    // useEffect(() => {
    //     const filteredCompany =
    //         companies.length > 0 &&
    //         companies.filter((company) => {
    //             if (!searchCompanyByText) {
    //                 return true;
    //             }
    //             return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    //         });
    //     setFilter(filteredCompany);
    // }, [companies, searchCompanyByText])


    useEffect(() => {
        const filtered = companies.filter((company) => {
            if (!searchCompanyByText) return true;

            return company.name
                .toLowerCase()
                .includes(searchCompanyByText.toLowerCase());
        });

        setFilter(filtered);
    }, [companies, searchCompanyByText]);

    console.log("Redux Companies:", companies);

    return (
        <div className="bg-white rounded-xl shadow-md border p-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filter.length === 0 ? (
                        // <span></span>
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-6">
                                No companies added
                            </TableCell>
                        </TableRow>
                    ) : (
                        filter.map((company) => (
                            <TableRow key={company._id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage
                                            src={
                                                company.logo ||
                                                "https://via.placeholder.com/40"
                                            }
                                        />
                                    </Avatar>
                                </TableCell>

                                <TableCell>{company.name}</TableCell>

                                <TableCell>
                                    {company.createdAt
                                        ? company.createdAt.split("T")[0]
                                        : "N/A"}
                                </TableCell>

                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button>
                                                <MoreHorizontal className="cursor-pointer" />
                                            </button>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-32">
                                            <Link
                                                to={`/admin/companies/${company._id}`}
                                            >
                                                <div className="flex items-center gap-2 cursor-pointer">
                                                    <Edit2 className="w-4 h-4" />
                                                    <span>Edit</span>
                                                </div>
                                            </Link>
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

export default CompaniesTable;


// import React from 'react'
// import { Table, TableCaption, TableHead, TableRow } from '../ui/table'

// const CompaniesTable = () => {
//     return (
//         <div>
//             <Table>
//                 <TableCaption>
//                     Your Recent Register Companies.
//                 </TableCaption>
//                 <TableHead>
//                     <TableRow>
//                         <TableHead>Logo</TableHead>
//                         <TableHead>Company Name</TableHead>
//                         <TableHead>Date</TableHead>
//                         <TableHead>Action</TableHead>
//                     </TableRow>
//                 </TableHead>
//             </Table>
//         </div>
//     )
// }

// export default CompaniesTable
