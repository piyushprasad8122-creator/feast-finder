import { useState } from "react";
import { restaurants } from "@/data/mock";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RestaurantCard from "@/components/RestaurantCard";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function FavoritesPage() {
  // Mock favorites — in production, persist via DB
  const [favoriteIds] = useState(["1", "3", "5", "8"]);
  const favoriteRestaurants = restaurants.filter(r => favoriteIds.includes(r.id));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-6 h-6 text-primary fill-primary" />
          <h1 className="font-display text-2xl font-bold">Your Favorites</h1>
        </div>

        {favoriteRestaurants.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
            <p className="text-muted-foreground text-lg">No favorites yet</p>
            <p className="text-sm text-muted-foreground mt-1">Start exploring restaurants and save your favorites!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteRestaurants.map((r, i) => (
              <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <RestaurantCard restaurant={r} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
