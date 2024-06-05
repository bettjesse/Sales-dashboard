

// import { useParams } from 'react-router-dom';
// import { useState } from 'react';
// import { useGetSchoolByIdQuery } from '../../redux/api/schoolApiSlice';
// import { useCreateInvoiceMutation } from '../../redux/api/invoiceApiSlice';
// import { Link } from 'react-router-dom';

// function SchoolDetails() {
//   const [dropdownVisible, setDropdownVisible] = useState(false); 
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentInvoice, setCurrentInvoice] = useState(null);

//   const { schoolId } = useParams();
//   const { data: schoolData, isLoading, isError } = useGetSchoolByIdQuery(schoolId);
//   const [createInvoice, { isLoading: isInvoiceLoading, isError: isInvoiceError }] = useCreateInvoiceMutation();

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error fetching school data</div>;

//   const {
//     name,
//     type,
//     product,
//     county,
//     registrationDate,
//     contactInformation,
//     balance,
//     invoices = [],
//     collections = []
//   } = schoolData || {};

//   function formatDate(dateString) {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   }

//   function calculateDaysUntilDue(creationDate, dueDate) {
//     const creation = new Date(creationDate);
//     const due = new Date(dueDate);
//     const timeDiff = due.getTime() - creation.getTime();
//     const daysUntilDue = Math.ceil(timeDiff / (1000 * 3600 * 24));
//     return daysUntilDue;
//   }

//   const handleStatusFilterChange = (e) => {
//     setStatusFilter(e.target.value);
//   };

//   const toggleDropdown = (invoiceId) => {
//     if (activeDropdown === invoiceId) {
//       setActiveDropdown(null);
//     } else {
//       setActiveDropdown(invoiceId);
//     }
//   };

//   const openModal = (invoice = null) => {
//     setCurrentInvoice(invoice);
//     setIsEditing(!!invoice);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCurrentInvoice(null);
//     setIsEditing(false);
//   };

//   const handleCreateClick = () => openModal();
//   const handleEditClick = (invoice) => openModal(invoice);


//   const handleCreateSubmit = async (invoiceData) => {
//     const invoicePayload = {
//       ...invoiceData,
//       school: schoolId,
//       items: invoiceData.items,
//       dueDate: invoiceData.dueDate,
//       amount: invoiceData.amount,
//       paidAmount: 0.0,
//       balance: invoiceData.amount,
//       status: 'Pending'
//     };

//     try {
//       await createInvoice(invoicePayload).unwrap();
//       console.log('Invoice created successfully!');
//       closeModal();
//     } catch (error) {
//       console.error('Failed to create invoice:', error);
//     }
//   };

//   const handleEditSubmit = (invoiceData) => {
//     // Implement the logic to edit an invoice
//     console.log('Editing invoice with data:', invoiceData);
//     closeModal();
//   };

//   return (
//     <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 p-5">
//       <h2 className="font-semibold text-slate-800 dark:text-slate-100 text-2xl mb-4">{name}</h2>
//       <div className="mb-4">
//         <p><strong>Type:</strong> {type}</p>
//         <p><strong>Product:</strong> {product}</p>
//         <p><strong>County:</strong> {county}</p>
//         <p><strong>Registration Date:</strong> {formatDate(registrationDate)}</p>
//         {contactInformation && (
//           <>
//             <p><strong>Contact:</strong> {contactInformation.phone} / {contactInformation.email}</p>
//           </>
//         )}
//         <p><strong>Balance:</strong> {balance}</p>
//       </div>
//       <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-xl mb-2">Invoices</h3>
//       <div className="mb-4 text-sm flex items-center justify-between mx-2">
//         <select
//           className="md:px-8 md:py-2 px-7 py-1 border rounded appearance-none bg-white border-gray-300 text-gray-700"
//           value={statusFilter}
//           onChange={handleStatusFilterChange}
//         >
//           <option value="all">All</option>
//           <option value="Completed">Completed</option>
//           <option value="Pending">Pending</option>
//         </select>
//         <div>
//           <button onClick={handleCreateClick} className="bg-green-700 hover:bg-green-500 text-white font-bold px-2 rounded-md py-2">Create Invoice</button>
//         </div>
//       </div>

//       <div className="overflow-x-auto mb-4">
//         <table className="min-w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Number</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creation Date</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid Amount</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Until Due</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {invoices
//               .filter(invoice => statusFilter === 'all' || invoice.status.startsWith(statusFilter))
//               .map(invoice => (
//                 <tr key={invoice._id}>
//                   <td className="px-6 py-4 whitespace-nowrap">{invoice.invoiceNumber}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {invoice.items.map((item, index) => (
//                       <div key={index}>
//                         <p>{item.description}</p>
//                       </div>
//                     ))}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">{formatDate(invoice.creationDate)}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{formatDate(invoice.dueDate)}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{invoice.amount}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{invoice.paidAmount}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{invoice.balance}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{invoice.status}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{calculateDaysUntilDue(invoice.creationDate, invoice.dueDate)}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="relative">
//                       <button
//                         className="text-gray-500 hover:text-gray-900 focus:outline-none"
//                         onClick={() => toggleDropdown(invoice._id)}
//                       >
//                         <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                           <path fillRule="evenodd" d="M5 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm5 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm5 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" clipRule="evenodd" />
//                         </svg>
//                       </button>
//                       {activeDropdown === invoice._id && (
//                         <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
//                           <div className="py-1">
//                             <a href="#" onClick={() => handleEditClick(invoice)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit</a>
//                             <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Delete Invoice</a>
//                             <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View Invoice</a>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//       <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-xl mb-2">Collections</h3>
//       <div className="overflow-x-auto mb-4">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collection Number</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Collection</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {collections.map(collection => (
//               <tr key={collection._id}>
//                 <td className="px-6 py-4 whitespace-nowrap">{collection.collectionNumber}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{collection.amount}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{formatDate(collection.dateOfCollection)}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{collection.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="mt-4">
//         <Link to="/schools" className="text-sm text-white bg-slate-400 hover:bg-slate-600 rounded px-4 py-2">Back to Schools</Link>
//       </div>

//       {isModalOpen && (
//         <InvoiceModal
//           isEditing={isEditing}
//           invoice={currentInvoice}
//           onClose={closeModal}
//           onSubmit={isEditing ? handleEditSubmit : handleCreateSubmit}
//         />
//       )}
//     </div>
//   );
// }

// function InvoiceModal({ isEditing, invoice, onClose, onSubmit }) {
//   const [invoiceData, setInvoiceData] = useState(invoice || { items: [], amount: 0, dueDate: '', status: '' });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setInvoiceData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSave = () => {
//     onSubmit(invoiceData);
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded shadow-lg w-96">
//         <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Invoice' : 'Create Invoice'}</h2>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Amount</label>
//           <input
//             type="number"
//             name="amount"
//             value={invoiceData.amount}
//             onChange={handleInputChange}
//             className="mt-1 block w-full border-gray-300 rounded-md"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Due Date</label>
//           <input
//             type="date"
//             name="dueDate"
//             value={invoiceData.dueDate}
//             onChange={handleInputChange}
//             className="mt-1 block w-full border-gray-300 rounded-md"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Status</label>
//           <select
//             name="status"
//             value={invoiceData.status}
//             onChange={handleInputChange}
//             className="mt-1 block w-full border-gray-300 rounded-md"
//           >
//             <option value="Pending">Pending</option>
//             <option value="Completed">Completed</option>
//           </select>
//         </div>
//         <div className="flex justify-end">
//           <button onClick={onClose} className="mr-2 px-4 py-2 text-sm text-gray-700">Cancel</button>
//           <button onClick={handleSave} className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md">Save</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SchoolDetails;

import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useGetSchoolByIdQuery } from '../../redux/api/schoolApiSlice';
import { Link } from 'react-router-dom';
import { useCreateInvoiceMutation } from '../../redux/api/invoiceApiSlice';
import { toast } from 'react-hot-toast';

function SchoolDetails() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const { schoolId } = useParams();
  const { data: schoolData, isLoading, isError } = useGetSchoolByIdQuery(schoolId);
  const [createInvoice, { isLoading: isInvoiceLoading, isError: isInvoiceError }] = useCreateInvoiceMutation();

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
      
      toast.success("Invoice created successfully!")
      closeModal();
    } catch (error) {
     
      toast.error("Failed to create invoice")
    }
  };

  const handleEditSubmit = async (invoiceData) => {
   
    console.log('Editing invoice with data:', invoiceData);
    closeModal();
  };

  const handleCreateClick = () => {
    openModal(false, null);
  };

  const handleEditClick = (invoice) => {
    openModal(true, invoice);
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
                          <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
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
      {isModalOpen && (
        <InvoiceModal
          isEditing={isEditing}
          invoice={currentInvoice}
          onClose={closeModal}
          onSubmit={isEditing ? handleEditSubmit : handleCreateSubmit}
        />
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
            <label className="block text-sm font-medium text-gray-700">Items</label>
            {invoiceData.items.map((item, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
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
