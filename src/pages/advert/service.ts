import { client } from "../../api/client";
import type { Advert } from "./types";

const ADVERTS_URL = "/v1/adverts";

export const getLatestAdverts = async () => {
  const response = await client.get<Advert[]>(ADVERTS_URL);
  return response.data;
};

export const getAdvert = async (advertId: string) => {
  const url = `${ADVERTS_URL}/${advertId}`;
  const response = await client.get<Advert>(url);
  return response.data;
};

export const createAdvert = async (formData: FormData) => {
  const response = await client.post<Advert>(ADVERTS_URL, formData);
  return response.data;
};

export const deleteAdvert = async (AdvertId: string) => {
  const response = await client.get(`/api/v1/adverts/${AdvertId}`);
  return response.data;
};

export const getTags = async () => {
  const response = await client.get("/api/v1/adverts/tags");
  return response.data;
};
