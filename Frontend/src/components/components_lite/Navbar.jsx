
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data";
import { setUser } from "@/redux/authSlice";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
    // const user = true;
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            const response = await axios.post(`${USER_API_ENDPOINT}/logout`, { withCredentials: true });
            if (response.data.success) {
                toast.success("Logout successful")
                dispatch(setUser(null));
                navigate("/");
                toast.success("Logout successful");
            }
            // else{
            //     toast.error("Logout failed");
            // }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-white shadow'>
            <div className='flex items-center justify-between mx-auto max-w-7xl p-4'>

                <h1 className='text-2xl font-bold'>
                    <span className="text-[#FA4F09]">Job</span>
                    <span className='text-[#6B3AC2]'>Portal</span>
                </h1>

                <div className="flex items-center gap-6">
                    <ul className='flex font-medium items-center gap-6'>
                        {
                            user && user.role === 'Recruiter' ? (
                                <>
                                    <li>
                                        <NavLink
                                            to="/admin/dashboard"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "text-[#6B3AC2] font-bold border-b-2 border-[#6B3AC2] pb-1"
                                                    : "text-gray-700 hover:text-[#6B3AC2] transition-all"
                                            }
                                        >
                                            Dashboard
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="/admin/companies"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "text-[#6B3AC2] font-bold border-b-2 border-[#6B3AC2] pb-1"
                                                    : "text-gray-700 hover:text-[#6B3AC2] transition-all"
                                            }
                                        >
                                            Companies
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="/admin/jobs"
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "text-[#6B3AC2] font-bold border-b-2 border-[#6B3AC2] pb-1"
                                                    : "text-gray-700 hover:text-[#6B3AC2] transition-all"
                                            }
                                        >
                                            Jobs
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to={"/Home"}>Home</Link>
                                    </li>

                                    <li>
                                        <Link to={"/Browse"}>Browse</Link>
                                    </li>

                                    <li>
                                        <Link to={"/Jobs"}>Jobs</Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className="flex item-center gap-5">
                                <Link to={"/login"}>
                                    {" "}
                                    <Button variant="outline">Login</Button>
                                </Link>
                                <Link to={"/register"}>
                                    {" "}
                                    <Button className="bg-red-600 hover:bg-red-800">Register</Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                                        <AvatarImage src={user?.profile?.profilePhoto} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>

                                </PopoverTrigger>
                                <PopoverContent className='w-80'>
                                    <div className="flex item-center gap-4 space-y-2">
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src={user?.profile?.profilePhoto} />
                                        </Avatar>
                                        <div>
                                            <h3 className="font-medium">{user?.fullname}</h3>
                                            <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                                        </div>
                                    </div>


                                    {/* es se profile ka option nahi aaye ga recrutier bale select karne per  */}

                                    <div className="flex flex-col my-2 text-grey-600">
                                        {
                                            user && user.role === "Student" && (
                                                <div className="flex w-fit item text-grey-600 gap-4">
                                                    <User2></User2>
                                                    <Button variant="link" className='cursor-pointer'>
                                                        <Link to={"/Profile"}>Profile</Link></Button>
                                                </div>
                                            )
                                        }

                                        {/* <div className="flex flex-col my-2 text-grey-600">
                                        <div className="flex w-fit item text-grey-600 gap-4">
                                            <User2></User2>
                                            <Button variant="link" className='cursor-pointer'> <Link to={"/Profile"}>Profile</Link></Button>
                                        </div> */}


                                        <div className="flex w-fit item text-grey-600 gap-4">
                                            <LogOut></LogOut>
                                            <Button onClick={logoutHandler} variant="link" className='cursor-pointer'>Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>

            </div>
        </div>
    )
}

export default Navbar

