import { createBrowserRouter } from 'react-router-dom';

import Login from './pages/user/Login';
import Home from './pages/user/Home';
import ProductDetail from './pages/user/ProductDetail';
import Cadastro from './pages/user/Cadastro';
import Perfil from './pages/user/Perfil';
import Configuracoes from './pages/user/Configuracoes';
import Sugestao from './pages/user/Sugestao';
import Historico from './pages/user/Historico';
import RecuperarSenha from './pages/user/RecuperarSenha';

import Dashboard from './pages/admin/Dashboard';
import Agendamentos from './pages/admin/Agendamentos';
import Produtos from './pages/admin/Produtos';
import EditarProduto from './pages/admin/EditarProduto';
import CadastrarProduto from './pages/admin/CadastrarProduto';

import RequireAuth from './components/auth/RequireAuth';

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
    path: '/cadastro',
    element: <Cadastro />,
  },
  {
    path: '/recuperar-senha',
    element: <RecuperarSenha />,
  },
  {
    element: <RequireAuth />,
    children: [
      {
        path: 'produto/:id',
        element: <ProductDetail />,
      },
      {
        path: 'perfil',
        element: <Perfil />,
      },
      {
        path: 'configuracoes',
        element: <Configuracoes />,
      },
      {
        path: 'sugestao',
        element: <Sugestao />,
      },
      {
        path: 'historico',
        element: <Historico />,
      },
    ],
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
  {
    path: '/admin/produtos/editar/:id',
    element: <EditarProduto />,
  },
  {
    path: '/admin/produtos/cadastrar',
    element: <CadastrarProduto />,
  },
]);