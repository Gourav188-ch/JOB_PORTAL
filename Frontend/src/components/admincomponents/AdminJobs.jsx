
import React, { useEffect, useState } from 'react';
import Navbar from '../components_lite/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
// import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
// import usegetAllCompanies from '@/hooks/usegetAllCompanies';
import { useDispatch } from 'react-redux';
// import { searchCompanyByText } from '@/redux/companyslice';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';

const AdminJobs = () => {

  useGetAllAdminJobs();
  const navigate = useNavigate();
  // usegetAllCompanies();

  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input])
  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto py-10">

        {/* Header Section */}
        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            Jobs
          </h1>

          <p className="text-gray-500 mt-1">
            Your recent Posted Jobs
          </p>

        </div>

        {/* Search + Button */}
        <div className="flex items-center justify-between mb-6">

          <Input
            className="w-80"
            placeholder="Search Name & Jobs..."
            onChange={(e) => setInput(e.target.value)}
          />

          <Button
            className="bg-[#6B3AC2] hover:bg-[#552d9b]"
            onClick={() => navigate("/admin/jobs/create")}
          >
            Post New Job
          </Button>

        </div>

        {/* Table */}
        {/* <CompaniesTable /> */}
        <AdminJobsTable />

      </div>
    </div>
  );
};

export default AdminJobs;

