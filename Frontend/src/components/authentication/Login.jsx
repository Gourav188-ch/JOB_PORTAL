import React, { useEffect, useState } from 'react'
import Navbar from '../components_lite/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Navigate, useNavigate } from 'react-router-dom'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/data.js'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
// import store from '@/redux/store'

const Login = () => {

    const [input, setInput] = useState({

        email: "",
        password: "",
        role: "",

    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, user } = useSelector((store) => store.auth);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.file?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();


        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error);
            const errorMessage = error.response ? error.response.data.message : "An unexpected error occurred.";
            toast.error(errorMessage);
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);

    return (
        <div>
            <Navbar></Navbar>

            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-500 rounded-md p-4 my-10'>

                    <h1 className='font-bold text-xl mb-5 text-center text-blue-600'>Login</h1>


                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="johnDoe@gmail.com" />
                    </div>

                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="**********" />
                    </div>



                    {/* Role Section */}
                    <div className='my-4'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className='flex items-center space-x-2'>
                                <Input
                                    type="radio"
                                    name="role"
                                    value="Student"
                                    className="cursor-pointer"
                                    checked={input.role === 'Student'}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <Input
                                    type="radio"
                                    name="role"
                                    value="Recruiter"
                                    className="cursor-pointer"
                                    checked={input.role === 'Recruiter'}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>


                        </RadioGroup>
                    </div>
                    {
                        loading ? (
                            <div className='flex items-center justify-center my-10'>
                                <div className='spinner-border text-blue-600' role='status'>
                                    <span className='sr-only'>Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <Button className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-800/90 rounded-md">
                                Login
                            </Button>
                        )
                    }

                    {/* <div className="flex justify-center my-3">
                        <Button className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-800/90 rounded-md">
                            Login
                        </Button>
                    </div> */}

                    {/* No Account then register */}
                    <div >
                        <p className='text-grey-500 text-md my-2'>
                            Create new Account?{" "} <Link to="/register" className="text-blue-700">
                                <Button className="px-6 py-2 text-white bg-green-600 hover:bg-green-800/90 rounded-md">
                                    Register
                                </Button>
                            </Link>
                        </p>

                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login
