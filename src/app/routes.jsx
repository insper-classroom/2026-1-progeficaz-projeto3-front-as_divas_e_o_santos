import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "./pages/user/Login";
import Home from "./pages/user/Home";
import ProductDetail from "./pages/user/ProductDetail";
import Cadastro from "./pages/user/Cadastro";
import Perfil from "./pages/user/Perfil";
import Configuracoes from "./pages/user/Configuracoes";
import Sugestao from "./pages/user/Sugestao";
import Historico from "./pages/user/Historico";
import RecuperarSenha from "./pages/user/RecuperarSenha";

import Dashboard from "./pages/admin/Dashboard";
import Agendamentos from "./pages/admin/Agendamentos";
import Produtos from "./pages/admin/Produtos";
import CadastrarProduto from "./pages/admin/CadastrarProduto";
import EditarProduto from "./pages/admin/EditarProduto";

import RequireAuth from "./components/auth/RequireAuth";
import RequireAdmin from "./components/auth/RequireAdmin";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/recuperar-senha",
    element: <RecuperarSenha />,
  },
  {
    element: <RequireAuth />,
    children: [
      {
        path: "/produto/:id",
        element: <ProductDetail />,
      },
      {
        path: "/perfil",
        element: <Perfil />,
      },
      {
        path: "/configuracoes",
        element: <Configuracoes />,
      },
      {
        path: "/sugestao",
        element: <Sugestao />,
      },
      {
        path: "/historico",
        element: <Historico />,
      },
    ],
  },
  {
    path: "/admin",
    element: <RequireAdmin />,
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "agendamentos",
        element: <Agendamentos />,
      },
      {
        path: "produtos",
        element: <Produtos />,
      },
      {
        path: "produtos/cadastrar",
        element: <CadastrarProduto />,
      },
      {
        path: "produtos/editar/:id",
        element: <EditarProduto />,
      },
    ],
  },
]);