import { useParams, Link } from "react-router-dom";
import { sampleOrders } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Printer } from "lucide-react";

export default function InvoicePage() {
  const { id } = useParams<{ id: string }>();
  const order = sampleOrders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Invoice not found</p>
          <Link to="/orders"><Button variant="outline">Back to Orders</Button></Link>
        </div>
      </div>
    );
  }

  const subtotal = order.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.05);
  const deliveryFee = 30;
  const grandTotal = subtotal + tax + deliveryFee;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <Link to="/orders" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Orders
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => window.print()} className="gap-1.5">
              <Printer className="w-4 h-4" /> Print
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="w-4 h-4" /> Download
            </Button>
          </div>
        </div>

        {/* Invoice Card */}
        <div className="bg-card rounded-xl border border-border p-8 print:shadow-none print:border-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-8 border-b border-border pb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-display font-bold text-xs">FF</span>
                </div>
                <span className="font-display font-bold text-lg">Feast Finder</span>
              </div>
              <p className="text-xs text-muted-foreground">Food Delivery Platform</p>
            </div>
            <div className="text-right">
              <h2 className="font-display text-2xl font-bold text-primary">INVOICE</h2>
              <p className="text-sm text-muted-foreground mt-1">#{order.id}</p>
              <p className="text-xs text-muted-foreground">{order.date}</p>
            </div>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="text-xs uppercase text-muted-foreground font-semibold mb-1">Restaurant</h4>
              <p className="font-medium text-sm">{order.restaurantName}</p>
            </div>
            <div>
              <h4 className="text-xs uppercase text-muted-foreground font-semibold mb-1">Delivery Address</h4>
              <p className="text-sm text-muted-foreground">{order.address}</p>
            </div>
            <div>
              <h4 className="text-xs uppercase text-muted-foreground font-semibold mb-1">Payment Method</h4>
              <p className="text-sm">{order.paymentMethod}</p>
            </div>
            <div>
              <h4 className="text-xs uppercase text-muted-foreground font-semibold mb-1">Status</h4>
              <p className="text-sm capitalize">{order.status.replace(/_/g, " ")}</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="border border-border rounded-lg overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left py-3 px-4 font-semibold text-xs uppercase text-muted-foreground">Item</th>
                  <th className="text-center py-3 px-4 font-semibold text-xs uppercase text-muted-foreground">Qty</th>
                  <th className="text-right py-3 px-4 font-semibold text-xs uppercase text-muted-foreground">Price</th>
                  <th className="text-right py-3 px-4 font-semibold text-xs uppercase text-muted-foreground">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="py-3 px-4 font-medium">{item.name}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{item.qty}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">₹{item.price}</td>
                    <td className="py-3 px-4 text-right font-medium">₹{item.price * item.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">GST (5%)</span>
                <span>₹{tax}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between font-display font-bold text-base border-t border-border pt-2">
                <span>Grand Total</span>
                <span className="text-primary">₹{grandTotal}</span>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8">Thank you for ordering with Feast Finder!</p>
        </div>
      </div>
    </div>
  );
}
