import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail, ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "How do I track my order?", a: "Go to My Orders and click on any active order to see real-time tracking with delivery partner location." },
  { q: "How can I cancel an order?", a: "You can cancel within 60 seconds of placing. After that, contact support for assistance." },
  { q: "What payment methods are accepted?", a: "We accept UPI, credit/debit cards, net banking, wallets via Razorpay, and Cash on Delivery." },
  { q: "How do I apply a coupon?", a: "Add items to cart, go to checkout, and enter your coupon code in the Apply Coupon section." },
];

export default function SupportPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1 max-w-3xl">
        <h1 className="font-display text-2xl font-bold mb-2">Help & Support</h1>
        <p className="text-muted-foreground mb-8">We're here to help you with anything</p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <MessageCircle className="w-6 h-6 text-primary mx-auto mb-2" />
            <h3 className="font-display font-semibold text-sm">Live Chat</h3>
            <p className="text-xs text-muted-foreground mt-1">Chat with support</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <Phone className="w-6 h-6 text-success mx-auto mb-2" />
            <h3 className="font-display font-semibold text-sm">Call Us</h3>
            <p className="text-xs text-muted-foreground mt-1">1800-123-4567</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 text-center">
            <Mail className="w-6 h-6 text-info mx-auto mb-2" />
            <h3 className="font-display font-semibold text-sm">Email</h3>
            <p className="text-xs text-muted-foreground mt-1">support@zomato.com</p>
          </div>
        </div>

        <h2 className="font-display font-semibold text-lg mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left">
                <span className="font-medium text-sm">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <div className="px-4 pb-4 text-sm text-muted-foreground">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
