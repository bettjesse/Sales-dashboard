import React, { useState, useEffect } from 'react';
import { useCreateInvoiceMutation } from '../../redux/api/invoiceApiSlice';
import { useGetSchoolByIdQuery } from '../../redux/api/schoolApiSlice';
import { useParams } from 'react-router-dom';

function Invoices() {
  const [createInvoice, { isLoading: isInvoiceLoading, isError: isInvoiceError }] = useCreateInvoiceMutation();
  const { schoolId } = useParams();
  const [selectedSchool, setSelectedSchool] = useState('');
  const [items, setItems] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [amount, setAmount] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'create', 'edit', 'collect'
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [filter, setFilter] = useState('All');
  const [schoolData, setSchoolData] = useState(null);

  const { data: schoolDetails, isLoading: isSchoolLoading, isError: isSchoolError } = useGetSchoolByIdQuery(schoolId);

  useEffect(() => {
    if (schoolDetails) {
      setSchoolData(schoolDetails);
      setSelectedSchool(schoolDetails.name);
    }
  }, [schoolDetails]);

  const openModal = (mode, invoice = null) => {
    setSelectedInvoice(invoice);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
    setModalMode('view');
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const newInvoiceData = {
        school: selectedSchool,
        items: items,
        dueDate: dueDate,
        amount: parseFloat(amount),
        paidAmount: 0,
        balance: parseFloat(amount),
      };
      const response = await createInvoice(newInvoiceData).unwrap();
      console.log('Invoice created:', response);
      closeModal();
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  const renderInvoicesTable = () => {
    if (isSchoolLoading || isSchoolError || !schoolData) return null;

    const { invoices } = schoolData;

    const filteredInvoices = invoices.filter((invoice) => {
      if (filter === 'All') return true;
      return invoice.status === filter;
    });

    return (
      <table className="table-auto w-full dark:text-slate-300">
        <thead>
          <tr>
            <th className="p-2">Invoice #</th>
            <th className="p-2">Items</th>
            <th className="p-2">Due Date</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map((invoice) => (
            <tr key={invoice._id}>
              <td className="p-2">{invoice.invoiceNumber}</td>
              <td className="p-2">{invoice.items.map((item) => item.description).join(', ')}</td>
              <td className="p-2">{invoice.dueDate}</td>
              <td className="p-2">{invoice.amount}</td>
              <td className="p-2">{invoice.status}</td>
              <td className="p-2">
                <button className="text-sm text-white bg-emerald-500 hover:bg-emerald-600 rounded px-2 md:py-1 py-0 m-2" onClick={() => openModal('collect', invoice)}>Collect Payment</button>
                <button className="text-sm text-white bg-yellow-500 hover:bg-yellow-600 rounded px-2 md:py-1 py-0 m-2" onClick={() => openModal('edit', invoice)}>Edit</button>
                <button className="text-sm text-white bg-red-500 hover:bg-red-600 rounded px-2 md:py-1 py-0 m-2" onClick={() => handleDeleteInvoice(invoice.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Invoices</h2>
        <div className="flex items-center">
          <select className="text-sm text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 mr-2" value={filter} onChange={handleFilterChange}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <button className="text-sm text-white bg-blue-500 hover:bg-blue-600 rounded px-4 py-2" onClick={() => openModal('create')}>Create Invoice</button>
        </div>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">{renderInvoicesTable()}</div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              {modalMode === 'create' ? 'Create Invoice' : modalMode === 'edit' ? 'Edit Invoice' : 'Collect Payment'}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-800 dark:text-slate-100">Items</label>
                <input type="text" name="items" value={items} onChange={(e) => setItems(e.target.value)} className="mt-1 p-2 block w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-800 dark:text-slate-100">Due Date</label>
                <input type="date" name="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="mt-1 p-2 block w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-800 dark:text-slate-100">Amount</label>
                <input type="number" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1 p-2 block w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded" required />
              </div>
              <div className="flex justify-end">
                <button type="button" className="text-sm text-white bg-red-500 hover:bg-red-600 rounded px-4 py-2 mr-2" onClick={closeModal}>Cancel</button>
                <button type="submit" className="text-sm text-white bg-emerald-500 hover:bg-emerald-600 rounded px-4 py-2">{modalMode === 'create' ? 'Create' : modalMode === 'edit' ? 'Save Changes' : 'Collect'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Invoices;

