import React from 'react';
import { useParams, Link } from 'react-router-dom';

function SchoolDetails() {
  const { id } = useParams();
  const school = {
    id: 1,
    name: 'Greenwood High',
    type: 'Secondary',
    product: 'Zeraki timetable',
    county: 'County A',
    registrationDate: '2020-01-01',
    contact: '123-456-7890',
    balance: '$500',
    invoices: [
      { id: 1, amount: 'ksh1,200', dueDate: '2024-06-05' },
      { id: 2, amount: 'ksh850', dueDate: '2024-06-10' },
      // Add more invoices as needed
    ],
    collections: [
      { id: 1, amount: 'ksh700', date: '2024-05-05' },
      { id: 2, amount: 'ksh400', date: '2024-05-10' },
      // Add more collections as needed
    ],
  }; // Replace with actual data fetching logic

  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 p-5">
      <h2 className="font-semibold text-slate-800 dark:text-slate-100 text-2xl mb-4">{school.name}</h2>
      <div className="mb-4">
        <p><strong>Type:</strong> {school.type}</p>
        <p><strong>Product:</strong> {school.product}</p>
        <p><strong>County:</strong> {school.county}</p>
        <p><strong>Registration Date:</strong> {school.registrationDate}</p>
        <p><strong>Contact:</strong> {school.contact}</p>
        <p><strong>Balance:</strong> {school.balance}</p>
      </div>
      <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-xl mb-2">Invoices</h3>
      <div className="overflow-x-auto mb-4">
        <table className="table-auto w-full dark:text-slate-300">
          <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
            <tr>
              <th className="p-2">Amount</th>
              <th className="p-2">Due Date</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
            {school.invoices.map(invoice => (
              <tr key={invoice.id}>
                <td className="p-2">{invoice.amount}</td>
                <td className="p-2">{invoice.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-xl mb-2">Collections</h3>
      <div className="overflow-x-auto">
        <table className="table-auto w-full dark:text-slate-300">
          <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
            <tr>
              <th className="p-2">Amount</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
            {school.collections.map(collection => (
              <tr key={collection.id}>
                <td className="p-2">{collection.amount}</td>
                <td className="p-2">{collection.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <Link to="/schools" className="text-sm text-white bg-slate-500 hover:bg-slate-600 rounded px-4 py-2">Back to Schools</Link>
      </div>
    </div>
  );
}

export default SchoolDetails;
