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
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Number</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {school.invoices.map(invoice => (
                  <tr key={invoice._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{invoice.invoiceNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{invoice.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(invoice.dueDate)}</td>
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
