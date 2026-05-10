import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { createCustomer } from '../api/customerApi';

const INITIAL_STATE = {
  name: '',
  email: '',
  address: '',
};

const CustomerForm = ({ onCustomerCreated, onCancel }) => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [validationError, setValidationError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.name.trim()) {
      setValidationError('Name is required.');
      return false;
    }
    if (!formData.email.trim()) {
      setValidationError('Email is required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setValidationError('Email format is invalid.');
      return false;
    }
    if (!formData.address.trim()) {
      setValidationError('Address is required.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setValidationError(null);
    if (!validate()) return;

    try {
      setLoading(true);
      const newCustomer = await createCustomer(formData);
      setFormData(INITIAL_STATE);
      onCustomerCreated(newCustomer);
    } catch (err) {
      const message = err.response?.data?.message || 'Error creating customer.';
      setValidationError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 pt-4 border-t mt-4">
      <p className="text-sm font-medium text-gray-700">New Customer</p>

      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter customer name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter customer email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          placeholder="Enter customer address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      {validationError && (
        <p className="text-sm text-red-500">{validationError}</p>
      )}

      <div className="flex gap-2">
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1"
        >
          {loading ? 'Saving...' : 'Save Customer'}
        </Button>
        <Button
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CustomerForm;