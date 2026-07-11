import api from "../api/axios";

export const getChatHistory = async () => {
  const response = await api.get("/chat/");
  return response.data;
};

export const deleteChatHistory = async () => {
  const response = await api.delete("/chat/");
  return response.data;
};