import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetSchoolByIdQuery } from '../../redux/api/schoolApiSlice';

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function SchoolDetails() {
  const { id } = useParams();
  const { data: schoolData, isLoading, isError } = useGetSchoolByIdQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching school data</div>;

  const school = schoolData.school;

  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 p-5">
      {school && (
        <>
          <h2 className="font-semibold text-slate-800 dark:text-slate-100 text-2xl mb-4">{school.name}</h2>
          <div className="mb-4">
            <p><strong>Type:</strong> {school.type}</p>
            <p><strong>Product:</strong> {school.product}</p>
            <p><strong>County:</strong> {school.county}</p>
            <p><strong>Registration Date:</strong> {formatDate(school.registrationDate)}</p>
            <p><strong>Contact:</strong> {school.contactPhone}</p>
            <p><strong>Balance:</strong> {school.schoolBalance}</p>
          </div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-xl mb-2">Invoices</h3>
          <div className="overflow-x-auto mb-4">
            <table className="table-auto w-full dark:text-slate-300">
              <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                <tr>
                  <th className="p-2">Invoice Number</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Due Date</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                {school.invoices.map(invoice => (
                  <tr key={invoice._id}>
                    <td className="p-2">{invoice.invoiceNumber}</td>
                    <td className="p-2">{invoice.amount}</td>
                    <td className="p-2">{formatDate(invoice.dueDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <Link to="/schools" className="text-sm text-white bg-slate-500 hover:bg-slate-600 rounded px-4 py-2">Back to Schools</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default SchoolDetails;
