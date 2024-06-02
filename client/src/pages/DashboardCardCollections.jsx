import React, { useState } from 'react';

function DashboardCardCollections() {
  const [collections, setCollections] = useState([
    { id: 1, school: 'Greenwood High', invoiceNumber: 'INV001', collectionNumber: 'COL001', date: '2024-06-01', status: 'Valid', amount: 500 },
    { id: 2, school: 'Sunnydale Elementary', invoiceNumber: 'INV002', collectionNumber: 'COL002', date: '2024-06-02', status: 'Valid', amount: 300 },
    { id: 3, school: 'Riverside Middle', invoiceNumber: 'INV003', collectionNumber: 'COL003', date: '2024-06-03', status: 'Valid', amount: 200 },
    { id: 4, school: 'Hillcrest Academy', invoiceNumber: 'INV004', collectionNumber: 'COL004', date: '2024-06-04', status: 'Valid', amount: 700 },
    { id: 5, school: 'Lakeside School', invoiceNumber: 'INV005', collectionNumber: 'COL005', date: '2024-06-05', status: 'Valid', amount: 400 },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setCollections(
      collections.map((collection) =>
        collection.id === id ? { ...collection, status: newStatus } : collection
      )
    );
  };

  const markBounced = (id) => {
    handleStatusChange(id, 'Bounced');
  };

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Collections</h2>
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
                  <div className="font-semibold text-left">Invoice #</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Collection #</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Date</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Status</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Amount</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Actions</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {collections.map((collection) => (
                <tr key={collection.id}>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{collection.school}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{collection.invoiceNumber}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{collection.collectionNumber}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{collection.date}</div>
                  </td>
                  <td className="p-2">
                    <div className={`font-semibold ${collection.status === 'Valid' ? 'text-emerald-500' : 'text-red-500'}`}>{collection.status}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{collection.amount}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">
                      <button
                        className="text-sm text-white bg-emerald-500 hover:bg-emerald-600 rounded px-2 md:py-1 py-0 m-2"
                        onClick={() => handleStatusChange(collection.id, 'Valid')}
                      >
                        Mark Valid
                      </button>
                      <button
                        className="text-sm text-white bg-red-500 hover:bg-red-600 rounded px-2 md:py-1 py-0 m-2"
                        onClick={() => markBounced(collection.id)}
                      >
                        Mark Bounced
                        </button>
                      
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCardCollections;
