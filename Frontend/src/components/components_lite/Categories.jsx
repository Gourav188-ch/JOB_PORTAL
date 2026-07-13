import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const CategoriesList = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "MERN Developer",
    "Data Scientist",
    "DevOps Engineer",
    "Machine Learning Engineer",
    "AI Engineer",
    "Cyber Security Engineer",
    "Product Manager",
    "UI/UX Designer",
    "Graphics Engineer",
    "Graphics Designer",
    "Video Editor",
];

const Categories = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchjobHandler = (query) => {
        console.log("Searching:", query);
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <section className="py-16 bg-gradient-to-b from-white to-slate-50">
            <div className="max-w-6xl mx-auto px-4">

                {/* Heading */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Explore Job Categories
                    </h1>

                    <p className="text-gray-500 mt-3 text-lg">
                        Find opportunities in your favorite domain
                    </p>
                </div>

                {/* Carousel */}
                <Carousel className="w-full max-w-5xl mx-auto">
                    <CarouselContent>

                        {CategoriesList.map((category, index) => (
                            <CarouselItem
                                key={index}
                                className="md:basis-1/2 lg:basis-1/3"
                            >
                                <div className="p-2">
                                    <Button
                                        onClick={() =>
                                            searchjobHandler(category)
                                        }
                                        variant="outline"
                                        className="
                                            w-full
                                            h-14
                                            rounded-xl
                                            text-base
                                            font-semibold
                                            border-2
                                            hover:bg-violet-600
                                            hover:text-white
                                            hover:border-violet-600
                                            transition-all
                                            duration-300
                                            shadow-sm
                                            hover:shadow-lg
                                        "
                                    >
                                        {category}
                                    </Button>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
    );
};

export default Categories;

















// import React from 'react'
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
// import { Button } from '../ui/button';
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setSearchedQuery } from "@/redux/jobSlice";



// const searchJobHandler = (query) => {
//     dispatch(setSearchJobByText(query));
//     // setQuery("");
//     navigate("/browse");

// }

// const Category = [
//     "Frontend Developer",
//     "Backend Developer",
//     "Full Stack Developer",
//     "Data Scientist",
//     "DevOps Engineer",
//     "Machine Learning Engineer",
//     "Artificial Intelligence Engineer",
//     "Cybersecurity Engineer",
//     "Product Manager",
//     "UX/UI Designer",
//     "Graphics Engineer",
//     "Graphics Designer",
//     "Video Editor"
// ];

// const Categories = () => {
//     return (
//         <div className="py-8 -mt-6">

//             {/* Heading */}
//             <div className="mb-6">
//                 <h1 className="text-3xl font-bold text-center text-blue-600">
//                     Categories
//                 </h1>
//                 <p className="text-center text-gray-600 mt-2">
//                     Explore our extensive job market
//                 </p>
//             </div>

//             {/* Carousel */}
//             <Carousel className="w-full max-w-4xl mx-auto">
//                 <CarouselContent>

//                     {Category.map((category, index) => (
//                         <CarouselItem
//                             key={index}
//                             className="md:basis-1/2 lg:basis-1/3 flex justify-center"
//                         >
//                             <Button
//                                 onClick={() => searchJobHandler(category)}
//                                 variant="outline"
//                                 className="rounded-full px-6 py-2 hover:bg-blue-600 hover:text-white transition-all duration-200"
//                             >
//                                 {category}
//                             </Button>
//                         </CarouselItem>
//                     ))}

//                 </CarouselContent>

//                 <CarouselPrevious />
//                 <CarouselNext />
//             </Carousel>

//         </div>
//     )
// }

// export default Categories;