import { adminStats, sampleOrders, restaurants } from "@/data/mock";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, Store, Package, TrendingUp, IndianRupee, Truck, Star, LogOut, ChevronRight, Plus } from "lucide-react";

const statCards = [
  { label: "Today's Orders", value: adminStats.ordersToday, icon: Package, color: "text-primary" },
  { label: "Today's Revenue", value: `₹${(adminStats.revenueToday / 1000).toFixed(1)}K`, icon: IndianRupee, color: "text-success" },
  { label: "Active Users", value: adminStats.activeUsers.toLocaleString(), icon: Users, color: "text-info" },
  { label: "Restaurants", value: adminStats.activeRestaurants, icon: Store, color: "text-accent" },
  { label: "Delivery Partners", value: adminStats.deliveryPartners, icon: Truck, color: "text-warning" },
  { label: "Avg Rating", value: adminStats.avgRating, icon: Star, color: "text-accent" },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (user?.role !== "admin") {
    return <div className="min-h-screen flex items-center justify-center"><div className="text-center"><p className="text-muted-foreground mb-4">Admin access required</p><Link to="/login"><Button>Login as Admin</Button></Link></div></div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin navbar */}
      <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm h-14 flex items-center px-6 justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-xs">Z</span>
          </div>
          <span className="font-display font-bold">Admin Panel</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{user.name}</span>
          <Button variant="ghost" size="icon" onClick={() => { logout(); navigate("/"); }}><LogOut className="w-4 h-4" /></Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground text-sm">Welcome back, {user.name}</p>
          </div>
          <Button className="gradient-primary text-primary-foreground gap-2"><Plus className="w-4 h-4" /> Add Restaurant</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {statCards.map(s => (
            <div key={s.label} className="bg-card rounded-xl border border-border p-4">
              <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
              <p className="font-display font-bold text-xl">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Revenue chart placeholder */}
        <div className="bg-card rounded-xl border border-border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold flex items-center gap-2"><BarChart3 className="w-5 h-5 text-primary" /> Revenue Overview</h2>
            <select className="text-sm bg-muted rounded-lg px-3 py-1.5 border-0">
              <option>Last 7 days</option><option>Last 30 days</option><option>This month</option>
            </select>
          </div>
          <div className="h-48 bg-muted rounded-lg flex items-center justify-center text-muted-foreground text-sm">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-success" />
              <p>Revenue chart (Recharts)</p>
              <p className="text-xs mt-1">Total: ₹{(adminStats.totalRevenue / 100000).toFixed(1)}L</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Recent orders */}
          <div className="bg-card rounded-xl border border-border p-4">
            <h3 className="font-display font-semibold mb-4">Recent Orders</h3>
            <div className="space-y-3">
              {sampleOrders.map(o => (
                <div key={o.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium text-sm">{o.id}</p>
                    <p className="text-xs text-muted-foreground">{o.restaurantName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">₹{o.total}</p>
                    <p className="text-xs text-muted-foreground capitalize">{o.status.replace(/_/g, " ")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Restaurants */}
          <div className="bg-card rounded-xl border border-border p-4">
            <h3 className="font-display font-semibold mb-4">Top Restaurants</h3>
            <div className="space-y-3">
              {restaurants.slice(0, 5).map(r => (
                <div key={r.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                  <img src={r.image} alt={r.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.cuisine.join(", ")}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3 h-3 text-accent fill-accent" />{r.rating}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
