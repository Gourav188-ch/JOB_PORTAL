import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components_lite/Navbar";
// import { COMPANY_API_ENDPOINT } from "@/utils/data";
import DashboardChart from "./DashboardChart";

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [recentJobs, setRecentJobs] = useState([]);
    const [recentApplicants, setRecentApplicants] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // const res = await axios.get(
                //     "http://localhost:5011/api/dashboard/stats",
                //     {
                //         withCredentials: true,
                //     }
                // );
                const res = await axios.get(
                    "https://job-portal-nc4t.onrender.com/api/dashboard/stats",
                    {
                        withCredentials: true,
                    }
                );

                if (res.data.success) {
                    setStats(res.data.stats);
                    setRecentJobs(res.data.recentJobs);
                    setRecentApplicants(
                        res.data.recentApplicants
                    );
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchStats();
    }, []);

    if (!stats) {
        return (
            <div className="text-center mt-10">
                Loading...
            </div>
        );
    }

    return (
        <>
            <Navbar />

            <div className="max-w-7xl mx-auto py-10 px-4">

                <h1 className="text-4xl font-bold mb-8">
                    Recruiter Dashboard
                </h1>

                {/* Stats Cards */}

                <div className="grid md:grid-cols-3 gap-6">

                    <Card
                        title="Companies"
                        value={stats.totalCompanies}
                    />

                    <Card
                        title="Jobs"
                        value={stats.totalJobs}
                    />

                    <Card
                        title="Applications"
                        value={stats.totalApplications}
                    />

                    <Card
                        title="Accepted"
                        value={stats.accepted}
                        color="text-green-600"
                    />

                    <Card
                        title="Rejected"
                        value={stats.rejected}
                        color="text-red-600"
                    />

                    <Card
                        title="Pending"
                        value={stats.pending}
                        color="text-yellow-500"
                    />

                </div>

                {/* Success Rate */}

                {/* <div className="mt-8 bg-white shadow rounded-xl p-6">
                    <h2 className="text-xl font-semibold">
                        Hiring Success Rate
                    </h2>

                    <h1 className="text-5xl font-bold text-violet-600 mt-4">
                        {stats.successRate}%
                    </h1>
                </div>
                <div className="mt-8">
                    <DashboardChart stats={stats} />
                </div> */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">

                    <div className="bg-white shadow rounded-xl p-6">
                        <h2 className="text-xl font-semibold">
                            Hiring Success Rate
                        </h2>

                        <h1 className="text-5xl font-bold text-violet-600 mt-4">
                            {stats.successRate}%
                        </h1>
                    </div>

                    <DashboardChart stats={stats} />

                </div>

                {/* Recent Jobs */}

                <div className="mt-8 bg-white shadow rounded-xl p-6">

                    <h2 className="text-xl font-semibold mb-4">
                        Recent Jobs
                    </h2>

                    {recentJobs.map((job) => (
                        <div
                            key={job._id}
                            className="border-b py-3"
                        >
                            <h3 className="font-semibold">
                                {job.title}
                            </h3>

                            <p className="text-gray-500 text-sm">
                                {job.location}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Recent Applicants */}

                <div className="mt-8 bg-white shadow rounded-xl p-6">

                    <h2 className="text-xl font-semibold mb-4">
                        Recent Activity
                    </h2>
                    {recentApplicants.map((app) => (
                        <div
                            key={app._id}
                            className="border-b py-4 flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-semibold">
                                    {app?.applicant?.fullname}
                                </h3>

                                <p className="text-gray-500 text-sm">
                                    Applied for {app?.job?.title}
                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                    {new Date(app.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <span
                                className={`px-3 py-1 rounded-full text-sm ${app.status === "accepted"
                                    ? "bg-green-100 text-green-700"
                                    : app.status === "rejected"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-yellow-100 text-yellow-700"
                                    }`}
                            >
                                {app.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

const Card = ({
    title,
    value,
    color = "text-violet-600",
}) => {
    return (
        <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-gray-500">
                {title}
            </h2>

            <h1
                className={`text-5xl font-bold mt-4 ${color}`}
            >
                {value}
            </h1>
        </div>
    );
};

export default Dashboard;






















// import React, { useEffect, useState } from "react";
// import Navbar from "../components_lite/Navbar";
// import axios from "axios";

// const Dashboard = () => {
//     const [stats, setStats] = useState(null);

//     useEffect(() => {
//         const fetchStats = async () => {
//             try {
//                 const res = await axios.get(
//                     "http://localhost:5011/api/dashboard/stats",
//                     {
//                         withCredentials: true,
//                     }
//                 );

//                 if (res.data.success) {
//                     setStats(res.data.stats);
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         fetchStats();
//     }, []);

//     const cards = [
//         {
//             title: "Companies",
//             value: stats?.totalCompanies || 0,
//         },
//         {
//             title: "Jobs",
//             value: stats?.totalJobs || 0,
//         },
//         {
//             title: "Applications",
//             value: stats?.totalApplications || 0,
//         },
//         {
//             title: "Accepted",
//             value: stats?.accepted || 0,
//         },
//         {
//             title: "Rejected",
//             value: stats?.rejected || 0,
//         },
//         {
//             title: "Pending",
//             value: stats?.pending || 0,
//         },
//     ];

//     return (
//         <div>
//             <Navbar />

//             <div className="max-w-7xl mx-auto py-10 px-4">
//                 <h1 className="text-3xl font-bold mb-8">
//                     Recruiter Dashboard
//                 </h1>

//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {cards.map((card, index) => (
//                         <div
//                             key={index}
//                             className="bg-white shadow-lg rounded-xl border p-6 hover:shadow-xl transition"
//                         >
//                             <h2 className="text-gray-500 text-lg">
//                                 {card.title}
//                             </h2>

//                             <h1 className="text-5xl font-bold text-[#6A38C2] mt-4">
//                                 {card.value}
//                             </h1>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;