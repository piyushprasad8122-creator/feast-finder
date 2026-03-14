import Navbar from "@/components/Navbar";
import { Bell, Package, Tag, Star, Truck, Check } from "lucide-react";
import { motion } from "framer-motion";

const notifications = [
  { id: "1", type: "order", icon: Package, title: "Order Delivered!", message: "Your order from Paradise Biryani has been delivered.", time: "5 min ago", read: false },
  { id: "2", type: "promo", icon: Tag, title: "50% OFF on your next order!", message: "Use code FEAST50 to get 50% off up to ₹120.", time: "1 hour ago", read: false },
  { id: "3", type: "delivery", icon: Truck, title: "Order Out for Delivery", message: "Your order from Burger Junction is on its way!", time: "2 hours ago", read: true },
  { id: "4", type: "review", icon: Star, title: "Rate your order", message: "How was your meal from Italiano Kitchen? Leave a review.", time: "Yesterday", read: true },
  { id: "5", type: "promo", icon: Tag, title: "Free Delivery Weekend", message: "Enjoy free delivery on all orders this weekend!", time: "2 days ago", read: true },
  { id: "6", type: "order", icon: Check, title: "Order Confirmed", message: "Your order #ORD003 has been confirmed and is being prepared.", time: "3 days ago", read: true },
];

const iconColors: Record<string, string> = {
  order: "bg-success/10 text-success",
  promo: "bg-primary/10 text-primary",
  delivery: "bg-info/10 text-info",
  review: "bg-accent/10 text-accent",
};

export default function NotificationsPage() {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-primary" />
            <h1 className="font-display text-2xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>
            )}
          </div>
          <button className="text-sm text-primary hover:underline">Mark all as read</button>
        </div>

        <div className="space-y-3">
          {notifications.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${
                n.read ? "bg-card border-border" : "bg-primary/5 border-primary/20"
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${iconColors[n.type]}`}>
                <n.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">{n.title}</h3>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
