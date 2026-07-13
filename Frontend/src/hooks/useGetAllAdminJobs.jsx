
import { setAllAdminJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { JOB_API_ENDPOINT } from "@/utils/data";

const useGetAllAdminJobs = () => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchAllAdminJobs = async () => {

            try {

                setLoading(true);

                const res = await axios.get(
                    `${JOB_API_ENDPOINT}/getadminjobs`,
                    { withCredentials: true }
                );

                console.log("API Response:", res.data);

                // if (res.data.success) {

                //     dispatch(setAllAdminJobs(res.data.jobs));

                // }
                if (res.data.status) {

                    dispatch(setAllAdminJobs(res.data.jobs));

                }
                console.log("Jobs From API:", res.data.jobs);

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

        fetchAllAdminJobs();

    }, [dispatch]);

    return { loading, error };
};

export default useGetAllAdminJobs;
