const AUTH_KEY = "insper_auth_user";

const readUser = () => {
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem(AUTH_KEY);
    return null;
  }
};

export const signIn = (user) => {
  const payload = {
    id: String(user?.id ?? user?._id ?? ""),
    nome: user?.nome ?? user?.name ?? "",
    email: user?.email ?? "",
    isAdmin: Boolean(user?.isAdmin),
  };

  localStorage.setItem(AUTH_KEY, JSON.stringify(payload));
  return payload;
};

export const signOut = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const currentUser = () => readUser();

export const isAuthenticated = () => Boolean(readUser());

export const isCurrentUserAdmin = () => Boolean(readUser()?.isAdmin);