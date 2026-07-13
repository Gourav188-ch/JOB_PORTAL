import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataurl.js";
import cloudinary from "../utils/cloud.js";


export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false,
            });
        }

        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "Email already exists",
                success: false,
            });
        }
        // convert password to hashes
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url,
            }
        });

        await newUser.save();

        return res.status(200).json({
            message: `Account created successfully ${fullname}`,
            success: true,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error registering user",
            success: false,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        // console.log(email,password,role);
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false,
            });
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            });
        }
        // check role correctly or not match 
        if (user.role !== role) {
            return res.status(400).json({
                message: "You don't have the necessary role to access this resource",
                success: false,
            });
        }
        // generate token 
        const tokenData = {
            userId: user._id,
        };
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        // return res.status(200).cookie("token", token, {
        //     maxAge: 1 * 24 * 60 * 60 * 1000,
        //     httpOnly: true,
        //      sameSite: "Strict",
        // })
        //     .json({
        //         message: `Welcome back ${user.fullname}`, user,
        //         success: true,
        //     });
        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
            .json({
                message: `Welcome back ${user.fullname}`,
                user,
                success: true,
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error login failed",
            success: false,
        });
    }
};

export const logout = (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "logged out successfully",
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error logout ",
            success: false,
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;

        const file = req.file;




        // cloudinary upload
        // const fileUri = getDataUri(file);
        // const cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content);
        const fileUri = getDataUri(file);
        const cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content, {
            resource_type: "raw",
        });



        // let skillsArray;
        // if (skills) {
        //     skillsArray = skills.split(",");
        // }
        let skillsArray = [];

        if (skills) {
            skillsArray = skills.split(",");
        }



        // const skillsArray = skills.split(',');
        const userId = req.id; /// middleware authentication 

        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false,
            });
        }

        // update data base profile
        if (fullname) {
            user.fullname = fullname;
        }
        if (email) {
            user.email = email;
        }
        if (phoneNumber) {
            user.phoneNumber = phoneNumber;
        }
        if (bio) {
            user.profile.bio = bio;
        }
        if (skills) {
            user.profile.skills = skillsArray;
        }

        // resume upload
        if (cloudinaryResponse) {
            user.profile.resume = cloudinaryResponse.secure_url;
            user.profile.resumeOriginalname = file.originalname;
        }

        // user.fullname = fullname;
        // user.email = email;
        // user.phoneNumber = phoneNumber;
        // user.bio = bio;
        // user.skills = skillsArray;

        await user.save();
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200).json({
            message: "profile updated sucessfully",
            user,
            success: true,
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error updating profile",
            success: false,
        });
    }
}
