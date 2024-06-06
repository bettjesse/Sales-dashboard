


import React, { useState } from 'react';
import { useAllnvoiceQuery } from '../../redux/api/invoiceApiSlice';
import { useCreateCollectionMutation } from '../../redux/api/collectionApiSlice';
import toast from 'react-hot-toast';

function DashboardCard07() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [collectionData, setCollectionData] = useState({
    dateOfCollection: '',
    status: 'Valid',
    amount: 0
  });

  const { data: invoices, isLoading, isError , refetch} = useAllnvoiceQuery();
  const [createCollection, { isLoading: isCreatingCollection }] = useCreateCollectionMutation();

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const openModal = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
    setCollectionData({
      dateOfCollection: '',
      status: 'Valid',
      amount: 0
    });
  };

  const handleCreateCollection = async (e) => {
    e.preventDefault();
    try {
      const collectionPayload = {
        invoice: selectedInvoice._id,
        school: selectedInvoice.school._id,
        ...collectionData
      };

      // Call the createCollection mutation
      const response = await createCollection(collectionPayload).unwrap();

     toast.success("Collection was succesfull")
     refetch()

      // Close modal and reset collection data
      closeModal();
    } catch (error) {
      toast.error('Error creating collection:');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCollectionData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Upcoming Invoices</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">School</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Amount Due</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Due Date</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Actions</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="text-center">Loading...</td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan="4" className="text-center">Error fetching data</td>
                </tr>
              ) : (
                invoices.map((invoice) => (
                  <tr key={invoice._id}>
                    <td className="p-2">
                      <div className="text-slate-800 dark:text-slate-100">{invoice.school.name}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-emerald-500">{invoice.balance}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{ formatDate(invoice.dueDate)}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center ">
                        <button
                          className="text-sm text-white bg-emerald-500 hover:bg-emerald-600 rounded px-2 md:py-1 py-0 m-2"
                          onClick={() => openModal(invoice)}
                        >
                          Collect Payment
                        </button>
                        <button className="text-sm text-white bg-slate-500 hover:bg-slate-600 rounded px-2 py-1">
                          Send Reminder
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Collect Payment</h2>
            <form onSubmit={handleCreateCollection}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-800 dark:text-slate-100">School</label>
                <input
                  type="text"
                  value={selectedInvoice.school.name}
                  readOnly
                  className="mt-1 p-2 block w-full bg-gray-100 dark:bg-slate-700 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-800 dark:text-slate-100">Amount Due</label>
                <input
                  type="text"
                  value={selectedInvoice.amount}
                  readOnly
                  className="mt-1 p-2 block w-full bg-gray-100 dark:bg-slate-700 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-800 dark:text-slate-100">Due Date</label>
                <input
                  type="text"
                  value={ formatDate(selectedInvoice.dueDate)}
                  readOnly
                  className="mt-1 p-2 block w-full bg-gray-100 dark:bg-slate-700 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-800 dark:text-slate-100">Payment Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={collectionData.amount}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-white bg-red-500 hover:bg-red-600 rounded px-4 py-2 mr-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-sm text-white bg-emerald-500 hover:bg-emerald-600 rounded px-4 py-2"
                  disabled={isCreatingCollection}
                >
                  {isCreatingCollection ? 'Creating...' : 'Collect'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardCard07;

