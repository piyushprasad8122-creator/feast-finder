import { useState } from "react";
import { Search, SlidersHorizontal, Flame, Star, Leaf } from "lucide-react";
import { restaurants, cuisineTypes } from "@/data/mock";
import RestaurantCard from "@/components/RestaurantCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [vegOnly, setVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"rating" | "delivery" | "cost">("rating");

  let filtered = restaurants.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.cuisine.some(c => c.toLowerCase().includes(search.toLowerCase()));
    const matchCuisine = !selectedCuisine || r.cuisine.includes(selectedCuisine);
    const matchVeg = !vegOnly || r.isVeg;
    return matchSearch && matchCuisine && matchVeg;
  });

  if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);
  else if (sortBy === "cost") filtered.sort((a, b) => a.deliveryFee - b.deliveryFee);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative gradient-primary py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-3"
          >
            Discover the best food & drinks
          </motion.h1>
          <p className="text-primary-foreground/80 mb-8 text-lg">Order from top restaurants near you</p>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for restaurant, cuisine or a dish..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-14 pl-12 pr-4 rounded-xl bg-card text-foreground shadow-lg text-base focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>
        </div>
      </section>

      {/* Cuisine carousel */}
      <section className="container mx-auto px-4 -mt-6 relative z-10">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {cuisineTypes.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCuisine(selectedCuisine === c ? null : c)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                selectedCuisine === c
                  ? "gradient-primary text-primary-foreground border-primary shadow-primary-glow"
                  : "bg-card text-foreground border-border hover:border-primary/50 shadow-card"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 mt-6">
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-all ${vegOnly ? "border-success bg-success/10 text-success" : "border-border hover:border-muted-foreground/30"}`}
          >
            <Leaf className="w-3.5 h-3.5" /> Pure Veg
          </button>
          <button onClick={() => setSortBy("rating")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-all ${sortBy === "rating" ? "border-primary bg-primary/5 text-primary" : "border-border"}`}>
            <Star className="w-3.5 h-3.5" /> Rating
          </button>
          <button onClick={() => setSortBy("cost")} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-all ${sortBy === "cost" ? "border-primary bg-primary/5 text-primary" : "border-border"}`}>
            <SlidersHorizontal className="w-3.5 h-3.5" /> Cost: Low to High
          </button>
          <div className="ml-auto flex items-center gap-1 text-sm text-muted-foreground">
            <Flame className="w-4 h-4 text-accent" />
            <span>{filtered.length} restaurants</span>
          </div>
        </div>
      </section>

      {/* Restaurants grid */}
      <section className="container mx-auto px-4 py-8 flex-1">
        <h2 className="font-display text-xl font-bold mb-6">
          {selectedCuisine ? `${selectedCuisine} Restaurants` : "Top Rated Near You"}
        </h2>
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No restaurants found. Try a different search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((r, i) => (
              <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <RestaurantCard restaurant={r} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
