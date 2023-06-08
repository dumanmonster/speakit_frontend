import { api } from "../index";

export type CreateTopic = {
  name: string;
  level: string;
  language: string;
};
export default {
  allTopics: () => api.get("/topics"),
  topicDefinitionsById: (id: string) => api.get(`/topics/definitions/${id}`),
  getTopic: (id: string) => api.get(`/topics/${id}`),
  deleteTopic: (id: string) => api.delete(`/topics/${id}`),
  create: (values: CreateTopic) => api.post("/topics", values),
  update: (id: string, values: CreateTopic) =>
    api.patch(`/topics/${id}`, values),
};
