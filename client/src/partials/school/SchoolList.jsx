import React from 'react';
import { Link } from 'react-router-dom';
import { useGetSchoolsQuery } from '../../redux/api/schoolApiSlice';

function SchoolList() {
  const { data: schools, isLoading, isError } = useGetSchoolsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching schools</div>;

  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Schools</h2>
      </header>
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">County</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Information</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {schools.map(school => (
              <tr key={school._id}>
                <td className="px-6 py-4 whitespace-nowrap">{school.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{school.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{school.product}</td>
                <td className="px-6 py-4 whitespace-nowrap">{school.county}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(school.registrationDate).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{school.contactInformation.phone} / {school.contactInformation.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{school.balance}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/schools/${school._id}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-900">View Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SchoolList;
