export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string[];
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  priceRange: string;
  address: string;
  isVeg: boolean;
  promoted: boolean;
  discount?: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  isBestseller: boolean;
  rating: number;
}

export interface Order {
  id: string;
  restaurantName: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: "placed" | "preparing" | "out_for_delivery" | "delivered" | "cancelled";
  date: string;
  deliveryPartner?: string;
  address: string;
  paymentMethod: string;
}

export interface DeliveryOrder extends Order {
  pickupAddress: string;
  customerName: string;
  customerPhone: string;
  earnings: number;
}

export const cuisineTypes = [
  "North Indian", "South Indian", "Chinese", "Italian", "Mughlai",
  "Biryani", "Seafood", "Street Food", "Punjabi", "Continental",
  "Thai", "Japanese", "Desserts", "Fast Food", "Healthy"
];

export const restaurants: Restaurant[] = [
  { id: "1", name: "Barbeque Nation", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600", cuisine: ["North Indian", "Mughlai"], rating: 4.5, reviewCount: 3450, deliveryTime: "40-50 min", deliveryFee: 40, priceRange: "₹₹₹₹", address: "Vashi, Navi Mumbai", isVeg: false, promoted: true, discount: "20% OFF up to ₹150" },
  { id: "2", name: "Urban Tadka", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600", cuisine: ["North Indian", "Punjabi"], rating: 4.3, reviewCount: 2100, deliveryTime: "30-35 min", deliveryFee: 30, priceRange: "₹₹", address: "Kharghar, Navi Mumbai", isVeg: false, promoted: false, discount: "₹100 OFF above ₹399" },
  { id: "3", name: "Achija", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600", cuisine: ["Punjabi", "North Indian"], rating: 4.4, reviewCount: 1890, deliveryTime: "25-35 min", deliveryFee: 25, priceRange: "₹₹₹", address: "Belapur, Navi Mumbai", isVeg: false, promoted: true, discount: "FREE delivery" },
  { id: "4", name: "Cream Centre", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600", cuisine: ["Continental", "Italian"], rating: 4.6, reviewCount: 2780, deliveryTime: "30-40 min", deliveryFee: 35, priceRange: "₹₹₹", address: "Vashi, Navi Mumbai", isVeg: true, promoted: false, discount: "30% OFF up to ₹100" },
  { id: "5", name: "Bhagat Tarachand", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600", cuisine: ["North Indian", "South Indian"], rating: 4.2, reviewCount: 4200, deliveryTime: "20-30 min", deliveryFee: 20, priceRange: "₹₹", address: "Panvel, Navi Mumbai", isVeg: true, promoted: false },
  { id: "6", name: "Pranaam Fine Dine", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600", cuisine: ["Mughlai", "Continental"], rating: 4.7, reviewCount: 1560, deliveryTime: "35-45 min", deliveryFee: 50, priceRange: "₹₹₹₹", address: "Nerul, Navi Mumbai", isVeg: false, promoted: true, discount: "Flat ₹200 OFF" },
  { id: "7", name: "Soy Street", image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=600", cuisine: ["Chinese", "Thai"], rating: 4.3, reviewCount: 1320, deliveryTime: "25-35 min", deliveryFee: 30, priceRange: "₹₹", address: "Kharghar, Navi Mumbai", isVeg: false, promoted: false, discount: "Buy 1 Get 1 Free" },
  { id: "8", name: "Hitchki", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600", cuisine: ["North Indian", "Street Food"], rating: 4.4, reviewCount: 2340, deliveryTime: "30-40 min", deliveryFee: 35, priceRange: "₹₹₹", address: "Vashi, Navi Mumbai", isVeg: false, promoted: false },
  { id: "9", name: "Global Fusion", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600", cuisine: ["Continental", "Italian"], rating: 4.1, reviewCount: 980, deliveryTime: "35-45 min", deliveryFee: 40, priceRange: "₹₹₹", address: "Seawoods, Navi Mumbai", isVeg: false, promoted: false },
  { id: "10", name: "Pot Pourri", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600", cuisine: ["North Indian", "Chinese", "Continental"], rating: 4.5, reviewCount: 1750, deliveryTime: "30-40 min", deliveryFee: 30, priceRange: "₹₹₹", address: "Kharghar, Navi Mumbai", isVeg: false, promoted: true, discount: "15% OFF up to ₹120" },
  { id: "11", name: "Mahesh Lunch Home", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600", cuisine: ["Seafood", "South Indian"], rating: 4.6, reviewCount: 3890, deliveryTime: "25-35 min", deliveryFee: 35, priceRange: "₹₹₹", address: "Vashi, Navi Mumbai", isVeg: false, promoted: true, discount: "₹150 OFF above ₹599" },
  { id: "12", name: "Navratna Restaurant", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600", cuisine: ["North Indian", "South Indian"], rating: 4.0, reviewCount: 2560, deliveryTime: "20-30 min", deliveryFee: 15, priceRange: "₹", address: "Airoli, Navi Mumbai", isVeg: true, promoted: false },
  { id: "13", name: "Golden Punjab", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600", cuisine: ["Punjabi", "North Indian"], rating: 4.2, reviewCount: 1890, deliveryTime: "25-35 min", deliveryFee: 25, priceRange: "₹₹", address: "Belapur, Navi Mumbai", isVeg: false, promoted: false },
  { id: "14", name: "Baugban Restaurant", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600", cuisine: ["Mughlai", "North Indian"], rating: 4.3, reviewCount: 1450, deliveryTime: "30-40 min", deliveryFee: 30, priceRange: "₹₹₹", address: "Nerul, Navi Mumbai", isVeg: false, promoted: false, discount: "20% OFF up to ₹80" },
  { id: "15", name: "The Leaf Kitchen", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600", cuisine: ["Healthy", "Continental"], rating: 4.5, reviewCount: 870, deliveryTime: "20-30 min", deliveryFee: 20, priceRange: "₹₹", address: "Kharghar, Navi Mumbai", isVeg: true, promoted: false, discount: "FREE delivery" },
  { id: "16", name: "Taste of Punjab", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600", cuisine: ["Punjabi", "Biryani"], rating: 4.1, reviewCount: 2100, deliveryTime: "30-40 min", deliveryFee: 25, priceRange: "₹₹", address: "Panvel, Navi Mumbai", isVeg: false, promoted: false },
  { id: "17", name: "Bombay Barbeque", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600", cuisine: ["North Indian", "Mughlai"], rating: 4.4, reviewCount: 2890, deliveryTime: "35-45 min", deliveryFee: 40, priceRange: "₹₹₹₹", address: "Vashi, Navi Mumbai", isVeg: false, promoted: true, discount: "Flat ₹250 OFF" },
  { id: "18", name: "Cafe Monza", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600", cuisine: ["Italian", "Fast Food"], rating: 4.2, reviewCount: 1560, deliveryTime: "20-25 min", deliveryFee: 20, priceRange: "₹₹", address: "Seawoods, Navi Mumbai", isVeg: false, promoted: false, discount: "₹75 OFF above ₹299" },
  { id: "19", name: "The Food Studio", image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600", cuisine: ["Continental", "Chinese", "Thai"], rating: 4.6, reviewCount: 1230, deliveryTime: "30-40 min", deliveryFee: 35, priceRange: "₹₹₹", address: "Kharghar, Navi Mumbai", isVeg: false, promoted: false },
  { id: "20", name: "Highway Break", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600", cuisine: ["Fast Food", "Street Food"], rating: 4.0, reviewCount: 3450, deliveryTime: "15-20 min", deliveryFee: 15, priceRange: "₹", address: "Panvel, Navi Mumbai", isVeg: false, promoted: false, discount: "Buy 1 Get 1" },
];

export const menuItems: MenuItem[] = [
  { id: "m1", restaurantId: "1", name: "Veg Kebab Platter", description: "Assorted grilled vegetable kebabs with mint chutney", price: 449, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400", category: "Starters", isVeg: true, isBestseller: true, rating: 4.5 },
  { id: "m2", restaurantId: "1", name: "Chicken Tikka", description: "Tender chicken marinated in spices and grilled to perfection", price: 399, image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=400", category: "Starters", isVeg: false, isBestseller: true, rating: 4.6 },
  { id: "m3", restaurantId: "1", name: "Dal Makhani", description: "Slow-cooked black lentils in rich butter and cream", price: 299, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400", category: "Main Course", isVeg: true, isBestseller: false, rating: 4.3 },
  { id: "m4", restaurantId: "2", name: "Butter Chicken", description: "Creamy tomato-based chicken curry, a classic favourite", price: 349, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400", category: "Main Course", isVeg: false, isBestseller: true, rating: 4.7 },
  { id: "m5", restaurantId: "2", name: "Paneer Tikka Masala", description: "Grilled cottage cheese in spiced tomato gravy", price: 299, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400", category: "Main Course", isVeg: true, isBestseller: true, rating: 4.4 },
  { id: "m6", restaurantId: "4", name: "Sizzling Brownie", description: "Warm chocolate brownie served sizzling with ice cream", price: 249, image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400", category: "Desserts", isVeg: true, isBestseller: true, rating: 4.8 },
  { id: "m7", restaurantId: "7", name: "Hakka Noodles", description: "Stir-fried noodles with fresh vegetables and soy sauce", price: 229, image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400", category: "Chinese", isVeg: true, isBestseller: false, rating: 4.2 },
  { id: "m8", restaurantId: "11", name: "Surmai Fry", description: "Fresh kingfish marinated in coastal spices and pan-fried", price: 499, image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400", category: "Seafood", isVeg: false, isBestseller: true, rating: 4.7 },
  { id: "m9", restaurantId: "20", name: "Classic Smash Burger", description: "Double patty burger with cheese, lettuce and special sauce", price: 199, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400", category: "Burgers", isVeg: false, isBestseller: true, rating: 4.5 },
  { id: "m10", restaurantId: "16", name: "Chicken Biryani", description: "Fragrant basmati rice layered with spiced chicken", price: 329, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400", category: "Biryani", isVeg: false, isBestseller: true, rating: 4.6 },
];

export const sampleOrders: Order[] = [
  { id: "ORD001", restaurantName: "Barbeque Nation", items: [{ name: "Chicken Tikka", qty: 2, price: 399 }, { name: "Dal Makhani", qty: 1, price: 299 }], total: 1097, status: "delivered", date: "2024-03-10", address: "Sector 17, Vashi, Navi Mumbai", paymentMethod: "Online", deliveryPartner: "Ravi Kumar" },
  { id: "ORD002", restaurantName: "Highway Break", items: [{ name: "Classic Smash Burger", qty: 3, price: 199 }], total: 597, status: "out_for_delivery", date: "2024-03-13", address: "Palm Beach Road, Navi Mumbai", paymentMethod: "COD", deliveryPartner: "Suresh M" },
  { id: "ORD003", restaurantName: "Cream Centre", items: [{ name: "Sizzling Brownie", qty: 2, price: 249 }], total: 498, status: "preparing", date: "2024-03-13", address: "Sector 15, Kharghar, Navi Mumbai", paymentMethod: "Online" },
];

export const deliveryOrders: DeliveryOrder[] = [
  { ...sampleOrders[1], pickupAddress: "Highway Break, Panvel", customerName: "Amit Shah", customerPhone: "+91 98765 43210", earnings: 45 },
  { id: "ORD004", restaurantName: "Soy Street", items: [{ name: "Hakka Noodles", qty: 2, price: 229 }], total: 458, status: "placed", date: "2024-03-13", address: "Sector 7, Kharghar, Navi Mumbai", paymentMethod: "Online", pickupAddress: "Soy Street, Kharghar", customerName: "Priya Sharma", customerPhone: "+91 87654 32109", earnings: 38 },
];

export const coupons = [
  { code: "WELCOME50", discount: "50% OFF", maxDiscount: 100, minOrder: 199, description: "50% off on your first order" },
  { code: "FREEDEL", discount: "FREE Delivery", maxDiscount: 50, minOrder: 149, description: "Free delivery on orders above ₹149" },
  { code: "FEAST200", discount: "₹200 OFF", maxDiscount: 200, minOrder: 599, description: "Flat ₹200 off on orders above ₹599" },
];

export const adminStats = {
  totalOrders: 12450,
  totalRevenue: 4562000,
  activeUsers: 8934,
  activeRestaurants: 156,
  deliveryPartners: 342,
  avgRating: 4.3,
  ordersToday: 234,
  revenueToday: 87500,
};
