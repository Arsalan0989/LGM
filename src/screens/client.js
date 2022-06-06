import axios from 'axios';

export const axiosClient = axios.create({
  baseURL:"https://lgm.ug/lgm/api/",
});