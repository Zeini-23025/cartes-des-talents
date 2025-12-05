import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api", // toutes tes routes commencent par /api
});

// --- AUTH ---
export const register = (data) => api.post("/users/register", data);
export const login = (data) => api.post("/users/login", data);
export const getMyProfile = (token) =>
  api.get("/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });


// --- COLLABORATORS ---
export const findCollaborators = (filters) =>
  api.get("/collaborators", { params: filters });


// --- SEARCH ---
export const searchUsers = (query) =>
  api.get("/search", { params: query });


// --- TALENTS ---
export const getTalents = () => api.get("/talents");
export const getTalentMap = () => api.get("/talents/map");
export const createTalent = (data) => api.post("/talents", data);
export const verifyTalent = (id) => api.patch(`/talents/${id}/verify`);


// --- PROJETS ---
export const getProjets = () => api.get("/projets");
export const createProjet = (data) => api.post("/projets", data);
