import api from "../api/axios";

export const getUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

export const getResumes = async () => {
  const response = await api.get("/admin/resumes");
  return response.data;
};

export const getDocuments = async () => {
  const response = await api.get("/admin/documents");
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await api.delete(`/admin/user/${id}`);
  return response.data;
};

export const deleteResume = async (id: number) => {
  const response = await api.delete(`/admin/resume/${id}`);
  return response.data;
};