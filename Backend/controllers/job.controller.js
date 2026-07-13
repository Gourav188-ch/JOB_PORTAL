import { Job } from "../models/job.model.js";

// Admin posting job
export const postJob = async (req, res) => {
    try {

        console.log("BODY:", req.body);
        console.log("USER:", req.id);

        const {
            title,
            description,
            requirements,
            location,
            salary,
            jobType,
            position,
            companyId,
            experience
        } = req.body;

        const userId = req.id;

        // Validation
        if (
            !title ||
            !description ||
            !requirements ||
            !salary ||
            !location ||
            !jobType ||
            !experience ||
            !position ||
            !companyId
        ) {
            return res.status(400).json({
                message: "Please fill all fields",
                success: false
            });
        }

        // Create Job
        const job = await Job.create({
            title,
            description,

            // Convert string to array
            requirements: requirements.split(","),

            location,
            salary: Number(salary),
            jobType,
            position,

            // Company Reference
            company: companyId,

            experience: Number(experience),

            created_by: userId,
        });

        return res.status(201).json({
            message: "Job posted successfully",
            success: true,
            job
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
};


// Users - Get All Jobs
export const getAllJobs = async (req, res) => {
    try {

        const keyword = req.query.keyword?.trim() || "";

        const query = {
            $or: [
                {
                    title: {
                        $regex: keyword,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: keyword,
                        $options: "i"
                    }
                },
            ]
        };

        // Fetch Jobs
        // const jobs = await Job.find(query)
        //     .sort({ createdAt: -1 });
        const jobs = await Job.find(query)
            .populate("company")
            .sort({ createdAt: -1 });


        // Check jobs exist

        // if (jobs.length === 0) {
        //     return res.status(404).json({
        //         message: "No jobs found",
        //         success: false
        //     });
        // }

        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
};


// Users - Get Job By ID
export const getJobById = async (req, res) => {
    try {

        const jobId = req.params.id;

        const job = await Job.findById(jobId)
            .populate("applications");

        // Check job exist
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
};


// Admin Jobs
// export const getAdminJobs = async (req, res) => {
//     try {
//         const adminId = req.id;

//         const jobs = await Job.find({
//             created_by: adminId
//         }).populate("company");

//         return res.status(200).json({
//             jobs,
//             success: true
//         });

//     } catch (error) {
//         console.error(error);

//         return res.status(500).json({
//             message: "Server Error",
//             success: false
//         });
//     }
// };




export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: "company",
            sort: { createdAt: -1 },
        });
        if (!jobs) {
            return res.status(404).json({ message: "No jobs found", status: false });
        }
        return res.status(200).json({ jobs, status: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error", status: false });
    }
}



// post job ko update ke liye 
export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;

        const {
            title,
            description,
            requirements,
            location,
            salary,
            experience,
            jobType,
            position,
        } = req.body;

        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            {
                title,
                description,
                requirements: requirements.split(","),
                location,
                salary: Number(salary),
                experience: Number(experience),
                jobType,
                position,
            },
            { new: true }
        );

        if (!updatedJob) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Job updated successfully",
            job: updatedJob,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
// Postedjob delete ke liye 

export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        await Job.findByIdAndDelete(jobId);

        return res.status(200).json({
            success: true,
            message: "Job deleted successfully",
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};







// export const getAdminJobs = async (req, res) => {
//     try {

//         const adminId = req.id;

//         const jobs = await Job.find({
//             created_by: adminId
//         }).populate("company");

//         // Check jobs exist
//         if (jobs.length === 0) {
//             return res.status(404).json({
//                 message: "No jobs found",
//                 success: false
//             });
//         }

//         return res.status(200).json({
//             jobs,
//             success: true
//         });

//     } catch (error) {

//         console.error(error);

//         return res.status(500).json({
//             message: "Server Error",
//             success: false
//         });
//     }
// };














// import { Job } from "../models/job.model.js";

// // admin posting job
// export const postJob = async (req, res) => {
//     try {
//         console.log("BODY:", req.body);
//         console.log("USER:", req.id);

//         const { title,
//             description,
//             requirements,
//             location,
//             salary,
//             jobType,
//             position,
//             companyId,
//             experience } = req.body;
//         const userId = req.id;
//         if (
//             !title ||
//             !description ||
//             !requirements ||
//             !salary ||
//             !location ||
//             !jobType ||
//             !experience ||
//             !position ||
//             !companyId
//         ) {
//             return res.status(400).json({ message: "please fill all the fields", status: false });
//         }
//         const job = await Job.create({
//             title,
//             description,
//             requirements: requirements,// .split(",")
//             location,
//             salary: Number(salary),
//             jobType,
//             position,
//             company: companyId,
//             // experienceLevel: experience,
//             experience: Number(experience),
//             created_by: userId,
//         })
//         return res.status(201).json({ message: "Job posted successfully", status: true, job });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Server error", status: false });
//     }
// }

// // Users ke liye

// export const getAllJobs = async (req, res) => {
//     try {
//         // console.log("BODY:", req.body);
//         // console.log("USER:", req.id);

//         const keyword = req.query.keyword || "";
//         const query = {
//             $or: [
//                 { title: { $regex: keyword, $options: "i" } },
//                 { description: { $regex: keyword, $options: "i" } },
//                 // { requirements: { $regex: keyword, $option: "i" } },
//                 // { location: { $regex: keyword, $option: "i" } },
//                 // { jobType: { $regex: keyword, $option: "i" } },
//                 // { position: { $regex: keyword, $option: "i" } }
//             ],

//         };
//         const jobs = await Job.find(query).populate({
//             path: "company",
//         }).sort({ createdAt: -1 });
//         if (!jobs) {
//             return res.status(404).json({ message: "No job found", status: false });
//         }
//         return res.status(200).json({ jobs, status: true });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Server error", status: false });
//     }
// };

// // users
// export const getJobById = async (req, res) => {
//     try {
//         const jobId = req.params.id;
//         const job = await Job.findById(jobId);
//         if (!job) {
//             return res.status(404).json({ message: "job not found", status: false });
//         }
//         return res.status(200).json({ job, status: true });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Server error", status: false });
//     }
// }

// // Admin job created

// export const getAdminJobs = async (req, res) => {
//     try {
//         const adminId = req.id;
//         const jobs = await Job.find({ created_by: adminId });
//         if (!jobs) {
//             return res.status(404).json({ message: "No jobs found", status: false });
//         }
//         return res.status(200).json({ jobs, status: true });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Server Error", status: false });
//     }
// }

