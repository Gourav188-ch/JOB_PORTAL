import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

const EditJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: "",
    });

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await axios.get(
                    `${JOB_API_ENDPOINT}/get/${id}`,
                    {
                        withCredentials: true,
                    }
                );

                if (res.data.success) {
                    const job = res.data.job;

                    setInput({
                        title: job.title || "",
                        description: job.description || "",
                        requirements:
                            job.requirements?.join(", ") || "",
                        salary: job.salary || "",
                        location: job.location || "",
                        jobType: job.jobType || "",
                        experience: job.experience || "",
                        position: job.position || "",
                    });
                }
            } catch (error) {
                toast.error("Failed to load job");
            }
        };

        fetchJob();
    }, [id]);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await axios.put(
                `${JOB_API_ENDPOINT}/update/${id}`,
                input,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                "Failed to update job"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />

            <div className="flex justify-center my-8">
                <form
                    onSubmit={submitHandler}
                    className="w-full max-w-4xl p-8 border rounded-xl shadow-lg"
                >
                    <h1 className="text-3xl font-bold mb-6 text-center">
                        Edit Job
                    </h1>

                    <div className="grid grid-cols-2 gap-5">

                        <div>
                            <Label>Title</Label>
                            <Input
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="number"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Experience</Label>
                            <Input
                                type="number"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Position</Label>
                            <Input
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div>
                            <Label>Job Type</Label>
                            <Input
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div className="col-span-2">
                            <Label>Requirements</Label>
                            <Input
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                            />
                        </div>

                        <div className="col-span-2">
                            <Label>Description</Label>
                            <Input
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </div>

                    </div>

                    <div className="flex justify-end mt-8">
                        {loading ? (
                            <Button disabled>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Updating...
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="bg-[#6B3AC2] hover:bg-[#5a2fb0]"
                            >
                                Update Job
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditJob;
