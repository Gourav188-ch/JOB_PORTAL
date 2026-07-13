import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const CompanySetup = () => {

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null,
    });

    const { singleCompany } = useSelector((store) => store.company);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const changeFileHandler = (e) => {
        setInput({
            ...input,
            file: e.target.files?.[0],
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);

        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);

            const res = await axios.put(
                `${COMPANY_API_ENDPOINT}/update/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
            console.log("Company ID:", id);
        } catch (error) {
            console.error(error);

            toast.error(
                error?.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     setInput({
    //         name: singleCompany.name || "",
    //         description: singleCompany.description || "",
    //         website: singleCompany.website || "",
    //         location: singleCompany.location || "",
    //         file: null,
    //     });
    // }, [singleCompany]);
    useEffect(() => {
    if (singleCompany) {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: null,
        });
    }
}, [singleCompany]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-4xl mx-auto py-10 px-4">

                <div className="bg-white rounded-2xl shadow-lg border p-8">

                    {/* Header */}
                    <div className="flex items-center gap-5 mb-8">

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                navigate("/admin/companies")
                            }
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>

                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                Company Setup
                            </h1>

                            <p className="text-gray-500 mt-1">
                                Update your company information
                            </p>
                        </div>

                    </div>

                    {/* Form */}
                    <form onSubmit={submitHandler}>

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>
                                <Label className="mb-2 block">
                                    Company Name
                                </Label>

                                <Input
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                    placeholder="Enter company name"
                                />
                            </div>

                            <div>
                                <Label className="mb-2 block">
                                    Company Description
                                </Label>

                                <Input
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    placeholder="Enter description"
                                />
                            </div>

                            <div>
                                <Label className="mb-2 block">
                                    Company Website
                                </Label>

                                <Input
                                    type="text"
                                    name="website"
                                    value={input.website}
                                    onChange={changeEventHandler}
                                    placeholder="https://example.com"
                                />
                            </div>

                            <div>
                                <Label className="mb-2 block">
                                    Company Location
                                </Label>

                                <Input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    placeholder="Enter location"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <Label className="mb-2 block">
                                    Company Logo
                                </Label>

                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={changeFileHandler}
                                />
                            </div>

                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-8 bg-[#6A38C2] hover:bg-[#5529a8]"
                        >
                            {loading
                                ? "Updating..."
                                : "Update Company"}
                        </Button>

                    </form>

                </div>

            </div>
        </div>
    );
};

export default CompanySetup;








// import React, { useState } from 'react'
// import Navbar from '../components_lite/Navbar'
// import { Button } from '../ui/button'
// import { ArrowLeft } from 'lucide-react'
// import { Label } from '../ui/label'
// import { Input } from '../ui/input'
// import { COMPANY_API_ENDPOINT } from '@/utils/data'
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { toast } from "sonner";

// const CompanySetup = () => {

//     const [input, setInput] = useState({
//         name: "",
//         description: "",
//         website: "",
//         location: "",
//         file: null,
//     });

//     const navigate = useNavigate();

//     const [loading, setLoading] = useState(false);

//     const params = useParams();

//     const changeEventHandler = (event) => {
//         setInput({ ...input, [event.target.name]: event.target.value });
//     }

//     const changeFileHandler = (event) => {
//         const file = event.target.files?.[0];
//         setInput({ ...input, file: file });
//     };

//     const submitHandler = async (event) => {
//         event.preventDefault();
//         console.log(input);
//         const formData = new FormData();
//         formData.append("name", input.name);
//         formData.append("description", input.description);
//         formData.append("website", input.website);
//         formData.append("location", input.location);
//         if (input.file) {
//             formData.append("file", input.file);
//         }
//         // console.log("Params:", params);
//         console.log("Params:", params);
//         console.log("Company ID:", params.id);
//         //  console.log(name, description, website, location, file);
//         try {
//             setLoading(true);
//             const res = await axios.put(`${COMPANY_API_ENDPOINT}/update/${params.id}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//                 withCredentials: true,
//             });
//             if (res.data.success) {
//                 toast.success(res.data.message);
//                 navigate("/admin/companies");

//             }
//         } catch (error) {
//             console.error(error);
//             toast.error(error.message || "Something went wrong");
//         }
//         finally {
//             setLoading(false);
//         }
//         // Handle form submission logic here
//     };

//     return (
//         <div>
//             <Navbar />
//             <div className="max-w-xl mx-auto my-10">
//                 <form onSubmit={submitHandler}>
//                     <div className="flex items-center gap-5 p-8">
//                         <Button
//                             className="flex items-center gap-2 text-gray-600 font-semibold"
//                             onClick={() => navigate("/admin/companies")}
//                             variant="outline">
//                             <ArrowLeft />
//                             <span>Back</span>
//                         </Button>
//                         <h1 className="text-xl font-bold text-blue-600 ">Company Setup</h1>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <Label>Company Name</Label>
//                             <Input type="text" name="name" value={input.name} onChange={changeEventHandler}></Input>
//                         </div>
//                         <div>
//                             <Label>Company Description</Label>
//                             <Input type="text" name="description" value={input.description} onChange={changeEventHandler}></Input>
//                         </div>
//                         <div>
//                             <Label>Company Website</Label>
//                             <Input type="text" name="website" value={input.website} onChange={changeEventHandler}></Input>
//                         </div>
//                         <div>
//                             <Label>Company Location</Label>
//                             <Input type="text" name="location" value={input.location} onChange={changeEventHandler}></Input>
//                         </div>
//                         <div>
//                             <Label>Company Logo</Label>
//                             <Input type="file" name="file" accept="image/*" onChange={changeFileHandler}></Input>
//                         </div>
//                     </div>
//                     <Button type="submit" className="w-full mt-8">Update</Button>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default CompanySetup
