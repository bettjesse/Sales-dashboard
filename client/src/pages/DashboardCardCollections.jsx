import React, { useState, useEffect } from 'react';
import { useAllCollectionsQuery, useUpdateCollectionStatusMutation } from '../redux/api/collectionApiSlice';
import { collectionStatusUpdated } from '../redux/api/collections';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
function DashboardCardCollections() {
  const { data: collections = [], error, isLoading, refetch } = useAllCollectionsQuery();
  const [updateStatus, { isLoading: isUpdating }] = useUpdateCollectionStatusMutation();
  const dispatch = useDispatch();

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Call the mutation to update the collection status
      const response =  await updateStatus({ id, status: newStatus });

      dispatch(collectionStatusUpdated({ id,  status: response.data.collection.status }));
      console.log("UPDATES STATUS",response.data.collection.status)
      refetch()
      toast.success("Collections updated succesfully")
    } catch (error) {
      toast.error('Error updating collection status:', );
    }
  };


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching collections</div>;
  }

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
                <tr key={collection._id}>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{collection.school.name}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{collection.invoice.invoiceNumber}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{collection.collectionNumber}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">{new Date(collection.dateOfCollection).toLocaleDateString()}</div>
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
                        onClick={() => handleStatusChange(collection._id, 'Valid')}
                        disabled={isUpdating} // Disable the button while updating
                      >
                        {isUpdating ? 'Updating...' : 'Mark Valid'}
                      </button>
                      <button
                        className="text-sm text-white bg-red-500 hover:bg-red-600 rounded px-2 md:py-1 py-0 m-2"
                        onClick={() => handleStatusChange(collection._id, 'Bounced')}
                        disabled={isUpdating} // Disable the button while updating
                      >
                        {isUpdating ? 'Updating...' : 'Mark Bounced'}
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
