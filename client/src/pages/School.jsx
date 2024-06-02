import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function DashboardCard07() {
  return (
    
      <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
        <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">Dashboard</h2>
        </header>
        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="table-auto w-full dark:text-slate-300">
              <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
                <tr>
                  <th className="p-2">
                    <div className="font-semibold text-left">Feature</div>
                  </th>
                  <th className="p-2">
                    <div className="font-semibold text-center">Action</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                <tr>
                  <td className="p-2">
                    <div className="text-slate-800 dark:text-slate-100">Manage Schools</div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">
                      <Link to="/schools" className="text-sm text-white bg-emerald-500 hover:bg-emerald-600 rounded px-2 py-1">
                        Go to Schools
                      </Link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        
      </div>
 
  );
}

export default DashboardCard07;
