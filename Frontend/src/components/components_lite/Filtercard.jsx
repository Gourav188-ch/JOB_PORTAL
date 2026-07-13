import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi",
      "Mumbai",
      "Kolhapur",
      "Pune",
      "Bangalore",
      "Hyderabad",
      "Chennai",
      "Remote",
    ],
  },
  {
    filterType: "Technology",
    array: [
      "Mern",
      "React",
      "Data Scientist",
      "Fullstack",
      "Node",
      "Python",
      "Java",
      "Frontend",
      "Backend",
      "Mobile",
      "Desktop",
    ],
  },
  {
    filterType: "Experience",
    array: [
      "0-3 years",
      "3-5 years",
      "5-7 years",
      "7+ years",
    ],
  },
  {
    filterType: "Salary",
    array: [
      "0-50k",
      "50k-100k",
      "100k-200k",
      "200k+",
    ],
  },
];

const Filter = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full bg-white rounded-2xl border shadow-md p-5">

      {/* Heading */}
      <h1 className="text-xl font-bold text-gray-800">
        Filter Jobs
      </h1>

      <p className="text-sm text-gray-500 mt-1">
        Find jobs based on your preferences
      </p>

      <hr className="my-4" />

      <RadioGroup
        value={selectedValue}
        onValueChange={handleChange}
      >
        {filterData.map((data, index) => (
          <div key={index} className="mb-5">

            <h2 className="font-semibold text-base text-gray-800 mb-2">
              {data.filterType}
            </h2>

            <div className="space-y-2">
              {data.array.map((item, indx) => {
                const itemId = `filter-${index}-${indx}`;

                return (
                  <div
                    key={itemId}
                    className="flex items-center gap-2"
                  >
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                    />

                    <label
                      htmlFor={itemId}
                      className="text-sm text-gray-700 cursor-pointer hover:text-violet-600 transition-colors"
                    >
                      {item}
                    </label>
                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </RadioGroup>

      {/* Clear Filter Button */}
      {selectedValue && (
        <button
          onClick={() => setSelectedValue("")}
          className="w-full mt-4 bg-red-50 text-red-600 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition"
        >
          Clear Filter
        </button>
      )}
    </div>
  );
};

export default Filter;





















// import React from 'react'
// import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

// const filterData = [
//   {
//     filterType: "Location",
//     array: [
//       "Delhi",
//       "Mumbai",
//       "Kolhapur",
//       "Pune",
//       "Bangalore",
//       "Hyderabad",
//       "Chennai",
//       "Remote",
//     ],
//   },
//   {
//     filterType: "Industry",
//     array: [
//       "Mern",
//       "React",
//       "Data Scientist",
//       "Fullstack",
//       "Node",
//       "Python",
//       "Java",
//       "Frontend",
//       "Backend",
//       "Mobile",
//       "Desktop"
//     ],
//   },
//   {
//     filterType: "Experience",
//     array: [
//       "0-3 years",
//       "3-5 years",
//       "5-7 years",
//       "7+ years"
//     ],
//   },
//   {
//     filterType: "Salary",
//     array: [
//       "0-50k",
//       "50k-100k",
//       "100k-200k",
//       "200k+"
//     ],
//   },
// ]

// const Filter = () => {
//   return (
//     <div className='w-full bg-white rounded-xl p-5 shadow-md border border-gray-200'>

//       {/* Heading */}
//       <h1 className='font-bold text-2xl'>
//         Filter Jobs
//       </h1>

//       <hr className='mt-3 mb-5' />

//       {/* Filter Sections */}
//       {
//         filterData.map((data, index) => (

//           <div key={index} className='mb-6'>

//             <h2 className='font-bold text-lg mb-3'>
//               {data.filterType}
//             </h2>

//             {/* Separate RadioGroup for each category */}
//             <RadioGroup className="space-y-2">

//               {
//                 data.array.map((item, idx) => {

//                   const itemId = `${data.filterType}-${idx}`

//                   return (
//                     <div
//                       key={idx}
//                       className='flex items-center space-x-3'
//                     >

//                       <RadioGroupItem
//                         value={item}
//                         id={itemId}
//                       />

//                       <label
//                         htmlFor={itemId}
//                         className='text-gray-700 cursor-pointer'
//                       >
//                         {item}
//                       </label>

//                     </div>
//                   )
//                 })
//               }

//             </RadioGroup>

//           </div>

//         ))
//       }

//     </div>
//   )
// }

// export default Filter