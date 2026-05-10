import { useState } from 'react';
import CustomerForm from '../components/CustomerForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import CustomerSelector from '../components/CustomerSelector';
import InvoiceItemForm from '../components/InvoiceItemForm';
import InvoiceItemTable from '../components/InvoiceItemTable';
import useInvoiceForm from '../hooks/useInvoiceForm';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const InvoicePage = () => {
    
  const {
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
    addCustomer
  } = useInvoiceForm();

  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl flex flex-col gap-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoice Management</h1>
          <p className="text-gray-500 mt-1">Create and manage your invoices</p>
        </div>

        {/* Alerts */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="border-green-500 text-green-700 bg-green-50">
            <AlertDescription>Invoice submitted successfully!</AlertDescription>
          </Alert>
        )}
        {/* Customer Selector */}
        <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Customer</CardTitle>
            <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCustomerForm((prev) => !prev)}
            >
            {showCustomerForm ? 'Cancel' : '+ Add Customer'}
            </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
            <CustomerSelector
            customers={customers}
            selectedCustomerId={selectedCustomerId}
            onCustomerChange={setSelectedCustomerId}
            />
            {showCustomerForm && (
            <CustomerForm
                onCustomerCreated={(newCustomer) => {
                addCustomer(newCustomer);
                setShowCustomerForm(false);
                }}
                onCancel={() => setShowCustomerForm(false)}
            />
            )}
        </CardContent>
        </Card>

        {/* Invoice Item Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add Item</CardTitle>
          </CardHeader>
          <CardContent>
            <InvoiceItemForm onAddItem={addItem} />
          </CardContent>
        </Card>

        {/* Invoice Items Table */}
        <Card>
           <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">
                  Invoice Items
                 </CardTitle>
            {items.length > 0 && (
      <Badge variant="secondary">
        {items.length} {items.length === 1 ? 'item' : 'items'}
      </Badge>
    )}
  </CardHeader>
          <CardContent>
            <InvoiceItemTable
              items={items}
              onRemoveItem={removeItem}
            />

            {/* Total */}
            {items.length > 0 && (
              <div className="flex justify-end mt-4 pt-4 border-t">
                <p className="text-lg font-bold text-gray-900">
                  Total: ${calculateTotal().toFixed(2)}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Button
  onClick={() => setShowConfirmDialog(true)}
  disabled={loading}
  className="w-full"
  size="lg"
>
  Submit Invoice
</Button>

    {/* Confirm Dialog */}
    <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>Confirm Invoice</DialogTitle>
        <DialogDescription>
            You are about to submit an invoice with{' '}
            <strong>{items.length} {items.length === 1 ? 'item' : 'items'}</strong>{' '}
            for a total of{' '}
            <strong>${calculateTotal().toFixed(2)}</strong>.
            Are you sure you want to proceed?
        </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
        <Button
            variant="outline"
            onClick={() => setShowConfirmDialog(false)}
        >
            Cancel
        </Button>
        <Button
            onClick={() => {
            setShowConfirmDialog(false);
            submitInvoice();
            }}
            disabled={loading}
        >
            {loading ? 'Submitting...' : 'Confirm'}
        </Button>
        </DialogFooter>
    </DialogContent>
    </Dialog>

      </div>
    </div>
  );
};

export default InvoicePage;