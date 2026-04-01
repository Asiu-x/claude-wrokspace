import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import ModelsListPage from '../pages/models/list';
import ModelDetailPage from '../pages/models/detail';
import DatasetsListPage from '../pages/datasets/list';
import DatasetDetailPage from '../pages/datasets/detail';
import CasesListPage from '../pages/cases/list';
import CaseDetailPage from '../pages/cases/detail';
import CapabilitiesListPage from '../pages/capabilities/list';
import CapabilityDetailPage from '../pages/capabilities/detail';
import Dashboard from '../pages/Dashboard';
import GraphPage from '../pages/Graph';

const basename = import.meta.env.VITE_BASE_PATH?.replace(/\/$/, '') || '';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/models',
    element: <ModelsListPage />,
  },
  {
    path: '/models/:id',
    element: <ModelDetailPage />,
  },
  {
    path: '/datasets',
    element: <DatasetsListPage />,
  },
  {
    path: '/datasets/:id',
    element: <DatasetDetailPage />,
  },
  {
    path: '/cases',
    element: <CasesListPage />,
  },
  {
    path: '/cases/:id',
    element: <CaseDetailPage />,
  },
  {
    path: '/capabilities',
    element: <CapabilitiesListPage />,
  },
  {
    path: '/capabilities/:id',
    element: <CapabilityDetailPage />,
  },
  {
    path: '/graph',
    element: <GraphPage />,
  },
], { basename });
