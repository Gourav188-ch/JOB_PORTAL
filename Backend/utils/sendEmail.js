import nodemailer from "nodemailer";

const sendEmail = async (
    to,
    subject,
    text,
    html
) => {
    try {
        const transporter =
            nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html,
        });

        console.log(
            "Email Sent Successfully"
        );
    } catch (error) {
        console.log(
            "Email Error:",
            error
        );
    }
};

export default sendEmail;




























// import nodemailer from "nodemailer";

// const sendEmail = async (to, subject, text) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//         });

//         await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to,
//             subject,
//             text,
//         });

//         console.log("Email Sent Successfully");
//     } catch (error) {
//         console.log("Email Error:", error);
//     }
// };

// export default sendEmail;