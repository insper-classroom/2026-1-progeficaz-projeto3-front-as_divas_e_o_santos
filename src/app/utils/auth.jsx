import {
  clearCurrentUserId,
  getCurrentBackendUser,
  setCurrentUserId,
} from "../../data/user";

export const signIn = (userId) => {
  setCurrentUserId(userId);
};

export const signOut = () => {
  clearCurrentUserId();
};

export const isAuthenticated = () => {
  return Boolean(getCurrentBackendUser());
};

export const getAuthUser = () => {
  return getCurrentBackendUser();
};