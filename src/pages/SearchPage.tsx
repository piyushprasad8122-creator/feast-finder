import { useState } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { restaurants, menuItems, cuisineTypes } from "@/data/mock";
import RestaurantCard from "@/components/RestaurantCard";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const suggestions = cuisineTypes.filter(c => c.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
  const matchedRestaurants = query.length > 1 ? restaurants.filter(r => r.name.toLowerCase().includes(query.toLowerCase()) || r.cuisine.some(c => c.toLowerCase().includes(query.toLowerCase()))) : [];
  const matchedDishes = query.length > 1 ? menuItems.filter(m => m.name.toLowerCase().includes(query.toLowerCase())) : [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6 flex-1 max-w-3xl">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input type="text" autoFocus placeholder="Search for restaurants, cuisines, dishes..." value={query} onChange={e => setQuery(e.target.value)}
            className="w-full h-14 pl-12 pr-4 rounded-xl border border-input bg-card text-base focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>

        {query.length < 2 ? (
          <div>
            <h3 className="font-display font-semibold mb-3">Popular Cuisines</h3>
            <div className="flex flex-wrap gap-2">
              {cuisineTypes.map(c => (
                <button key={c} onClick={() => setQuery(c)} className="px-3 py-1.5 rounded-full text-sm bg-muted hover:bg-primary/10 hover:text-primary transition-colors">{c}</button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {suggestions.length > 0 && (
              <div>
                <h3 className="text-xs font-medium text-muted-foreground uppercase mb-2">Suggestions</h3>
                {suggestions.map(s => (
                  <button key={s} onClick={() => setQuery(s)} className="block w-full text-left px-3 py-2 rounded-lg hover:bg-muted text-sm">{s}</button>
                ))}
              </div>
            )}
            {matchedDishes.length > 0 && (
              <div>
                <h3 className="font-display font-semibold mb-3">Dishes</h3>
                <div className="space-y-2">
                  {matchedDishes.map(d => (
                    <Link key={d.id} to={`/restaurant/${d.restaurantId}`} className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:shadow-card">
                      <img src={d.image} alt={d.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div><p className="font-medium text-sm">{d.name}</p><p className="text-xs text-muted-foreground">₹{d.price}</p></div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {matchedRestaurants.length > 0 && (
              <div>
                <h3 className="font-display font-semibold mb-3">Restaurants</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {matchedRestaurants.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
                </div>
              </div>
            )}
            {matchedRestaurants.length === 0 && matchedDishes.length === 0 && (
              <p className="text-center text-muted-foreground py-12">No results for "{query}"</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
