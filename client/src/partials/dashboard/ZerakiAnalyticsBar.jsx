import React from 'react';
import BarChart01 from '../../charts/BarChart01';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function ZerakiAnalyticsBar() {

  const chartData = {
    labels: ['Primary', 'Secondary', 'IGCSE'],
    datasets: [
      {
        label: 'Zeraki Analytics',
        data: [1200, 2300, 800], // Example data for each school type
        backgroundColor: [
          tailwindConfig().theme.colors.blue[400],
          tailwindConfig().theme.colors.green[400],
          tailwindConfig().theme.colors.purple[400],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors.blue[500],
          tailwindConfig().theme.colors.green[500],
          tailwindConfig().theme.colors.purple[500],
        ],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Zeraki Analytics Sign-ups by School Type</h2>
      </header>
      <BarChart01 data={chartData} width={595} height={248} />
    </div>
  );
}

export default ZerakiAnalyticsBar;
