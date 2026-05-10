import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const InvoiceItemTable = ({ items, onRemoveItem }) => {
  if (items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-4">
        No items added yet.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-right">Unit Price</TableHead>
          <TableHead className="text-right">Subtotal</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.productName}>
            <TableCell>{item.productName}</TableCell>
            <TableCell className="text-center">{item.quantity}</TableCell>
            <TableCell className="text-right">
              ${Number(item.unitPrice).toFixed(2)}
            </TableCell>
            <TableCell className="text-right">
              ${(item.quantity * item.unitPrice).toFixed(2)}
            </TableCell>
            <TableCell className="text-center">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onRemoveItem(item.productName)}
              >
                Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default InvoiceItemTable;