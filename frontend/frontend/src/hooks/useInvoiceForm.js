import { useState, useEffect } from 'react';
import { getCustomers } from '../api/customerApi';
import { createInvoice } from '../api/invoiceApi';

const useInvoiceForm = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (err) {
      setError('Error loading customers. Please try again.');
    }
  };

  const addItem = (newItem) => {
    const isDuplicate = items.some(
      (item) =>
        item.productName.trim().toLowerCase() ===
        newItem.productName.trim().toLowerCase()
    );

    if (isDuplicate) {
      setError(`Product "${newItem.productName}" is already added to the invoice.`);
      return false;
    }

    setItems((prev) => [...prev, newItem]);
    setError(null);
    return true;
  };

  const removeItem = (productName) => {
    setItems((prev) =>
      prev.filter((item) => item.productName !== productName)
    );
  };

  const calculateTotal = () => {
    return items.reduce(
      (acc, item) => acc + item.quantity * item.unitPrice,
      0
    );
  };

  const validateForm = () => {
    if (!selectedCustomerId) {
      setError('Please select a customer.');
      return false;
    }
    if (items.length === 0) {
      setError('Please add at least one item to the invoice.');
      return false;
    }
    return true;
  };

  const submitInvoice = async () => {
    setError(null);
    setSuccess(false);

    if (!validateForm()) return;

    const invoiceData = {
      customerId: Number(selectedCustomerId),
      items: items.map((item) => ({
        productName: item.productName,
        quantity: Number(item.quantity),
        unitPrice: Number(item.unitPrice),
      })),
    };

    try {
      setLoading(true);
      await createInvoice(invoiceData);
      setSuccess(true);
      setItems([]);
      setSelectedCustomerId('');
    } catch (err) {
      const message = err.response?.data?.message || 'Error submitting invoice.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    customers,
    selectedCustomerId,
    setSelectedCustomerId,
    items,
    error,
    success,
    loading,
    addItem,
    removeItem,
    calculateTotal,
    submitInvoice,
  };
};

export default useInvoiceForm;