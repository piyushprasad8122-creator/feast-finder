import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("customer");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password, role);
    setLoading(false);
    navigate(role === "admin" ? "/admin" : role === "delivery" ? "/delivery" : "/");
  };

  const roles: { value: UserRole; label: string; desc: string }[] = [
    { value: "customer", label: "Customer", desc: "Order food" },
    { value: "admin", label: "Admin", desc: "Manage platform" },
    { value: "delivery", label: "Delivery", desc: "Deliver orders" },
  ];

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-1 gradient-primary items-center justify-center p-12">
        <div className="max-w-md text-primary-foreground">
          <h1 className="font-display text-4xl font-bold mb-4">Hungry?</h1>
          <p className="text-lg opacity-90">Order food from favourite restaurants near you.</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-sm">Z</span>
              </div>
              <span className="font-display font-bold text-xl">Zomato</span>
            </Link>
            <h2 className="font-display text-2xl font-bold">Welcome back</h2>
            <p className="text-muted-foreground mt-1">Sign in to your account</p>
          </div>

          <div className="flex gap-2">
            {roles.map(r => (
              <button
                key={r.value}
                onClick={() => setRole(r.value)}
                className={`flex-1 p-3 rounded-lg border-2 text-center transition-all ${
                  role === r.value ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <div className="font-display font-semibold text-sm">{r.label}</div>
                <div className="text-[11px] text-muted-foreground">{r.desc}</div>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} className="w-full h-12 pl-10 pr-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" required />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type={showPass ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full h-12 pl-10 pr-12 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" required />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <Button type="submit" className="w-full h-12 gradient-primary text-primary-foreground font-semibold shadow-primary-glow" disabled={loading}>
              {loading ? "Signing in..." : <>Sign in <ArrowRight className="w-4 h-4 ml-2" /></>}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account? <Link to="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
