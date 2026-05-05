const STORAGE_KEY = "insper_user_logged_id";

export const signIn = (userId) => {
  if (!userId) {
    throw new Error("signIn precisa receber o id do usuário");
  }

  localStorage.setItem(STORAGE_KEY, userId);
};

export const signOut = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const isAuthenticated = () => {
  return localStorage.getItem(STORAGE_KEY) !== null;
};

export const getAuthUserId = () => {
  return localStorage.getItem(STORAGE_KEY);
};