import React, { useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";




import DashboardCard01 from "../partials/dashboard/DashboardCard01";
import DashboardCard02 from "../partials/dashboard/DashboardCard02";
import DashboardCard03 from "../partials/dashboard/DashboardCard03";



import DashboardCard07 from "../partials/dashboard/DashboardCard07";

import DashboardCard3 from "../partials/dashboard/DashboardCard3";

import ZerakiAnalytics from "../partials/dashboard/ZerakiAnalytics";
import ZerakiFinance from "../partials/dashboard/ZerakiFinance";
import ZerakiAnalyticsBar from "../partials/dashboard/ZerakiAnalyticsBar";
import ZerakiFinanceBar from "../partials/dashboard/ZerakiFinanceBar";
import ZerakiTimetable from "../partials/dashboard/ZerakiTimetable";
import ZerakiTimetableBar from "../partials/dashboard/ZerakiTimetableBar";
import BannerNotification from "../components/BannerNotification";


function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <BannerNotification />
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-4 py-8 w-full max-w-9xl mx-auto">


         

            {/* Cards */}
            <div className="grid grid-cols-6 gap-6">
            
  <DashboardCard01 />
  <DashboardCard02 />
  <DashboardCard03 />
  <DashboardCard3 />


            
           
            <ZerakiAnalyticsBar/>
            <ZerakiFinanceBar/>
            <ZerakiTimetableBar/>
              {/* Line chart (Real Time Value) */}
             
              {/* Doughnut chart (Top Countries) */}
              
              <ZerakiAnalytics/>
              <ZerakiFinance/>
              <ZerakiTimetable/>
              {/* Table (Top Channels) */}
              <DashboardCard07 />
             
          
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
