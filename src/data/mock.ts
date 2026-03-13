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
  "North Indian", "South Indian", "Chinese", "Italian", "Pizza",
  "Biryani", "Burgers", "Desserts", "Street Food", "Healthy",
  "Thai", "Japanese", "Mexican", "Rolls", "Ice Cream"
];

export const restaurants: Restaurant[] = [
  { id: "1", name: "Paradise Biryani", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600", cuisine: ["Biryani", "North Indian"], rating: 4.5, reviewCount: 2340, deliveryTime: "30-35 min", deliveryFee: 30, priceRange: "₹₹", address: "Banjara Hills, Hyderabad", isVeg: false, promoted: true, discount: "20% OFF up to ₹100" },
  { id: "2", name: "Italiano Kitchen", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600", cuisine: ["Italian", "Pizza"], rating: 4.3, reviewCount: 1890, deliveryTime: "25-30 min", deliveryFee: 40, priceRange: "₹₹₹", address: "Jubilee Hills, Hyderabad", isVeg: false, promoted: false, discount: "FREE delivery" },
  { id: "3", name: "Green Leaf Veg", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600", cuisine: ["South Indian", "Healthy"], rating: 4.6, reviewCount: 980, deliveryTime: "20-25 min", deliveryFee: 20, priceRange: "₹", address: "Madhapur, Hyderabad", isVeg: true, promoted: false },
  { id: "4", name: "Dragon Wok", image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=600", cuisine: ["Chinese", "Thai"], rating: 4.1, reviewCount: 1560, deliveryTime: "35-40 min", deliveryFee: 35, priceRange: "₹₹", address: "Gachibowli, Hyderabad", isVeg: false, promoted: true, discount: "₹150 OFF above ₹499" },
  { id: "5", name: "Burger Junction", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600", cuisine: ["Burgers", "Street Food"], rating: 4.4, reviewCount: 3200, deliveryTime: "15-20 min", deliveryFee: 25, priceRange: "₹", address: "Kukatpally, Hyderabad", isVeg: false, promoted: false, discount: "Buy 1 Get 1" },
  { id: "6", name: "Sushi Master", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600", cuisine: ["Japanese"], rating: 4.7, reviewCount: 670, deliveryTime: "40-45 min", deliveryFee: 50, priceRange: "₹₹₹₹", address: "Hitech City, Hyderabad", isVeg: false, promoted: false },
  { id: "7", name: "Dosa Plaza", image: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=600", cuisine: ["South Indian"], rating: 4.2, reviewCount: 1450, deliveryTime: "20-25 min", deliveryFee: 15, priceRange: "₹", address: "Ameerpet, Hyderabad", isVeg: true, promoted: true, discount: "30% OFF up to ₹75" },
  { id: "8", name: "Sweet Temptations", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600", cuisine: ["Desserts", "Ice Cream"], rating: 4.8, reviewCount: 2100, deliveryTime: "25-30 min", deliveryFee: 30, priceRange: "₹₹", address: "Kondapur, Hyderabad", isVeg: true, promoted: false },
];

export const menuItems: MenuItem[] = [
  { id: "m1", restaurantId: "1", name: "Chicken Dum Biryani", description: "Fragrant basmati rice slow-cooked with tender chicken and aromatic spices", price: 299, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400", category: "Biryani", isVeg: false, isBestseller: true, rating: 4.6 },
  { id: "m2", restaurantId: "1", name: "Mutton Biryani", description: "Rich and flavorful mutton biryani with saffron-infused rice", price: 399, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400", category: "Biryani", isVeg: false, isBestseller: true, rating: 4.7 },
  { id: "m3", restaurantId: "1", name: "Veg Biryani", description: "Mixed vegetables cooked with fragrant rice and herbs", price: 199, image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400", category: "Biryani", isVeg: true, isBestseller: false, rating: 4.2 },
  { id: "m4", restaurantId: "1", name: "Chicken 65", description: "Crispy deep-fried chicken with spicy masala", price: 249, image: "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=400", category: "Starters", isVeg: false, isBestseller: true, rating: 4.5 },
  { id: "m5", restaurantId: "1", name: "Raita", description: "Cool yogurt with cucumber and spices", price: 59, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400", category: "Sides", isVeg: true, isBestseller: false, rating: 4.0 },
  { id: "m6", restaurantId: "2", name: "Margherita Pizza", description: "Classic pizza with tomato sauce, mozzarella, and basil", price: 349, image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400", category: "Pizza", isVeg: true, isBestseller: true, rating: 4.4 },
  { id: "m7", restaurantId: "2", name: "Pasta Alfredo", description: "Creamy fettuccine with parmesan and garlic", price: 299, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400", category: "Pasta", isVeg: true, isBestseller: false, rating: 4.3 },
  { id: "m8", restaurantId: "5", name: "Classic Smash Burger", description: "Double patty smash burger with cheese and special sauce", price: 199, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400", category: "Burgers", isVeg: false, isBestseller: true, rating: 4.5 },
];

export const sampleOrders: Order[] = [
  { id: "ORD001", restaurantName: "Paradise Biryani", items: [{ name: "Chicken Dum Biryani", qty: 2, price: 299 }, { name: "Raita", qty: 1, price: 59 }], total: 657, status: "delivered", date: "2024-03-10", address: "123, Green Park, Hyderabad", paymentMethod: "Online", deliveryPartner: "Ravi Kumar" },
  { id: "ORD002", restaurantName: "Burger Junction", items: [{ name: "Classic Smash Burger", qty: 3, price: 199 }], total: 597, status: "out_for_delivery", date: "2024-03-13", address: "456, Lake View, Hyderabad", paymentMethod: "COD", deliveryPartner: "Suresh M" },
  { id: "ORD003", restaurantName: "Italiano Kitchen", items: [{ name: "Margherita Pizza", qty: 1, price: 349 }, { name: "Pasta Alfredo", qty: 1, price: 299 }], total: 648, status: "preparing", date: "2024-03-13", address: "789, Tech Park, Hyderabad", paymentMethod: "Online" },
];

export const deliveryOrders: DeliveryOrder[] = [
  { ...sampleOrders[1], pickupAddress: "Burger Junction, Kukatpally", customerName: "Amit Shah", customerPhone: "+91 98765 43210", earnings: 45 },
  { id: "ORD004", restaurantName: "Dragon Wok", items: [{ name: "Hakka Noodles", qty: 2, price: 179 }], total: 358, status: "placed", date: "2024-03-13", address: "22, Palm Heights, Hyderabad", paymentMethod: "Online", pickupAddress: "Dragon Wok, Gachibowli", customerName: "Priya Sharma", customerPhone: "+91 87654 32109", earnings: 38 },
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
