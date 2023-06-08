import { api } from "../index";

export default {
  login: (values: { email: string; password: string }) =>
    api.post("/auth/login", values),
  register: (values: {
    name: string;
    email: string;
    password: string;
    language: string;
  }) => api.post("/auth/register", values),
};
