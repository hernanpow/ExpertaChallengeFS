import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const INITIAL_STATE = {
  productName: '',
  quantity: '',
  unitPrice: '',
};

const InvoiceItemForm = ({ onAddItem }) => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [validationError, setValidationError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.productName.trim()) {
      setValidationError('Product name is required.');
      return false;
    }
    if (!formData.quantity || Number(formData.quantity) <= 0) {
      setValidationError('Quantity must be greater than zero.');
      return false;
    }
    if (!formData.unitPrice || Number(formData.unitPrice) <= 0) {
      setValidationError('Unit price must be greater than zero.');
      return false;
    }
    return true;
  };

  const handleAdd = () => {
    setValidationError(null);
    if (!validate()) return;

    const added = onAddItem({
      productName: formData.productName.trim(),
      quantity: Number(formData.quantity),
      unitPrice: Number(formData.unitPrice),
    });

    if (added) setFormData(INITIAL_STATE);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="productName">Product Name</Label>
        <Input
          id="productName"
          name="productName"
          placeholder="Enter product name"
          value={formData.productName}
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            placeholder="0"
            min={1}
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <Label htmlFor="unitPrice">Unit Price</Label>
          <Input
            id="unitPrice"
            name="unitPrice"
            type="number"
            placeholder="0.00"
            min={0.01}
            step={0.01}
            value={formData.unitPrice}
            onChange={handleChange}
          />
        </div>
      </div>

      {validationError && (
        <p className="text-sm text-red-500">{validationError}</p>
      )}

      <Button onClick={handleAdd} className="w-full">
        Add Item
      </Button>
    </div>
  );
};

export default InvoiceItemForm;