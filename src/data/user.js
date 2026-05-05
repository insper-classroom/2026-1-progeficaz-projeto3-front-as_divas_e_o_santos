export const backendUsers = [
  {
    _id: "000000000000000000000001",
    nome: "Ana Silva",
    email: "ana@email.com",
    senha_hash:
      "scrypt:32768:8:1$53o5YhnLTwD72933$daef71aadf13cbf303415b58f871307c3f9284c3a9a0d5384d797203546c75f82b00c412cb189cf2bf0d824696cb3627f12ddbb39f2562391db7b0d8d4e1b6ec",
    email_codigo: "834721",
    codigo_expira: "2026-04-28T20:00:00Z",
    notificacoes_push: false,
    promocoes_email: false,
  },
  {
    _id: "000000000000000000000002",
    nome: "João Silva",
    email: "joao.silva@insper.edu.br",
    senha_hash: "",
    email_codigo: "",
    codigo_expira: null,
    notificacoes_push: true,
    promocoes_email: true,
  },
];

export const getBackendUserById = (id) => {
  return backendUsers.find((user) => user._id === id) ?? null;
};

export const getBackendUserByEmail = (email) => {
  const normalizedEmail = email.trim().toLowerCase();
  return (
    backendUsers.find(
      (user) => user.email.trim().toLowerCase() === normalizedEmail
    ) ?? null
  );
};

export const getCurrentUserId = () => {
  return localStorage.getItem("insper_user_logged_id");
};

export const setCurrentUserId = (id) => {
  localStorage.setItem("insper_user_logged_id", id);
};

export const clearCurrentUserId = () => {
  localStorage.removeItem("insper_user_logged_id");
};

export const getCurrentBackendUser = () => {
  const currentUserId = getCurrentUserId();
  if (!currentUserId) return null;
  return getBackendUserById(currentUserId);
};

export const currentUser = () => {
  const user = getCurrentBackendUser();
  if (!user) return null;

  return {
    id: user._id,
    nome: user.nome,
    email: user.email,
    notificacoes_push: user.notificacoes_push,
    promocoes_email: user.promocoes_email,
  };
};