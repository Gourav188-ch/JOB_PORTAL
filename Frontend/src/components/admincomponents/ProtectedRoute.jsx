import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((store) => store.auth);

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (user.role !== "Recruiter") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;













// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//     const { user } = useSelector((store) => store.auth);
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!user || user.role !== "Recruiter") {
//             navigate("/");
//         }
//     }, [user, navigate]);

//     if (!user || user.role !== "Recruiter") {
//         return null;
//     }

//     return <>{children}</>;
// };

// export default ProtectedRoute;