import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useGetSchoolByIdQuery } from '../../redux/api/schoolApiSlice';
import { Link } from 'react-router-dom';

function SchoolDetails() {
  const [statusFilter, setStatusFilter] = useState('all');
  const { schoolId } = useParams();
  const { data: schoolData, isLoading, isError } = useGetSchoolByIdQuery(schoolId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching school data</div>;

  const {
    name,
    type,
    product,
    county,
    registrationDate,
    contactInformation,
    balance,
    invoices = [],
    collections = []
  } = schoolData || {};

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  function calculateDaysUntilDue(creationDate, dueDate) {
    const creation = new Date(creationDate);
    const due = new Date(dueDate);
    const timeDiff = due.getTime() - creation.getTime();
    const daysUntilDue = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysUntilDue;
  }

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 p-5">
      <h2 className="font-semibold text-slate-800 dark:text-slate-100 text-2xl mb-4">{name}</h2>
      <div className="mb-4">
        <p><strong>Type:</strong> {type}</p>
        <p><strong>Product:</strong> {product}</p>
        <p><strong>County:</strong> {county}</p>
        <p><strong>Registration Date:</strong> {formatDate(registrationDate)}</p>
        {contactInformation && (
          <>
            <p><strong>Contact:</strong> {contactInformation.phone} / {contactInformation.email}</p>
          </>
        )}
        <p><strong>Balance:</strong> {balance}</p>
      </div>
      <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-xl mb-2">Invoices</h3>
      <div className="mb-4">
  <select
    className="md:px-8 md:py-2 px-8 py-1 border rounded appearance-none bg-white border-gray-300 text-gray-700"
    value={statusFilter}
    onChange={handleStatusFilterChange}
  >
    <option value="all">All</option>
    <option value="Completed">Completed</option>
    <option value="Pending">Pending</option>
  </select>
</div>

      <div className="overflow-x-auto mb-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Number</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creation Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid Amount</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Until Due</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
  {invoices
    .filter(invoice => statusFilter === 'all' || invoice.status.startsWith(statusFilter))
    .map(invoice => (
      <tr key={invoice._id}>
        <td className="px-6 py-4 whitespace-nowrap">{invoice.invoiceNumber}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          {invoice.items.map((item, index) => (
            <div key={index}>
              <p>{item.description}</p>
            </div>
          ))}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">{formatDate(invoice.creationDate)}</td>
        <td className="px-6 py-4 whitespace-nowrap">{formatDate(invoice.dueDate)}</td>
        <td className="px-6 py-4 whitespace-nowrap">{invoice.amount}</td>
        <td className="px-6 py-4 whitespace-nowrap">{invoice.paidAmount}</td>
        <td className="px-6 py-4 whitespace-nowrap">{invoice.balance}</td>
        <td className="px-6 py-4 whitespace-nowrap">{invoice.status}</td>
        <td className="px-6 py-4 whitespace-nowrap">{calculateDaysUntilDue(invoice.creationDate, invoice.dueDate)}</td>
      </tr>
    ))}
</tbody>

        </table>
      </div>
      <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-xl mb-2">Collections</h3>
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collection Number</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Collection</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {collections.map(collection => (
             
             <tr key={collection._id}>
             <td className="px-6 py-4 whitespace-nowrap">{collection.collectionNumber}</td>
             <td className="px-6 py-4 whitespace-nowrap">{collection.amount}</td>
             <td className="px-6 py-4 whitespace-nowrap">{formatDate(collection.dateOfCollection)}</td>
             <td className="px-6 py-4 whitespace-nowrap">{collection.status}</td>
           </tr>
         ))}
       </tbody>
     </table>
   </div>
   <div className="mt-4">
     <Link to="/schools" className="text-sm text-white bg-slate-400 hover:bg-slate-600 rounded px-4 py-2">Back to Schools</Link>
   </div>
 </div>
);
}

export default SchoolDetails;
