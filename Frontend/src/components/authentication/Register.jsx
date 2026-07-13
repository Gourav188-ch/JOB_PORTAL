import Navbar from '../components_lite/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/data'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'

const Register = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        password: "",
        role: "",
        file: "",
        phoneNumber: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((store) => store.auth);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("SUBMIT CALLED");
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("password", input.password);
        formData.append("role", input.role);
        formData.append("phoneNumber", input.phoneNumber);

        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
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
    const { user } = useSelector((store) => store.auth);
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);


    return (
        <div>
            <Navbar />

            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler}
                    className='w-1/2 border border-gray-500 rounded-md p-4 my-10'>

                    <h1 className='font-bold text-xl mb-5 text-center text-blue-600'>Register</h1>

                    <div className='my-2'>
                        <Label>FullName</Label>
                        <Input type="text" value={input.fullname} name="fullname" onChange={changeEventHandler} placeholder="John Doe" />
                    </div>

                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="johnDoe@gmail.com" />
                    </div>

                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="**********" />
                    </div>

                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input type="tel" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} placeholder="+1234567890" />
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
                    <div className='flex items-center gap-2'>
                        <Label>Profile Photo</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={changeFileHandler}
                            className="cursor-pointer"
                        />
                    </div>
                    {
                        loading ? (
                            <div className='flex items-center justify-center my-10'>
                                <div className='spinner-border text-blue-600' role='status'>
                                    <span className='sr-only'>Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <Button type="submit" className="px-6 py-2 text-white bg-black hover:bg-black/80 rounded-md">
                                Register
                            </Button>
                        )
                    }
                    {/* <div className="flex justify-center my-3">
                        <Button type="submit" className="px-6 py-2 text-white bg-black hover:bg-black/80 rounded-md">
                            Register
                        </Button>
                    </div> */}

                    {/* already account than login */}
                    <p className='text-grey-500 text-md my-2'>
                        Already have an account? <Link to="/login" className="text-blue-700 font-semibold">Login</Link>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default Register