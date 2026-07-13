import React, { useEffect, useState } from 'react';
import Navbar from '../components_lite/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import usegetAllCompanies from '@/hooks/usegetAllCompanies';
import { useDispatch } from 'react-redux';
import { searchCompanyByText } from '@/redux/companyslice';

const Companies = () => {

    const navigate = useNavigate();
    usegetAllCompanies();

    const [input, setInput] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(searchCompanyByText(input));
    }, [input])
    return (
        <div>
            <Navbar />

            <div className="max-w-6xl mx-auto py-10">

                {/* Header Section */}
                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-900">
                        Companies
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage your registered companies
                    </p>

                </div>

                {/* Search + Button */}
                <div className="flex items-center justify-between mb-6">

                    <Input
                        className="w-80"
                        placeholder="Search company..."
                        onChange={(e) => setInput(e.target.value)}
                    />

                    <Button
                        className="bg-[#6B3AC2] hover:bg-[#552d9b]"
                        onClick={() => navigate("/admin/companies/create")}
                    >
                        Add Company
                    </Button>

                </div>

                {/* Table */}
                <CompaniesTable />

            </div>
        </div>
    );
};

export default Companies;


// import React from 'react'
// import Navbar from '../components_lite/Navbar'
// import { Input } from '../ui/input'
// import { Button } from '../ui/button'
// import CompaniesTable from './CompaniesTable'

// const Companies = () => {
//     return (
//         <div>
//             <Navbar />
//             <div className="max-w-6xl mx-auto my-10">
//                 <div className="flex items-center justify-between">
//                     <Input className="w-fit" placeholder="Filter by Name"></Input>
//                     <Button className="bg-purple-600 text-white">
//                         Add Company
//                     </Button>
//                 </div>
//                 <div>
//                     <CompaniesTable />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Companies
