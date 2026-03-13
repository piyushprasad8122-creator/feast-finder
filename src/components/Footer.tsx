import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-xs">Z</span>
              </div>
              <span className="font-display font-bold text-lg">Zomato</span>
            </div>
            <p className="text-sm text-muted-foreground">Better food for more people.</p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3 text-sm">For You</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-colors">Privacy</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Terms</Link></li>
              <li><Link to="/support" className="hover:text-foreground transition-colors">Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3 text-sm">Partner</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-colors">Add Restaurant</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Deliver with us</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
          © 2024 Zomato Clone. Built with React + Tailwind.
        </div>
      </div>
    </footer>
  );
}
