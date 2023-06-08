import { api } from "..";

export default {
  getAll: () => api.get("/organizations"),
  getOne: (id: string) => api.get(`/organizations/${id}`),
};
