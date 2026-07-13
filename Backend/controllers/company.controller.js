import { Company } from "../models/company.model.js";
import getDataUri from "../utils/dataurl.js";
import cloudinary from '../utils/cloud.js';

export const registerCompany = async (req, res) => {
    try {
        // const { companyName, description } = req.body;
        // if (!companyName) {
        //     return res.status(400).json({ message: "company name is required", success: false });
        // }



        // ************************************************************
        // const { companyName, description } = req.body;
        // if (!companyName || !description) {
        //     return res.status(400).json({
        //         message: "Company name and description are required",
        //         success: false
        //     });
        // }
        // let company = await Company.findOne({ name: companyName });
        // if (company) {
        //     return res.status(400).json({ message: "Company already exists", success: false });
        // }
        // company = await Company.create({
        //     name: companyName,
        //     description,
        //     userId: req.id
        // })
        // ************************************************************

        const { companyName } = req.body;

        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        }

        let company = await Company.findOne({ name: companyName });

        if (company) {
            return res.status(400).json({
                message: "Company already exists",
                success: false
            });
        }

        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company created sucessfully ",
            company,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}

// sre company return ho rahi hai ke liye -- >

export const getAllCompanies = async (req, res) => {
    try {
        const userId = req.id;

        const companies = await Company.find({ userId });

        return res.status(200).json({
            companies,
            success: true
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// export const getAllCompanies = async (req, res) => {
//     try {
//         const userId = req.id; // loggedin user id 
//         const companines = await Company.find({ userId });
//         if (!companines) {
//             return res.status(404).json({ message: "No compaines found" });
//         }
//         return res.status(200).json({
//             companines,
//             success: true
//         })
//     } catch (error) {
//         console.error(error);
//     }
// }

// get company by id 

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: "comapny not found" })
        }
        return res.status(200).json({ company, success: true })
    } catch (error) {
        console.error(error);
    }
}

// update company deatils 

export const updateCompany = async (req, res) => {
    try {

        const { name, description, website, location } = req.body;

        const updateData = {
            name,
            description,
            website,
            location,
        };

        if (req.file) {
            const fileUri = getDataUri(req.file);

            const cloudResponse =
                await cloudinary.uploader.upload(
                    fileUri.content
                );

            updateData.logo =
                cloudResponse.secure_url;
        }

        const company =
            await Company.findByIdAndUpdate(
                req.params.id,
                updateData,
                {
                    new: true,
                }
            );

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Company updated",
            company,
            success: true,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server Error",
            success: false,
        });
    }
};



// export const updateCompany = async (req, res) => {
//     try {

//         // console.log("REQ PARAMS ID:", req.params.id);
//         // console.log("REQ BODY:", req.body);

//         const { name, description, website, location } = req.body;
//         const file = req.file;

//         const fileUri = getDataUri(file);

//         const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
//         const logo = cloudResponse.secure_url;
//         const updateData = { name, description, website, location , logo};
//         const comapny = await Company.findByIdAndUpdate(req.params.id, updateData, {
//             returnDocument: "after"
//         })
//         if (!comapny) {
//             return res.status(404).json({ message: "Company not found" });
//         }
//         return res.status(200).json({ message: "Company updated", success: true });
//     } catch (error) {
//         console.error(error);
//     }
// };