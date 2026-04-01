import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home/index';
import ModelsListPage from './pages/models/list';
import ModelDetailPage from './pages/models/detail';
import DatasetsListPage from './pages/datasets/list';
import DatasetDetailPage from './pages/datasets/detail';
import CasesListPage from './pages/cases/list';
import CaseDetailPage from './pages/cases/detail';
import CapabilitiesListPage from './pages/capabilities/list';
import CapabilityDetailPage from './pages/capabilities/detail';
import GraphPage from './pages/Graph';

function AppContent() {
  const location = useLocation();
  const isCaseDetail = /^\/cases\/[^/]+$/.test(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <Navbar />
      <main className="mt-16 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/models" element={<ModelsListPage />} />
          <Route path="/models/:id" element={<ModelDetailPage />} />
          <Route path="/datasets" element={<DatasetsListPage />} />
          <Route path="/datasets/:id" element={<DatasetDetailPage />} />
          <Route path="/cases" element={<CasesListPage />} />
          <Route path="/cases/:id" element={<CaseDetailPage />} />
          <Route path="/capabilities" element={<CapabilitiesListPage />} />
          <Route path="/capabilities/:id" element={<CapabilityDetailPage />} />
          <Route path="/graph" element={<GraphPage />} />
        </Routes>
      </main>
      {!isCaseDetail && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router basename={import.meta.env.VITE_BASE_PATH?.replace(/\/$/, '') || ''}>
      <AppContent />
    </Router>
  );
}

export default App;
