
import { setSingleCompany } from "@/redux/companyslice";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (companyId) => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchSingleCompany = async () => {

            try {

                setLoading(true);

                const res = await axios.get(
                    `${COMPANY_API_ENDPOINT}/get/${companyId}`,
                    { withCredentials: true }
                );

                console.log("API Response:", res.data);

                if (res.data.success) {

                    dispatch(setSingleCompany(res.data.company));

                }

            } catch (error) {

                console.log(error);

                setError(
                    error?.response?.data?.message ||
                    error.message ||
                    "Failed to fetch jobs"
                );

            } finally {

                setLoading(false);

            }
        };

        fetchSingleCompany();

    }, [dispatch, companyId]);

    return { loading, error };
};

export default useGetCompanyById
