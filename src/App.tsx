import { useEffect, useState } from "react";
import MapView from "./components/MapView";

type Restaurant = {
  id: number;
  name: string;
  location: string;
  rating: number;
  image: string;
  lat: number;
  lng: number;
};

type MenuItem = {
  id: number;
  restaurant_id: number;
  item_name: string;
  price: number;
  description: string;
};

type CartItem = MenuItem & {
  quantity: number;
};

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    fetch("/api/restaurants")
      .then((res) => res.json())
      .then((data) => setRestaurants(data))
      .catch((err) => console.error("Error fetching restaurants:", err));
  }, []);

  const loadMenu = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);

    fetch(`/api/menu/${restaurant.id}`)
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((err) => console.error("Error fetching menu:", err));
  };

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);

      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Feast Finder 🍽️</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="border rounded-lg p-4 cursor-pointer hover:shadow-lg"
            onClick={() => loadMenu(restaurant)}
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="rounded mb-3 w-full h-48 object-cover"
            />
            <h2 className="text-xl font-semibold">{restaurant.name}</h2>
            <p>{restaurant.location}</p>
            <p>⭐ {restaurant.rating}</p>
          </div>
        ))}
      </div>

      {selectedRestaurant && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">
            {selectedRestaurant.name} Menu
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {menuItems.map((item) => (
              <div key={item.id} className="border p-4 rounded">
                <h3 className="font-semibold">{item.item_name}</h3>
                <p>{item.description}</p>
                <p className="font-bold">₹{item.price}</p>
                <button
                  className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Restaurant Location</h2>
            <MapView
              lat={selectedRestaurant.lat}
              lng={selectedRestaurant.lng}
              zoom={15}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
