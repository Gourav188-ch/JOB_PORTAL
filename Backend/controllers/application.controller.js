import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import sendEmail from "../utils/sendEmail.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(404).json({ message: "invalid job id", success: false });
        }
        // check if the user is already has applied for this job 
        // const existingApplication = await Application.findOne({
        //     job: jobId,
        //     applicant: userId,
        // })
        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: userId,
        });

        // console.log("JOB ID:", jobId);

        // console.log("USER ID:", userId);

        // console.log("EXISTING APPLICATION:", existingApplication);

        // if (existingApplication) {
        //     return res
        //         .status(400)
        //         .json({ message: "you have already applied for this job", success: false });
        // }
        // check if the job exists or not 

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "job not found", success: false });
        }
        // create a new application 
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({ message: "Application submitted", success: true });


    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: "job",
                options: { sort: { createdAt: -1 } },
                populate: { path: "company", options: { sort: { createdAt: -1 } } },
            });
        if (!application) {
            return res.status(404).json({ message: "No applications found", success: false });
        }

        return res.status(200).json({ application, success: true })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
}

export const getApplicants = async (req, res) => { // kitne user apply kiye hai us ko dekhene ke liye es ko bana rahe hai
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: { path: "applicant", options: { sort: { createdAt: -1 } } },
        })
        if (!job) {
            return res.status(404).json({ message: "job not found ", success: false });
        }
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
}


export const updateStatus = async (req, res) => {
    try {
        console.log("STEP 1");

        const { status } = req.body;
        const applicationId = req.params.id;

        console.log("STEP 2", status, applicationId);

        const application = await Application.findById(applicationId);

        console.log("STEP 3");

        application.status = status.toLowerCase();

        await application.save();

        console.log("STEP 4");

        return res.status(200).json({
            success: true,
            message: "Updated"
        });

    } catch (error) {
        console.log("ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// export const updateStatus = async (req, res) => {
//     try {
//         const { status } = req.body;
//         const applicationId = req.params.id;
//         if (!status) {
//             return res.status(400).json({ message: "Invalid status", success: false });
//         }
//         // find the application by applicant id 
//         const application = await Application.findById({ _id: applicationId });
//         if (!application) {
//             return res.status.json({ message: "Application not found", success: false });
//         }

//         // update the status 
//         application.status = status.toLowerCase();
//         await application.save();

//         return res.status(200).json({ message: "Application status successfully updated", success: true });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error", success: false });
//     }
// }

// export const updateStatus = async (req, res) => {

//     try {

//         const { status } = req.body;

//         const applicationId = req.params.id;

//         if (!status) {

//             return res.status(400).json({
//                 message: "Invalid status",
//                 success: false
//             });
//         }

//         // find application
//         const application = await Application.findById(applicationId);

//         if (!application) {

//             return res.status(404).json({
//                 message: "Application not found",
//                 success: false
//             });
//         }

//         // update status
//         application.status = status.toLowerCase();

//         await application.save();

//         return res.status(200).json({
//             message: "Application status updated successfully",
//             success: true
//         });

//     } catch (error) {

//         console.error(error);

//         return res.status(500).json({
//             message: "Server error",
//             success: false
//         });
//     }
// };
// export const updateStatus = async (req, res) => {
//     try {
//         const { status } = req.body;
//         const applicationId = req.params.id;

//         console.log("Application ID:", applicationId);

//         const application = await Application.findById(applicationId)
//             .populate("applicant")
//             .populate("job");

//         console.log("Before Update:", application);

//         application.status = status.toLowerCase();

//         await application.save();



//         const applicantEmail =
//             application.applicant.email;

//         const applicantName =
//             application.applicant.fullname;

//         const jobTitle =
//             application.job.title;

//         // if (status.toLowerCase() === "accepted") {

//         //     await sendEmail(
//         //         applicantEmail,

//         //         "Application Accepted 🎉",

//         //         `Congratulations! Your application for ${jobTitle} has been accepted.`,

//         //         `
//         // <div style="
//         //     max-width:600px;
//         //     margin:auto;
//         //     padding:30px;
//         //     border:1px solid #ddd;
//         //     border-radius:12px;
//         //     font-family:Arial,sans-serif;
//         // ">

//         //     <h1 style="color:green;">
//         //         🎉 Congratulations!
//         //     </h1>

//         //     <p>
//         //         Hello <b>${applicantName}</b>,
//         //     </p>

//         //     <p>
//         //         Your application for
//         //         <b>${jobTitle}</b>
//         //         has been accepted.
//         //     </p>

//         //     <div style="
//         //         background:#dcfce7;
//         //         padding:15px;
//         //         border-radius:8px;
//         //         margin-top:15px;
//         //     ">
//         //         Our recruitment team will contact you soon.
//         //     </div>

//         //     <p style="margin-top:20px;">
//         //         Best Regards,<br/>
//         //         Job Portal Team
//         //     </p>

//         // </div>
//         // `
//         //     );
//         // }

//         // if (status.toLowerCase() === "rejected") {

//         //     await sendEmail(
//         //         applicantEmail,

//         //         "Application Update",

//         //         `Your application for ${jobTitle} was not selected.`,

//         //         `
//         // <div style="
//         //     max-width:600px;
//         //     margin:auto;
//         //     padding:30px;
//         //     border:1px solid #ddd;
//         //     border-radius:12px;
//         //     font-family:Arial,sans-serif;
//         // ">

//         //     <h1 style="color:#dc2626;">
//         //         Application Update
//         //     </h1>

//         //     <p>
//         //         Hello <b>${applicantName}</b>,
//         //     </p>

//         //     <p>
//         //         Thank you for applying for
//         //         <b>${jobTitle}</b>.
//         //     </p>

//         //     <p>
//         //         Unfortunately your application
//         //         was not selected for the next round.
//         //     </p>

//         //     <div style="
//         //         background:#fee2e2;
//         //         padding:15px;
//         //         border-radius:8px;
//         //         margin-top:15px;
//         //     ">
//         //         We encourage you to apply
//         //         for future opportunities.
//         //     </div>

//         //     <p style="margin-top:20px;">
//         //         Best Regards,<br/>
//         //         Job Portal Team
//         //     </p>

//         // </div>
//         // `
//         //     );
//         // }









//         console.log("After Update:", application);

//         return res.status(200).json({
//             message: "Application status updated successfully",
//             success: true
//         });

//     }
//     // catch (error) {
//     //     console.log(error);
//     // }
//     catch (error) {
//         console.log(error);

//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };


// export const scheduleInterview = async (req, res) => {
//     try {

//         console.log("SCHEDULE API HIT");
//         console.log("BODY:", req.body);
//         console.log("PARAMS:", req.params);

//         const { interviewDate, interviewLink } = req.body;

//         const applicationId = req.params.id;

//         const application = await Application.findById(applicationId)
//             .populate("applicant")
//             .populate("job");

//         if (!application) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Application not found"
//             });
//         }

//         // application.interviewDate = interviewDate;
//         // application.interviewLink = interviewLink;

//         // await application.save();
//         application.interviewDate = interviewDate;
//         application.interviewLink = interviewLink;
//         application.status = "schedule interview";

//         await application.save();

//         // await sendEmail(
//         //     application.applicant.email,

//         //     "Interview Scheduled 🎉",

//         //     "Interview Scheduled",

//         //     `
//         //     <div style="
//         //         max-width:600px;
//         //         margin:auto;
//         //         padding:30px;
//         //         border:1px solid #ddd;
//         //         border-radius:12px;
//         //         font-family:Arial,sans-serif;
//         //     ">

//         //         <h1 style="color:#6B3AC2;">
//         //             Interview Scheduled 🎉
//         //         </h1>

//         //         <p>
//         //             Hello <b>${application.applicant.fullname}</b>,
//         //         </p>

//         //         <p>
//         //             Your interview for
//         //             <b>${application.job.title}</b>
//         //             has been scheduled.
//         //         </p>

//         //         <p>
//         //             <b>Date:</b>
//         //             ${new Date(interviewDate).toLocaleString()}
//         //         </p>

//         //         <p>
//         //             <b>Meeting Link:</b><br/>
//         //             <a href="${interviewLink}">
//         //                 ${interviewLink}
//         //             </a>
//         //         </p>

//         //         <p>
//         //             Best Regards,<br/>
//         //             Job Portal Team
//         //         </p>

//         //     </div>
//         //     `
//         // );

//         return res.status(200).json({
//             success: true,
//             message: "Interview Scheduled"
//         });

//     } catch (error) {

//         console.log(error);

//         return res.status(500).json({
//             success: false,
//             message: "Server Error"
//         });
//     }
// };

export const scheduleInterview = async (req, res) => {
    try {
        console.log("STEP 1");

        const { interviewDate, interviewLink } = req.body;
        const applicationId = req.params.id;

        console.log("STEP 2");

        const application = await Application.findById(applicationId)
            .populate("applicant")
            .populate("job");

        console.log("STEP 3", application);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        application.interviewDate = interviewDate;
        application.interviewLink = interviewLink;
        application.status = "schedule interview";
        console.log("STEP 4");

        await application.save();

        console.log("STEP 5 SAVE DONE");

        // TEMPORARY
        return res.status(200).json({
            success: true,
            message: "Interview Scheduled"
        });

        // await sendEmail(...);
        // console.log("STEP 6");

        // console.log("STEP 4");

        // await application.save();

        // console.log("STEP 5");

        // // await sendEmail(...);

        // console.log("STEP 6");

        // return res.status(200).json({
        //     success: true,
        //     message: "Interview Scheduled"
        // });

    } catch (error) {
        console.log("SCHEDULE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};