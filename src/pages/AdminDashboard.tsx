import { useState } from "react";
import { adminStats, sampleOrders, restaurants } from "@/data/mock";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, Store, Package, TrendingUp, IndianRupee, Truck, Star, LogOut, Plus, PieChart, Activity } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, PieChart as RePieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";

const revenueData = [
  { day: "Mon", revenue: 12400, orders: 34 },
  { day: "Tue", revenue: 15800, orders: 42 },
  { day: "Wed", revenue: 11200, orders: 28 },
  { day: "Thu", revenue: 18900, orders: 51 },
  { day: "Fri", revenue: 22100, orders: 63 },
  { day: "Sat", revenue: 28500, orders: 78 },
  { day: "Sun", revenue: 24300, orders: 67 },
];

const cuisineDistribution = [
  { name: "North Indian", value: 32 },
  { name: "Chinese", value: 22 },
  { name: "Italian", value: 15 },
  { name: "South Indian", value: 18 },
  { name: "Burgers", value: 13 },
];

const monthlyGrowth = [
  { month: "Jan", users: 5200, restaurants: 120 },
  { month: "Feb", users: 5800, restaurants: 128 },
  { month: "Mar", users: 6400, restaurants: 135 },
  { month: "Apr", users: 7200, restaurants: 141 },
  { month: "May", users: 7900, restaurants: 148 },
  { month: "Jun", users: 8934, restaurants: 156 },
];

const orderStatusData = [
  { name: "Delivered", value: 68 },
  { name: "Preparing", value: 15 },
  { name: "In Transit", value: 12 },
  { name: "Cancelled", value: 5 },
];

const PIE_COLORS = ["hsl(var(--primary))", "hsl(var(--warning))", "hsl(var(--info))", "hsl(var(--success))", "hsl(var(--accent))"];
const STATUS_COLORS = ["hsl(var(--success))", "hsl(var(--warning))", "hsl(var(--info))", "hsl(var(--destructive))"];

const statCards = [
  { label: "Today's Orders", value: adminStats.ordersToday, icon: Package, color: "text-primary", bg: "bg-primary/10" },
  { label: "Today's Revenue", value: `₹${(adminStats.revenueToday / 1000).toFixed(1)}K`, icon: IndianRupee, color: "text-success", bg: "bg-success/10" },
  { label: "Active Users", value: adminStats.activeUsers.toLocaleString(), icon: Users, color: "text-info", bg: "bg-info/10" },
  { label: "Restaurants", value: adminStats.activeRestaurants, icon: Store, color: "text-accent", bg: "bg-accent/10" },
  { label: "Delivery Partners", value: adminStats.deliveryPartners, icon: Truck, color: "text-warning", bg: "bg-warning/10" },
  { label: "Avg Rating", value: adminStats.avgRating, icon: Star, color: "text-accent", bg: "bg-accent/10" },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("7days");

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Admin access required</p>
          <Link to="/login"><Button>Login as Admin</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm h-14 flex items-center px-6 justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-xs">FF</span>
          </div>
          <span className="font-display font-bold">Feast Finder Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{user.name}</span>
          <Button variant="ghost" size="icon" onClick={() => { logout(); navigate("/"); }}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground text-sm">Welcome back, {user.name}</p>
          </div>
          <Button className="gradient-primary text-primary-foreground gap-2">
            <Plus className="w-4 h-4" /> Add Restaurant
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {statCards.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl border border-border p-4 hover:shadow-card transition-shadow"
            >
              <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon className={`w-4.5 h-4.5 ${s.color}`} />
              </div>
              <p className="font-display font-bold text-xl">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl border border-border p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" /> Revenue Overview
            </h2>
            <select
              value={timeRange}
              onChange={e => setTimeRange(e.target.value)}
              className="text-sm bg-muted rounded-lg px-3 py-1.5 border-0 focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="month">This month</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "13px" }}
                formatter={(value: number) => [`₹${value.toLocaleString()}`, "Revenue"]}
              />
              <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#revenueGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Orders Bar Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-info" /> Daily Orders
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "13px" }} />
                <Bar dataKey="orders" fill="hsl(var(--info))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Cuisine Pie Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-accent" /> Cuisine Distribution
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <RePieChart>
                <Pie data={cuisineDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {cuisineDistribution.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "13px" }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
              </RePieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Order Status Pie */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
              <Package className="w-4 h-4 text-success" /> Order Status
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <RePieChart>
                <Pie data={orderStatusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {orderStatusData.map((_, i) => (
                    <Cell key={i} fill={STATUS_COLORS[i % STATUS_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "13px" }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
              </RePieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Growth Line Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="bg-card rounded-xl border border-border p-6 mb-6">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-success" /> Platform Growth
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "13px" }} />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} name="Users" />
              <Line type="monotone" dataKey="restaurants" stroke="hsl(var(--success))" strokeWidth={2} dot={{ r: 4 }} name="Restaurants" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent Orders & Top Restaurants */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-card rounded-xl border border-border p-4">
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
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="bg-card rounded-xl border border-border p-4">
            <h3 className="font-display font-semibold mb-4">Top Restaurants</h3>
            <div className="space-y-3">
              {restaurants.slice(0, 5).map(r => (
                <div key={r.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
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
          </motion.div>
        </div>
      </div>
    </div>
  );
}
