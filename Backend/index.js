import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoutes from "./routes/job.route.js";
import applicationRoutes from "./routes/application.route.js";
import dashboardRoute from "./routes/dashboard.route.js";

dotenv.config();

const app = express();

// CORS Configuration
const corsOption = {
  origin: [
    "http://localhost:5173",
    "https://job-portal-1-8td9.onrender.com"
  ],
  credentials: true,
};

app.use(cors(corsOption));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 5001;

// APIs
app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/dashboard", dashboardRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});


























// import cookieParser from "cookie-parser";
// import express from "express";
// import dotenv from "dotenv"
// import cors from "cors";
// import connectDB from "./utils/db.js";
// import userRoute from "./routes/user.route.js";
// import companyRoute from "./routes/company.route.js"
// import jobRoutes from "./routes/job.route.js"
// import applicationRoutes from "./routes/application.route.js"
// import dashboardRoute from "./routes/dashboard.route.js";
// dotenv.config({});

// const app = express();
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));




// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // const corsOption = {
// //     origin: ["http://localhost:5173"],
// //     credentials: true,
// // };
// // app.use(cors(corsOption));


// const PORT = process.env.PORT || 5001;

// // api's
// app.use("/api/user", userRoute);
// app.use("/api/company", companyRoute);
// app.use("/api/job", jobRoutes);
// app.use("/api/application", applicationRoutes);
// app.use("/api/dashboard", dashboardRoute);


// app.listen(PORT, () => {
//   connectDB();
//   console.log(`Server is running on port ${PORT}`);
// })