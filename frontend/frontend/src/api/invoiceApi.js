import axiosInstance from './axiosConfig';

const INVOICES_URL = '/api/invoices';

export const createInvoice = async (invoiceData) => {
  const response = await axiosInstance.post(INVOICES_URL, invoiceData);
  return response.data;
};