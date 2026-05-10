import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const CustomerSelector = ({ customers, selectedCustomerId, onCustomerChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="customer">Customer</Label>
      <Select
        value={selectedCustomerId}
        onValueChange={onCustomerChange}
      >
        <SelectTrigger id="customer" className="w-full">
          <SelectValue placeholder="Select a customer..." />
        </SelectTrigger>
        <SelectContent>
          {customers.map((customer) => (
            <SelectItem key={customer.id} value={String(customer.id)}>
              {customer.name} — {customer.email}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomerSelector;