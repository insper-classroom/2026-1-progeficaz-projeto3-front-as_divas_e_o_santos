import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cadastro from './pages/Cadastro';
import Perfil from './pages/Perfil';
import Configuracoes from './pages/Configuracoes';
import Sugestao from './pages/Sugestao';
import Historico from './pages/Historico';

import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import Agendamentos from './pages/admin/Agendamentos';
import Produtos from './pages/admin/Produtos';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/produto/:id',
    element: <ProductDetail />,
  },
  {
    path: '/cadastro',
    element: <Cadastro />,
  },
  {
    path: '/perfil',
    element: <Perfil />,
  },
  {
    path: '/configuracoes',
    element: <Configuracoes />,
  },
  {
    path: '/sugestao',
    element: <Sugestao />,
  },
  {
    path: '/historico',
    element: <Historico />,
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/admin/agendamentos',
    element: <Agendamentos />,
  },
  {
    path: '/admin/produtos',
    element: <Produtos />,
  },
]);