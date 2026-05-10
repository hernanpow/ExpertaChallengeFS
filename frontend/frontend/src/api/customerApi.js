import axiosInstance from './axiosConfig';

const CUSTOMERS_URL = '/api/customers';

export const getCustomers = async () => {
  const response = await axiosInstance.get(CUSTOMERS_URL);
  return response.data;
};

export const createCustomer = async (customerData) => {
  const response = await axiosInstance.post(CUSTOMERS_URL, customerData);
  return response.data;
};