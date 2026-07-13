import React, { useState } from 'react';
import Navbar from '../components_lite/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { COMPANY_API_ENDPOINT } from '@/utils/data';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { setSingleCompany } from '@/redux/companyslice';

const CompanyCreate = () => {

    const [companyName, setCompanyName] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registerNewCompany = async () => {

        if (!companyName.trim()) {
            toast.error("Company name is required");
            return;
        }

        try {

            const res = await axios.post(
                `${COMPANY_API_ENDPOINT}/register`,
                { companyName },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            console.log(res.data);

            if (res?.data?.success) {

                dispatch(setSingleCompany(res.data.company));

                toast.success(res.data.message);

                const companyId = res?.data?.company?._id;

                navigate(`/admin/companies/${companyId}`);
            }

        } catch (error) {

            console.error(error);

            toast.error(
                error?.response?.data?.message || "Something went wrong"
            );
        }
    };

    return (
        <div>
            <Navbar />

            <div className="max-w-4xl mx-auto py-10">

                <div className="my-10">

                    <h1 className="font-bold text-3xl">
                        Company Name
                    </h1>

                    <p className="text-gray-600">
                        What would you like to name your company? You can change this later.
                    </p>

                </div>

                <div className="space-y-2">

                    <Label>Company Name</Label>

                    <Input
                        type="text"
                        placeholder="Microsoft, Google, Apple..."
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />

                </div>

                <div className="flex items-center gap-3 my-10">

                    <Button
                        variant="outline"
                        onClick={() => navigate("/admin/companies")}
                    >
                        Cancel
                    </Button>

                    <Button
                        className="bg-[#6B3AC2] hover:bg-[#552d9b]"
                        onClick={registerNewCompany}
                    >
                        Continue
                    </Button>

                </div>

            </div>
        </div>
    );
};

export default CompanyCreate;



















// import React, { useState } from 'react'
// import Navbar from '../components_lite/Navbar'
// import { Label } from '../ui/label'
// import { Input } from '../ui/input'
// import { Button } from '../ui/button'
// import { useNavigate } from 'react-router-dom'
// import { COMPANY_API_ENDPOINT } from '@/utils/data'
// import { useDispatch } from 'react-redux'
// import axios from "axios";

// const CompanyCreate = () => {


//     const [companyName, setCompanyName] = useState();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const registerNewCompany = async () => {
//         // API call to register new company
//         try {
//             const res = await axios.post(`${COMPANY_API_ENDPOINT}/register`, { companyName }, {
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 withCredentials: true
//             })

//             console.log(res.data);
//             if (res?.data?.success) {
//                 dispatch(setSingleCompany(res.data.company));
//                 toast.success(res.data.message);
//                 const companyId = res?.data?.company?._id;
//                 navigate(`/admin/companies/${companyId}`);
//             }

//         } catch (error) {
//             console.error(error);
//         };

//         return (
//             <div>
//                 <Navbar />
//                 <div className="max-w-4xl mx-auto py-10">
//                     <div className="my-10">
//                         <h1 className="font-bold text-3xl">
//                             Company Name
//                         </h1>
//                         <p className="text-gray-600">
//                             Company Description
//                         </p>
//                     </div>
//                     <Label>Company Name</Label>
//                     <Input type="text" placeholder="Company Name" className="my-2" onChange={(e) => setCompanyName(e.target.value)} />
//                     <div className="flex items-center gap-2 my-10">
//                         <Button
//                             className="bg-[#6B3AC2] hover:bg-[#552d9b]"
//                             variant="outline"
//                             onClick={() => navigate("/admin/companies")}
//                         >Cancel</Button>
//                         <Button
//                             className="bg-[#6B3AC2] hover:bg-[#552d9b]"
//                             onClick={registerNewCompany}
//                         >Continue</Button>
//                     </div>

//                 </div>
//             </div>
//         )
//     }
// }

// export default CompanyCreate
