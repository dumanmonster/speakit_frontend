import { api } from "../index";
export type CreateDefinition = {
  word: string;
  description: string;
  level: string;
  topicId: string;
};
export default {
  allDefinitions: () => api.get("/definitions"),
  getDefinition: (id: string) => api.get(`/definitions/${id}`),
  create: (values: CreateDefinition) => api.post("/definitions", values),
  update: (id: string, values: CreateDefinition) =>
    api.patch(`/definitions/${id}`, values),
  remove: (id: string) => api.delete(`/definitions/${id}`),
};
