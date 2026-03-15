import { useState } from "react";
import { Search, SlidersHorizontal, Flame, Star, Leaf, ChevronRight, MapPin, Utensils } from "lucide-react";
import { cuisineTypes, restaurants as mockRestaurants } from "@/data/mock";
import RestaurantCard from "@/components/RestaurantCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MapView from "@/components/MapView";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const cuisineIcons: Record<string, string> = {
  "North Indian": "🍛",
  "South Indian": "🥘",
  "Chinese": "🥡",
  "Italian": "🍕",
  "Mughlai": "🍖",
  "Biryani": "🍚",
  "Seafood": "🦐",
  "Street Food": "🌮",
  "Punjabi": "🫓",
  "Continental": "🥩",
  "Thai": "🍜",
  "Japanese": "🍣",
  "Desserts": "🍰",
  "Fast Food": "🍔",
  "Healthy": "🥗",
};

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [vegOnly, setVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"rating" | "delivery" | "cost">("rating");

  let filtered = mockRestaurants.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine.some(c => c.toLowerCase().includes(search.toLowerCase()));
    const matchCuisine = !selectedCuisine || r.cuisine.includes(selectedCuisine);
    const matchVeg = !vegOnly || r.isVeg;
    return matchSearch && matchCuisine && matchVeg;
  });

  if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);
  else if (sortBy === "cost") filtered.sort((a, b) => a.deliveryFee - b.deliveryFee);

  const topRated = [...mockRestaurants].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const popular = [...mockRestaurants].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600"
            alt="Delicious food spread"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
        </div>
        <div className="relative container mx-auto px-4 py-20 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-primary-foreground/80 text-sm font-medium">Navi Mumbai</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-4 leading-tight">
              Discover the Best Food<br />
              <span className="text-primary">in Navi Mumbai</span>
            </h1>
            <p className="text-primary-foreground/70 mb-10 text-lg md:text-xl max-w-2xl mx-auto">
              Explore top restaurants, cuisines, and dishes. Order your favorites delivered right to your doorstep.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto relative"
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for restaurant, cuisine or a dish..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-14 md:h-16 pl-14 pr-6 rounded-2xl bg-card text-foreground shadow-lg text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
            />
          </motion.div>
        </div>
      </section>

      {/* Explore by Cuisine */}
      <section className="container mx-auto px-4 -mt-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl shadow-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold flex items-center gap-2">
              <Utensils className="w-5 h-5 text-primary" />
              Explore by Cuisine
            </h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {cuisineTypes.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCuisine(selectedCuisine === c ? null : c)}
                className={`shrink-0 flex flex-col items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all border ${
                  selectedCuisine === c
                    ? "gradient-primary text-primary-foreground border-primary shadow-primary-glow"
                    : "bg-muted text-foreground border-border hover:border-primary/50 hover:shadow-card"
                }`}
              >
                <span className="text-2xl">{cuisineIcons[c] || "🍽️"}</span>
                <span className="text-xs whitespace-nowrap">{c}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Top Rated Restaurants */}
      <section className="container mx-auto px-4 mt-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl md:text-2xl font-bold flex items-center gap-2">
            <Star className="w-5 h-5 text-accent fill-accent" />
            Top Rated Restaurants
          </h2>
          <button
            onClick={() => setSortBy("rating")}
            className="text-sm text-primary font-medium flex items-center gap-1 hover:underline"
          >
            View all <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topRated.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <RestaurantCard restaurant={r} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Near You */}
      <section className="container mx-auto px-4 mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl md:text-2xl font-bold flex items-center gap-2">
            <Flame className="w-5 h-5 text-primary" />
            Popular Near You
          </h2>
          <button className="text-sm text-primary font-medium flex items-center gap-1 hover:underline">
            View all <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popular.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <RestaurantCard restaurant={r} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Filters + All Restaurants */}
      <section className="container mx-auto px-4 mt-12">
        <div className="flex items-center gap-3 flex-wrap mb-6">
          <h2 className="font-display text-xl md:text-2xl font-bold mr-auto">
            {selectedCuisine ? `${selectedCuisine} Restaurants` : "All Restaurants"}
          </h2>
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
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Flame className="w-4 h-4 text-accent" />
            <span>{filtered.length} restaurants</span>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No restaurants found. Try a different search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((r, i) => (
              <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <RestaurantCard restaurant={r} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <div className="mt-12" />
      <Footer />
    </div>
  );
}
