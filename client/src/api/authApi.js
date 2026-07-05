import api from "./http";

export const authApi = {
  register: (payload) => api.post("/auth/register", payload),
  login: (payload) => api.post("/auth/login", payload),
  logout: () => api.post("/auth/logout"),
  profile: () => api.get("/auth/profile"),
  updateProfile: (payload) => api.put("/auth/profile", payload),
};
