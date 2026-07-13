import { setAllJobs } from "../redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSingleJob = (jobId) => {

    const dispatch = useDispatch();

    // useEffect(() => {

    //     const fetchSingleJob = async () => {

    //         try {

    //             const res = await axios.get(
    //                 `${JOB_API_ENDPOINT}/get/${jobId}`,
    //                 { withCredentials: true }
    //             );

    //             console.log("API Response", res.data);

    //             if (res.data.success) {

    //                 console.log("Dispatching Jobs:", res.data.jobs);

    //                 dispatch(setSingleJob(res.data.jobs));
    //             }

    //         } catch (error) {

    //             console.log(error);
    //         }
    //     };

    //     fetchSingleJob();

    // }, [dispatch]);
};

export default useGetSingleJob;

