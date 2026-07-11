import api from "../api/axios";

export const uploadResume = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/resume/analyze", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const matchResume = async (
  candidateId: number,
  jobDescription: string
) => {
  const formData = new FormData();

  formData.append("job_description", jobDescription);

  const response = await api.post(
    `/resume/match/${candidateId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};