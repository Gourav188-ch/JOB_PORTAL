// import React, { useEffect } from "react";
import React, { useEffect, useState } from "react";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";
import { APPLICATION_API_ENDPOINT } from "@/utils/data";
import Navbar from "../components_lite/Navbar";

const Applicants = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const { applicants } = useSelector(
        (store) => store.application
    );

    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(
                    `${APPLICATION_API_ENDPOINT}/${id}/applicants`,
                    {
                        withCredentials: true,
                    }
                );

                console.log("Applicants Response:", res.data);

                if (res.data.success) {
                    dispatch(setAllApplicants(res.data.job));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchAllApplicants();
    }, [id, dispatch]);

    return (
        <div className="max-w-7xl mx-auto">

            <div className="flex justify-between items-center my-5">

                <h1 className="font-bold text-2xl">
                    Applicants (
                    {applicants?.applications?.length || 0}
                    )
                </h1>

                <input
                    type="text"
                    placeholder="Search Applicant..."
                    value={searchText}
                    onChange={(e) =>
                        setSearchText(e.target.value)
                    }
                    className="
                border
                rounded-md
                px-3
                py-2
                w-72
            "
                />

            </div>

            <ApplicantsTable searchText={searchText} />

        </div>
        
    );
};

export default Applicants;












// <div>
        //     <Navbar />

        //     {/* <div className="max-w-7xl mx-auto">
        //         <h1 className="font-bold text-2xl my-5">
        //             Applicants (
        //             {applicants?.applications?.length || 0}
        //             )
        //         </h1>

        //         <ApplicantsTable />
        //     </div> */}
        //     <div className="flex justify-between items-center my-5">

        //         <h1 className="font-bold text-2xl">
        //             Applicants (
        //             {applicants?.applications?.length || 0}
        //             )
        //         </h1>

        //         <input
        //             type="text"
        //             placeholder="Search Applicant..."
        //             value={searchText}
        //             onChange={(e) =>
        //                 setSearchText(e.target.value)
        //             }
        //             className="
        //     border
        //     rounded-md
        //     px-3
        //     py-2
        //     w-72
        // "
        //         />

        //     </div>

        //     <ApplicantsTable searchText={searchText} />
        // </div>














// import React, { useEffect } from "react";
// import ApplicantsTable from "./ApplicantsTable";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { setAllApplicants } from "@/redux/applicationSlice";
// import { APPLICATION_API_ENDPOINT } from "@/utils/data";
// import Navbar from "../components_lite/Navbar";

// const Applicants = () => {
//     const params = useParams();
//     const dispatch = useDispatch();
//     const { applicants } = useSelector((store) => store.application);

//     useEffect(() => {
//         const fetchAllApplicants = async () => {
//             try {
//                 const res = await axios.get(
//                     `${APPLICATION_API_ENDPOINT}/${params.id}/applicants`,
//                     { withCredentials: true }
//                 );
//                 dispatch(setAllApplicants(res.data.job));
//                 console.log(res.data);
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         fetchAllApplicants();
//     }, []);
//     return (
//         <div>
//             <Navbar />
//             <div className="max-w-7xl mx-auto">
//                 <h1 className="font-bold text-xl my-5">
//                     Applicants {applicants?.applications?.length}
//                 </h1>
//                 <ApplicantsTable />
//             </div>
//         </div>
//     );
// };

// export default Applicants;
