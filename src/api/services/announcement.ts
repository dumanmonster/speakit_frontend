import { api } from "../index";

export default {
  getAll: () => api.get("/announcements"),
  getOne: (id: string) => api.get(`/announcements/${id}`),
};
  