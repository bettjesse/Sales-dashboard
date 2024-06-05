import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

import SchoolManagement from './pages/SchoolManagement';
import Dashboard from './pages/Dashboard';
import SchoolDetails from './partials/school/SchoolDetails';
import SchoolDetail from './pages/SchoolDetail';
import InvoicePage from './pages/InvoicesPage';
import Collections from './pages/Collections';
import { ToastContainer } from 'react-toastify';


function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/schools" element={<SchoolManagement/>} />
        <Route exact path="/schools/:schoolId" element={<SchoolDetail/>} />
      
        <Route exact path="/invoices" element={<InvoicePage/>} />
        <Route exact path="/collections" element={<Collections/>} />

      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;
