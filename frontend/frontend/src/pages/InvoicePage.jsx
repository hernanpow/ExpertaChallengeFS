import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import CustomerSelector from '../components/CustomerSelector';
import InvoiceItemForm from '../components/InvoiceItemForm';
import InvoiceItemTable from '../components/InvoiceItemTable';
import useInvoiceForm from '../hooks/useInvoiceForm';

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
  } = useInvoiceForm();

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
          <CardHeader>
            <CardTitle className="text-lg">Customer</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomerSelector
              customers={customers}
              selectedCustomerId={selectedCustomerId}
              onCustomerChange={setSelectedCustomerId}
            />
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
          <CardHeader>
            <CardTitle className="text-lg">Invoice Items</CardTitle>
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

        {/* Submit Button */}
        <Button
          onClick={submitInvoice}
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading ? 'Submitting...' : 'Submit Invoice'}
        </Button>

      </div>
    </div>
  );
};

export default InvoicePage;