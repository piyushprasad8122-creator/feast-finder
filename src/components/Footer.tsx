import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-sm">FF</span>
              </div>
              <span className="font-display font-bold text-lg">Feast Finder</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Discover the best food in Navi Mumbai.</p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3 text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3 text-sm">For You</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-colors">Privacy</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Terms</Link></li>
              <li><Link to="/support" className="hover:text-foreground transition-colors">Support</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3 text-sm">Partner With Us</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-colors">Add Restaurant</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Deliver With Us</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">For Corporates</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
          © 2024 Feast Finder. Built with React + Tailwind. 🍽️
        </div>
      </div>
    </footer>
  );
}
