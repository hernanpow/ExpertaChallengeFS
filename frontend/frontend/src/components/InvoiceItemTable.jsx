import { motion, AnimatePresence } from 'framer-motion';
import { PackageOpen } from 'lucide-react';
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
      <div className="flex flex-col items-center justify-center py-10 text-gray-400 gap-2">
        <PackageOpen size={40} />
        <p className="text-sm font-medium">No items added yet</p>
        <p className="text-xs">Add a product using the form above</p>
      </div>
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
        <AnimatePresence>
          {items.map((item) => (
            <motion.tr
              key={item.productName}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="border-b"
            >
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
            </motion.tr>
          ))}
        </AnimatePresence>
      </TableBody>
    </Table>
  );
};

export default InvoiceItemTable;