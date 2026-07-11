import api from "../api/axios";

export const getCandidates = async () => {
  const response = await api.get("/candidates/");
  return response.data;
};

export const getCandidate = async (id: number) => {
  const response = await api.get(`/candidates/${id}`);
  return response.data;
};

export const deleteCandidate = async (id: number) => {
  const response = await api.delete(`/candidates/${id}`);
  return response.data;
};

export const getRanking = async () => {
  const response = await api.get("/candidates/ranking/list");
  return response.data;
};
