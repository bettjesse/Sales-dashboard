

import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useGetSchoolByIdQuery } from '../../redux/api/schoolApiSlice';
import { Link } from 'react-router-dom';
import { useCreateInvoiceMutation, useUpdateInvoiceMutation, useDeleteInvoiceMutation } from '../../redux/api/invoiceApiSlice';
import { toast } from 'react-hot-toast';

function SchoolDetails() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const { schoolId } = useParams();
  const { data: schoolData, isLoading, isError, refetch } = useGetSchoolByIdQuery(schoolId);
  const [createInvoice, { isLoading: isInvoiceLoading, isError: isInvoiceError }] = useCreateInvoiceMutation();
  const [updateInvoice, { isLoading: isUpdateLoading, isError: isUpdateError }] = useUpdateInvoiceMutation();
  const [deleteInvoice, { isLoading: isDeleteLoading, isError: isDeleteError }] = useDeleteInvoiceMutation();

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

  console.log("COLECTION DATA", collections)

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

  const toggleDropdown = (invoiceId) => {
    if (activeDropdown === invoiceId) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(invoiceId);
    }
  };

  const openModal = (isEditMode = false, invoice = null) => {
    setIsEditing(isEditMode);
    setCurrentInvoice(invoice);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentInvoice(null);
  };

  const handleCreateSubmit = async (invoiceData) => {
    const invoicePayload = {
      ...invoiceData,
      school: schoolId,
      items: invoiceData.items,
      dueDate: invoiceData.dueDate,
      amount: invoiceData.amount,
      paidAmount: 0.0,
      balance: invoiceData.amount,
      status: 'Pending'
    };

    try {
      await createInvoice(invoicePayload).unwrap();
      refetch()
      toast.success("Invoice created successfully!")
      closeModal();
    } catch (error) {
     
      toast.error("Failed to create invoice")
    }
  };

  const handleEditSubmit = async (invoiceData) => {
    const invoicePayload = {
      ...invoiceData,
      id: currentInvoice._id, // Use the current invoice ID
    };

    try {
      await updateInvoice(invoicePayload).unwrap();
      refetch();
      toast.success("Invoice updated successfully!");
      closeModal();
    } catch (error) {
      toast.error("Failed to update invoice");
    }
  };

  const handleCreateClick = () => {
    openModal(false, null);
  };

  const handleEditClick = (invoice) => {
    openModal(true, invoice);
  };

  const handleDeleteClick = (invoiceId) => {
    setSelectedInvoiceId(invoiceId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteInvoice(selectedInvoiceId).unwrap();
      refetch();
      toast.success("Invoice deleted successfully!");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Failed to delete invoice");
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 p-5">
       {isModalOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      )}
      <div className=' flex justify-between items-center'>
      <h2 className="font-semibold text-slate-800 dark:text-slate-100 text-2xl mb-4">{name}</h2>
      <Link to="/schools">
<button className=' bg-green-500 hover:bg-green-400 rounded-md px-3 py-2 text-white'>Back to schools</button>
</Link>
      
      </div>
     
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
      <div className="mb-4 text-sm flex items-center justify-between mx-2 ">
        <select
          className="md:px-8 md:py-2 px-7 py-1 border rounded appearance-none bg-white border-gray-300 text-gray-700 "
          value={statusFilter}
          onChange={handleStatusFilterChange}
        >
          <option value="all">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
        <div>
          <button onClick={handleCreateClick} className=' bg-green-700 hover:bg-green-500 text-white  font-bold px-2 rounded-md py-2'>Create Invoice</button>
        </div>
      </div>
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full ">
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
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative">
                      <button
                        className="text-gray-500 hover:text-gray-900 focus:outline-none"
                        onClick={() => toggleDropdown(invoice._id)}
                      >
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 10a2 2 0 114 0 2 2 0 11-4 0zm6-2a2 2 0 100 4 2 2 0 000-4zm4 2a2 2 0 11-4 0 2 2 0 114 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      {activeDropdown === invoice._id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                          <button
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => handleEditClick(invoice)}
                          >
                            Edit
                          </button>
                          <button onClick={() => handleDeleteClick(invoice._id)} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
  Delete
</button>

                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

      </div>
    

<h3 className="font-semibold text-slate-800 dark:text-slate-100 text-xl mb-2">Collections</h3>
<div className="overflow-x-auto mb-4">
  <table className="min-w-full ">
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collection Number</th>
   
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Collection</th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {collections.map(collection => (
        <tr key={collection._id}>
          <td className="px-6 py-4 whitespace-nowrap">{collection.collectionNumber}</td>
      
          <td className="px-6 py-4 whitespace-nowrap">{new Date(collection.dateOfCollection).toLocaleDateString()}</td>
          <td className="px-6 py-4 whitespace-nowrap">{collection.status}</td>
          <td className="px-6 py-4 whitespace-nowrap">{collection.amount}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

...

   
      {isModalOpen && (
        <InvoiceModal
          isEditing={isEditing}
          invoice={currentInvoice}
          onClose={closeModal}
          onSubmit={isEditing ? handleEditSubmit : handleCreateSubmit}
        />
      )}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this invoice?</p>
            <div className="flex justify-end">
              <button onClick={() => setIsDeleteModalOpen(false)} className="mr-2 px-4 py-2 text-sm text-gray-700">Cancel</button>
              <button onClick={confirmDelete} className="px-4 py-2 text-sm text-white bg-red-600 rounded-md">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InvoiceModal({ isEditing, invoice, onClose, onSubmit }) {
  const [invoiceData, setInvoiceData] = useState(invoice || { items: [], amount: 0, dueDate: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = invoiceData.items.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setInvoiceData((prevData) => ({
      ...prevData,
      items: newItems,
    }));
  };

  const addItem = () => {
    setInvoiceData((prevData) => ({
      ...prevData,
      items: [...prevData.items, { description: '', quantity: 1, price: 0 }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(invoiceData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Invoice' : 'Create Invoice'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={invoiceData.amount}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={invoiceData.dueDate}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product Item</label>
            {invoiceData.items.map((item, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  name="description"
                  placeholder="Product name"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, e)}
                  className="mt-1 block w-full border-gray-300 rounded-md mb-1"
                />
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  className="mt-1 block w-full border-gray-300 rounded-md mb-1"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, e)}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
            ))}
            <button type="button" onClick={addItem} className="mt-2 text-blue-500">Add Item</button>
          </div>
          <div className="flex justify-end">
            <button onClick={onClose} type="button" className="mr-2 px-4 py-2 text-sm text-gray-700">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SchoolDetails;
