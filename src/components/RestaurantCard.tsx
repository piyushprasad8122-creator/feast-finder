import { Link } from "react-router-dom";
import { Star, Clock, Heart } from "lucide-react";
import { Restaurant } from "@/data/mock";
import { motion } from "framer-motion";
import { useState } from "react";

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/restaurant/${restaurant.id}`} className="block group">
        <div className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {restaurant.discount && (
              <div className="absolute bottom-3 left-3 gradient-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-md">
                {restaurant.discount}
              </div>
            )}
            {restaurant.promoted && (
              <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm text-[10px] font-medium px-2 py-0.5 rounded">
                Promoted
              </div>
            )}
            <button
              onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-primary text-primary" : "text-muted-foreground"}`} />
            </button>
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-display font-semibold text-base truncate">{restaurant.name}</h3>
              <div className="flex items-center gap-1 shrink-0 bg-success text-success-foreground px-1.5 py-0.5 rounded text-xs font-bold">
                <Star className="w-3 h-3 fill-current" />
                {restaurant.rating}
              </div>
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-sm text-muted-foreground truncate">{restaurant.cuisine.join(", ")}</p>
              <span className="text-sm text-muted-foreground">{restaurant.priceRange}</span>
            </div>
            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{restaurant.deliveryTime}</span>
              <span>{restaurant.deliveryFee === 0 ? "Free delivery" : `₹${restaurant.deliveryFee} delivery`}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
