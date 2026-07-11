import api from "../api/axios";

export const searchResume = async (query: string) => {
  const response = await api.get("/documents/search", {
    params: {
      query,
    },
  });

  return response.data;
};