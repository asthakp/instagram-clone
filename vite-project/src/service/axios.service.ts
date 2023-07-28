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

export const postDataWithJWT = async (
  url: string,
  data: string,
  token: string
) => {
  try {
    const response = await axios.post(`${SERVER_URL}/${url}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    errorToast(error.response.data.message);
  }
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const postFileInCloudinary = async (url: string, data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${url}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
