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
        <table className="table-fixed w-full dark:text-slate-300">
          <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
            <tr>
              <th className="p-2 w-1/6">Name</th>
              <th className="p-2 w-1/6">Type</th>
              <th className="p-2 w-1/6">Product</th>
              <th className="p-2 w-1/6">County</th>
              <th className="p-2 w-1/6">Balance</th>
              <th className="p-2 w-1/6">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
            {schools.map(school => (
              <tr key={school._id}>
                <td className="p-2">{school.name}</td>
                <td className="p-2">{school.type}</td>
                <td className="p-2">{school.product}</td>
                <td className="p-2">{school.county}</td>
                <td className="p-2">{school.schoolBalance}</td>
                <td className="p-2">
                  <Link to={`/schools/${school._id}`} className="text-sm text-white bg-emerald-500 hover:bg-emerald-600 rounded px-4 py-2 inline-block">View Details</Link>
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
