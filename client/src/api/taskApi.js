import api from "./http";

export const taskApi = {
  list: (params = {}) => api.get("/tasks", { params }),
  dashboard: () => api.get("/tasks/dashboard"),
  productivity: () => api.get("/tasks/productivity"),
  analytics: () => api.get("/tasks/analytics"),
  calendar: (params = {}) => api.get("/tasks/calendar", { params }),
  notifications: () => api.get("/tasks/notifications"),
  listAll: async (params = {}) => {
    const first = await api.get("/tasks", { params: { ...params, page: 1, limit: 100 } });
    const tasks = [...first.data.tasks];

    for (let page = 2; page <= first.data.pagination.pages; page += 1) {
      const next = await api.get("/tasks", { params: { ...params, page, limit: 100 } });
      tasks.push(...next.data.tasks);
    }

    return tasks;
  },
  create: (payload) => api.post("/tasks", payload),
  update: (id, payload) => api.put(`/tasks/${id}`, payload),
  remove: (id) => api.delete(`/tasks/${id}`),
  complete: (id, completed) => api.patch(`/tasks/${id}/complete`, { completed }),
};
