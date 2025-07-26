"use server";
import axios from 'axios';
import { cookies } from 'next/headers';
import { cache } from '../api/cache';
import { AnimeListStatusType } from '../types/AnimeListStatusType';

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
      } catch (refreshError: any) {
        console.error('Failed to refresh token, logging out.');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default malApi;

export const getUserDetails = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token');

  if (!accessToken?.value) {
    throw new Error('Access token not found');
  }

  const cacheKey = `user-details:${accessToken.value}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    console.log("Using cache for user details...");
    return cachedData;
  }

  console.log("No cache found for user details, fetching from API...")
  const response = await malApi.get('/users/@me?fields=id,name,picture,gender,birthday,location,joined_at,anime_statistics,time_szone,is_supporter');
  // Cache for 15 minutes
  cache.set(cacheKey, response.data, 15 * 60 * 1000);
  return response.data;
};

export const getUserAnimeList = async (status: AnimeListStatusType) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token');

  if (!accessToken?.value) {
    throw new Error('Access token not found');
  }

  const cacheKey = `user-animelist:${status}:${accessToken.value}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  console.log("No cache found for user animelist, fetching from API...")
  const response = await malApi.get(`/users/@me/animelist?fields=list_status,num_watched_episodes,num_episodes&limit=100&status=${status}`);
  // Cache for 15 minutes
  cache.set(cacheKey, response.data, 15 * 60 * 1000);
  return response.data;
};