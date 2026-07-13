import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["Student", "Recruiter"],
            default: "Student",
            required: true,
        },
        profile: {
            bio: {
                type: String,
            },
            skills: [
                {
                    type: String,
                },
            ],
            resume: {
                type: String, // url to resume file like ex -->"https://cloudinary.com/resume123.pdf"

            },
            resumeOriginalname: {
                type: String, // original name of resume file  ex like -->Ashutosh_Resume.pdf
            },
            company: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Company",
            },
            profilePhoto: {
                type: String, // url to profile photo file 
                default: "",
            },
        },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);


// interview me bona ke liye 
/*

Interview Me Agar Pucha Gaya:

Tum bol sakte ho:

I designed a role-based user schema where users can be either Students or Recruiters.
I implemented nested profile objects to organize resume, skills, and company references efficiently.
I also used ObjectId referencing for relational mapping between User and Company.

🔥 Ye sunke interviewer impress ho jayega.

*/