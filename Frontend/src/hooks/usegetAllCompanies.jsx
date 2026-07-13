import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { setCompanies } from "@/redux/companyslice";

const usegetAllCompanies = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(
                    `${COMPANY_API_ENDPOINT}/get`,
                    {
                        withCredentials: true,
                    }
                );

                console.log("API Response:", res.data);

                if (res.data.success) {
                    dispatch(
                        setCompanies(res.data.companies)
                    );

                    console.log(
                        "Companies stored in Redux:",
                        res.data.companies
                    );
                }
            } catch (error) {
                console.error("Fetch Companies Error:", error);

                if (error.response) {
                    console.log("Server Error:", error.response.data);
                }
            }
        };

        fetchCompanies();
    }, [dispatch]);
};

export default usegetAllCompanies;








// import { useEffect } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { COMPANY_API_ENDPOINT } from "@/utils/data";
// import { setCompanies } from "@/redux/companyslice";

// const usegetAllCompanies = () => {
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const fetchCompanies = async () => {
//             try {
//                 const res = await axios.get(
//                     `${COMPANY_API_ENDPOINT}/get`,
//                     {
//                         withCredentials: true,
//                     }
//                 );

//                 console.log("API Response:", res.data);

//                 if (res.data.success) {
//                     dispatch(
//                         setCompanies(res.data.companies)
//                     );
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         fetchCompanies();
//     }, []);
// };

// export default usegetAllCompanies;




// import { setCompanies } from "@/redux/companyslice";
// import { COMPANY_API_ENDPOINT } from "@/utils/data";
// import axios from "axios";
// import { useState } from "react";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

// const usegetAllCompanies = () => {

//     const dispatch = useDispatch();

//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // console.log("Fetch data :",res.data);

//     useEffect(() => {

//         const fetchCompany = async () => {

//             try {

//                 setLoading(true);

//                 const res = await axios.get(
//                     `${COMPANY_API_ENDPOINT}/get`,
//                     { withCredentials: true }
//                 );

//                 console.log("API Response:", res.data);
//                 console.log("Fetch data :",res.data);

//                 if (res.data.success) {

//                     dispatch(setCompanies(res.data.companies));

//                 }

//             } catch (error) {

//                 console.log(error);

//                 setError(
//                     error?.response?.data?.message ||
//                     error.message ||
//                     "Failed to fetch jobs"
//                 );

//             } finally {

//                 setLoading(false);

//             }
//         };

//         fetchCompany();

//     }, [dispatch]);

//     return { loading, error };
// };


// export default usegetAllCompanies
