import React, { useState } from 'react';
import { useCreateInvoiceMutation } from '../../redux/api/invoiceApiSlice';
import { useGetSchoolsQuery } from '../../redux/api/schoolApiSlice';
import { useAllnvoiceQuery } from '../../redux/api/invoiceApiSlice';
function  Invoices() {

  const [createInvoice, {isLoading,isError,isSuccess}]= useCreateInvoiceMutation()
  const { data: schools, isSchoolLoading, isSchoolError } = useGetSchoolsQuery();
  const [selectedSchool, setSelectedSchool] = useState('');
  const [items, setItems] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'create', 'edit', 'collect'
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [filter, setFilter] = useState('All');
  const [invoices, setInvoices] = useState([
    { id: 1, invoiceNumber: 'INV001', school: 'Greenwood High', items: 'Zeraki Analytics', amount: 1200, paidAmount: 0, creationDate: '2024-05-01', dueDate: '2024-06-05', status: 'Pending', balance: 1200 },
    { id: 2, invoiceNumber: 'INV002', school: 'Sunnydale Elementary', items: 'Zeraki Finance', amount: 850, paidAmount: 850, creationDate: '2024-05-05', dueDate: '2024-06-10', status: 'Completed', balance: 0 },
    { id: 3, invoiceNumber: 'INV003', school: 'Riverside Middle', items: 'Zeraki Timetable', amount: 950, paidAmount: 300, creationDate: '2024-05-10', dueDate: '2024-06-15', status: 'Pending', balance: 650 },
    { id: 4, invoiceNumber: 'INV004', school: 'Hillcrest Academy', items: 'Zeraki Analytics', amount: 1300, paidAmount: 1300, creationDate: '2024-05-15', dueDate: '2024-06-20', status: 'Completed', balance: 0 },
    { id: 5, invoiceNumber: 'INV005', school: 'Lakeside School', items: 'Zeraki Finance', amount: 1100, paidAmount: 500, creationDate: '2024-05-20', dueDate: '2024-06-25', status: 'Pending', balance: 600 },
  ]);

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
        items: e.target.items.value,
        dueDate: e.target.dueDate.value,
        amount: parseFloat(e.target.amount.value),
        paidAmount: 0,
        balance: parseFloat(e.target.amount.value),
      };
      const response = await createInvoice(newInvoiceData).unwrap();
      // Handle success response
      console.log('Invoice created:', response);
      closeModal();
    } catch (error) {
      // Handle error
      console.error('Error creating invoice:', error);
    }
  };
  

  const handleDeleteInvoice = (id) => {
    setInvoices(invoices.filter((invoice) => invoice.id !== id));
  };

  const filteredInvoices = invoices.filter((invoice) => {
    if (filter === 'All') return true;
    return invoice.status === filter;
  });

  const calculateDaysUntilDue = (dueDate) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  // Render school options
  const renderSchoolOptions = () => {
    if (isSchoolError) return <option>Loading...</option>;
    if (isSchoolError) return <option>Error loading schools</option>;
    return schools.map((school) => (
      <option key={school._id} value={school._id}>
        {school.name}
      </option>
    ));
  };
  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Invoices</h2>
        <div className="flex items-center">
          <select
            className="text-sm text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded px-2 py-1 mr-2"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <button
            className="text-sm text-white bg-blue-500 hover:bg-blue-600 rounded px-4 py-2"
            onClick={() => openModal('create')}
          >
            Create Invoice
          </button>
        </div>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Invoice #</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">School</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Items</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Creation Date</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Due Date</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Amount</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Paid Amount</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Balance</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Status</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Days Until Due</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Actions</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {filteredInvoices.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).map((invoice) => (
                <tr key={invoice.id}>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{invoice.invoiceNumber}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{invoice.school}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{invoice.items}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{invoice.creationDate}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{invoice.dueDate}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{invoice.amount}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{invoice.paidAmount}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{invoice.balance}</div>
                  </td>
                  <td className="p-2">
                    <div className={`font-semibold ${invoice.status === 'Completed' ? 'text-emerald-500' : 'text-red-500'}`}>{invoice.status}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{calculateDaysUntilDue(invoice.dueDate)}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">
                      <button
                        className="text-sm text-white bg-emerald-500 hover:bg-emerald-600 rounded px-2 md:py-1 py-0 m-2"
                        onClick={() => openModal('collect', invoice)}
                      >
                        Collect Payment
                      </button>
                      <button
                        className="text-sm text-white bg-yellow-500 hover:bg-yellow-600 rounded px-2 md:py-1 py-0 m-2"
                        onClick={() => openModal('edit', invoice)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-sm text-white bg-red-500 hover:bg-red-600 rounded px-2 md:py-1 py-0 m-2"
                        onClick={() => handleDeleteInvoice(invoice.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              {modalMode === 'create' ? 'Create Invoice' : modalMode === 'edit' ? 'Edit Invoice' : 'Collect Payment'}
            </h2>
            <form onSubmit={handleFormSubmit}>
              {(modalMode === 'create' || modalMode === 'edit') && (
               
               <>
                <div className="mb-4">
    <label className="block text-sm font-medium text-slate-800 dark:text-slate-100">School</label>
    <select
      name="school"
      value={selectedSchool}
      onChange={(e) => setSelectedSchool(e.target.value)}
      className="mt-1 p-2 block w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded"
      required
    >
      <option value="">Select School</option>
      {renderSchoolOptions()}
    </select>
  </div>
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-800 dark:text-slate-100">Items</label>
    <input
      type="text"
      name="items"
      value={items}
      onChange={(e) => setItems(e.target.value)}
      className="mt-1 p-2 block w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded"
      required
    />
  </div>
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-800 dark:text-slate-100">Due Date</label>
    <input
      type="date"
      name="dueDate"
      value={dueDate}
      onChange={(e) => setDueDate(e.target.value)}
      className="mt-1 p-2 block w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded"
      required
    />
  </div>
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-800 dark:text-slate-100">Amount</label>
    <input
      type="number"
      name="amount"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      className="mt-1 p-2 block w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded"
      required
    />
  </div></>
              )}
              {modalMode === 'collect' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-800 dark:text-slate-100">School</label>
                    <input
                      type="text"
                      value={selectedInvoice.school}
                      readOnly
                      className="mt-1 p-2 block w-full bg-gray-100 dark:bg-slate-700 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-800 dark:text-slate-100">Items</label>
                    <input
                      type="text"
                      value={selectedInvoice.items}
                      readOnly
                      className="mt-1 p-2 block w-full bg-gray-100 dark:bg-slate-700 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-800 dark:text-slate-100">Due Date</label>
                    <input
                      type="text"
                      value={selectedInvoice.dueDate}
                      readOnly
                      className="mt-1 p-2 block w-full bg-gray-100 dark:bg-slate-700 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-800 dark:text-slate-100">Amount</label>
                    <input
                      type="text"
                      value={selectedInvoice.amount}
                      readOnly
                      className="mt-1 p-2 block w-full bg-gray-100 dark:bg-slate-700 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-800 dark:text-slate-100">Paid Amount</label>
                    <input
                      type="text"
                      value={selectedInvoice.paidAmount}
                      readOnly
                      className="mt-1 p-2 block w-full bg-gray-100 dark:bg-slate-700 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-800 dark:text-slate-100">Balance</label>
                    <input
                      type="text"
                      value={selectedInvoice.balance}
                      readOnly
                      className="mt-1 p-2 block w-full bg-gray-100 dark:bg-slate-700 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-800 dark:text-slate-100">Payment Amount</label>
                    <input
                      type="number"
                      name="paymentAmount"
                      className="mt-1 p-2 block w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded"
                      required
                    />
                  </div>
                </>
              )}
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
                >
                  {modalMode === 'create' ? 'Create' : modalMode === 'edit' ? 'Save Changes' : 'Collect'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default  Invoices;
