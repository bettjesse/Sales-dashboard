import React from "react";
import { Link } from "react-router-dom";

import Icon from "../../images/icon-03.svg";
import EditMenu from "../../components/DropdownEditMenu";



function DashboardCard3() {


  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 03" />
          {/* Menu button */}
        
        </header>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
        Bounced Cheques
        </h2>
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-1">
          Cheques
        </div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">
        90
          </div>
          
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
     
    </div>
  );
}

export default DashboardCard3;
