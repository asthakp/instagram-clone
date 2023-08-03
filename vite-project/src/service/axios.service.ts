import axios from "axios";
import { errorToast } from "./toastify.service";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
export const postData = async (url: string, data: any) => {
  try {
    const response = await axios.post(`${SERVER_URL}/${url}`, data);
    return response.data;
  } catch (error: any) {
    errorToast(error.response.data.error);
  }
};

export const postDataWithJWT = async (url: string, data: any, token: any) => {
  try {
    const response = await axios.post(`${SERVER_URL}/${url}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    errorToast(error.response.data.error);
  }
};

export const getDataWithJWT = async (url: string, token: any) => {
  try {
    const response = await axios.get(`${SERVER_URL}/${url}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    errorToast(error.response.data.error);
  }
};

export const updateDataWithJWT = async (url: string, data: any, token: any) => {
  try {
    const response = await axios.patch(`${SERVER_URL}/${url}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};

export const deleteDataWithJWT = async (url: string, token: any) => {
  try {
    const response = await axios.delete(`${SERVER_URL}/${url}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const postFileInCloudinary = async (url: string, data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${url}`, data);
    return response.data;
  } catch (error: any) {
    errorToast(error);
  }
};
