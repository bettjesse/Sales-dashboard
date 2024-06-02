import React, { useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";



import Invoices from "../partials/school/Invoices";

function InvoicePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-4 py-8 w-full max-w-9xl mx-auto">


         

            {/* Cards */}
            <div className="">
  
            <Invoices/>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default  InvoicePage;
