import api from "@/services/api";

const ROOT = "/word";

const url = (path) => `${ROOT}/${path}`;

const URLS = {
  search: url(""),
  save: (wordId) => url(`${wordId}/save`),
  unsave: (wordId) => url(`${wordId}/unsave`),
};

export const fetchWords = async (params) => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      queryParams.append(key, value);
    }
  });

  const response = await api.get(URLS.search, { params: queryParams });
  return response.data;
};

export const saveWord = async (wordId, notes) => {
  const response = await api.post(URLS.save(wordId), { notes });
  return response.data;
};

export const unsaveWord = async (wordId) => {
  const response = await api.delete(URLS.unsave(wordId));
  return response.data;
};
