import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";

export const getDashboardStats = async (req, res) => {
    try {
        const userId = req.id;

        // Companies
        const companies = await Company.find({
            userId: userId,
        });

        const companyIds = companies.map(
            (company) => company._id
        );

        // Jobs
        const jobs = await Job.find({
            company: { $in: companyIds },
        })
            .populate("company")
            .sort({ createdAt: -1 });

        const jobIds = jobs.map(
            (job) => job._id
        );

        // Applications
        const applications = await Application.find({
            job: { $in: jobIds },
        })
            .populate("applicant", "fullname email")
            .populate("job", "title")
            .sort({ createdAt: -1 });

        const accepted = applications.filter(
            (app) => app.status === "accepted"
        ).length;

        const rejected = applications.filter(
            (app) => app.status === "rejected"
        ).length;

        const pending = applications.filter(
            (app) => app.status === "pending"
        ).length;

        const successRate =
            applications.length > 0
                ? Math.round(
                    (accepted / applications.length) * 100
                )
                : 0;

        return res.status(200).json({
            success: true,

            stats: {
                totalCompanies: companies.length,
                totalJobs: jobs.length,
                totalApplications: applications.length,
                accepted,
                rejected,
                pending,
                successRate,
            },

            recentJobs: jobs.slice(0, 5),

            recentApplicants:
                applications.slice(0, 5),
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};






























// import { Company } from "../models/company.model.js";
// import { Job } from "../models/job.model.js";
// import { Application } from "../models/application.model.js";

// export const getDashboardStats = async (req, res) => {
//     try {
//         const userId = req.id;

//         // Recruiter ki companies
//         const companies = await Company.find({
//             userId: userId,
//         });

//         const companyIds = companies.map(
//             (company) => company._id
//         );

//         // Recruiter ki jobs
//         const jobs = await Job.find({
//             company: { $in: companyIds },
//         });

//         const jobIds = jobs.map(
//             (job) => job._id
//         );

//         // Applications
//         const applications = await Application.find({
//             job: { $in: jobIds },
//         });

//         const accepted =
//             applications.filter(
//                 (app) => app.status === "accepted"
//             ).length;

//         const rejected =
//             applications.filter(
//                 (app) => app.status === "rejected"
//             ).length;

//         const pending =
//             applications.filter(
//                 (app) => app.status === "pending"
//             ).length;

//         return res.status(200).json({
//             success: true,
//             stats: {
//                 totalCompanies: companies.length,
//                 totalJobs: jobs.length,
//                 totalApplications:
//                     applications.length,
//                 accepted,
//                 rejected,
//                 pending,
//             },
//         });
//     } catch (error) {
//         console.log(error);

//         return res.status(500).json({
//             success: false,
//             message: "Server Error",
//         });
//     }
// };