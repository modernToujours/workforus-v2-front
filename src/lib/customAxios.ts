import axios, { CreateAxiosDefaults } from 'axios';
import { getCookie } from 'cookies-next';

const customAxios = () => {
  const defaultOptions: CreateAxiosDefaults = {
    baseURL: `${process.env.NEXT_PUBLIC_API_ADDRESS}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('token'),
    },
  };

  const instance = axios.create(defaultOptions);

  return instance;
};

export default customAxios;
