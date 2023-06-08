import { config } from "process";
import { api } from "../index";
import { AxiosRequestConfig } from "axios";

export default {
  userInfo: (email: string) => api.get(`/users/${email}`),
  updateUserPassword: (id: string, password: string) =>
    api.patch(`/users/${id}`, { password }),
  updateUserName: (id: string, name: string) =>
    api.patch(`/users/${id}`, { name }),
  deleteUser: (id: string) => api.delete(`/users/${id}`),
  getUsers: () => api.get("/users"),
};
