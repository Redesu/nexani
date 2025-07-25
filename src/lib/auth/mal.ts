"use server";
import axios from 'axios';
import { cookies } from 'next/headers';

const malApi = axios.create({
  baseURL: 'https://api.myanimelist.net/v2',
});

malApi.interceptors.request.use(
  async (config) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken.value}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

malApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post('/api/auth/refresh');
        return malApi(originalRequest);
      } catch (refreshError) {
        console.error('Failed to refresh token, logging out.');
        window.location.href = '/api/auth/logout'; 
        return Promise.reject(refreshError);
      }
    }

        return Promise.reject(error);
  }
);

export default malApi;

export const getUserDetails = async () => {
  const response = await malApi.get('/users/@me');
  return response.data;
};

export const getUserAnimeList = async (status: string) => {
  const response = await malApi.get(`/users/@me/animelist?status=${status}&limit=100`);
  return response.data;
};