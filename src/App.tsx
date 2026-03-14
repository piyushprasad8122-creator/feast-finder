import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  MapPin,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Star,
  Timer,
  User,
} from "lucide-react";

type Restaurant = {
  id: number;
  name: string;
  location: string;
  rating: number;
  image: string;
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

const categories = [
  "All",
  "North Indian",
  "Italian",
  "Japanese",
  "Burgers",
  "Thai",
  "Chinese",
  "Mexican",
  "Desserts",
  "Pizza",
  "Healthy",
];

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("/api/restaurants")
      .then((res) => res.json())
      .then((data) => setRestaurants(data))
      .catch((err) => console.error("Error fetching restaurants:", err));
  }, []);

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);

    fetch(`/api/menu/${restaurant.id}`)
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((err) => console.error("Error fetching menu:", err));
  };

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const decreaseQuantity = (itemId: number) => {
    const existingItem = cart.find((cartItem) => cartItem.id === itemId);

    if (!existingItem) return;

    if (existingItem.quantity === 1) {
      setCart(cart.filter((cartItem) => cartItem.id !== itemId));
    } else {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      setCart(updatedCart);
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart, totalAmount: totalPrice }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setCart([]);
      })
      .catch((err) => {
        console.error("Checkout error:", err);
      });
  };

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(search.toLowerCase());

      if (activeCategory === "All") {
        return matchesSearch;
      }

      return (
        matchesSearch &&
        (restaurant.name.toLowerCase().includes(activeCategory.toLowerCase()) ||
          restaurant.location
            .toLowerCase()
            .includes(activeCategory.toLowerCase()))
      );
    });
  }, [restaurants, search, activeCategory]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        color: "#111827",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          backgroundColor: "white",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{ fontSize: "22px", fontWeight: 800, minWidth: "180px" }}
          >
            <span style={{ color: "#ef4444" }}>Feast</span>{" "}
            <span style={{ color: "#111827" }}>Finder</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#374151",
              minWidth: "160px",
            }}
          >
            <MapPin size={18} color="#ef4444" />
            <span style={{ fontWeight: 600 }}>Bangalore</span>
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "#f3f4f6",
              borderRadius: "16px",
              padding: "12px 16px",
            }}
          >
            <Search size={18} color="#6b7280" />
            <input
              type="text"
              placeholder="Search for restaurants or dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                width: "100%",
                fontSize: "16px",
                color: "#111827",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              color: "#111827",
              fontWeight: 500,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <MapPin size={18} />
              <span>Map</span>
            </div>
            <Bell size={20} />
            <User size={20} />
          </div>
        </div>
      </header>

      <main
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "32px 24px 60px",
        }}
      >
        <section
          style={{
            backgroundColor: "white",
            borderRadius: "24px",
            padding: "32px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            border: "1px solid #f1f5f9",
          }}
        >
          <h1
            style={{
              fontSize: "56px",
              lineHeight: 1.05,
              margin: 0,
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            What are you craving?
          </h1>

          <p style={{ marginTop: "10px", color: "#6b7280", fontSize: "20px" }}>
            Discover the best food near you
          </p>

          <div
            style={{
              marginTop: "28px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              border: "1px solid #e5e7eb",
              borderRadius: "18px",
              padding: "16px 18px",
              backgroundColor: "#fff",
            }}
          >
            <Search size={22} color="#6b7280" />
            <input
              type="text"
              placeholder="Search for restaurants or dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                width: "100%",
                fontSize: "18px",
                color: "#111827",
              }}
            />
          </div>

          <div
            style={{
              marginTop: "18px",
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  style={{
                    padding: "12px 20px",
                    borderRadius: "999px",
                    border: isActive ? "none" : "1px solid #e5e7eb",
                    backgroundColor: isActive ? "#ef4444" : "white",
                    color: isActive ? "white" : "#111827",
                    cursor: "pointer",
                    fontSize: "15px",
                    fontWeight: 600,
                    boxShadow: isActive
                      ? "0 8px 20px rgba(239,68,68,0.25)"
                      : "none",
                  }}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </section>

        <section style={{ marginTop: "32px" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "18px" }}>
            Popular restaurants
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                onClick={() => handleRestaurantClick(restaurant)}
                style={{
                  backgroundColor: "white",
                  borderRadius: "22px",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0 6px 24px rgba(15,23,42,0.08)",
                  border:
                    selectedRestaurant?.id === restaurant.id
                      ? "2px solid #ef4444"
                      : "1px solid #eef2f7",
                  transition: "0.2s ease",
                }}
              >
                <div style={{ position: "relative" }}>
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      backgroundColor: "#ef4444",
                      color: "white",
                      padding: "8px 14px",
                      borderRadius: "999px",
                      fontWeight: 700,
                      fontSize: "14px",
                    }}
                  >
                    Featured
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      bottom: "16px",
                      left: "16px",
                      backgroundColor: "rgba(255,255,255,0.95)",
                      color: "#111827",
                      padding: "8px 14px",
                      borderRadius: "999px",
                      fontWeight: 700,
                      fontSize: "14px",
                    }}
                  >
                    Free Delivery
                  </div>
                </div>

                <div style={{ padding: "18px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "12px",
                    }}
                  >
                    <div>
                      <h3 style={{ margin: 0, fontSize: "20px" }}>
                        {restaurant.name}
                      </h3>
                      <p
                        style={{
                          margin: "8px 0 0",
                          color: "#6b7280",
                          fontSize: "15px",
                        }}
                      >
                        {restaurant.location}
                      </p>
                    </div>

                    <div
                      style={{
                        backgroundColor: "#10b981",
                        color: "white",
                        borderRadius: "10px",
                        padding: "6px 10px",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "14px",
                      }}
                    >
                      {restaurant.rating}
                      <Star size={14} fill="white" color="white" />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      marginTop: "14px",
                      color: "#6b7280",
                      fontSize: "15px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: "6px" }}
                    >
                      <Timer size={16} />
                      <span>25-35 min</span>
                    </div>

                    <div
                      style={{ display: "flex", alignItems: "center", gap: "6px" }}
                    >
                      <ShoppingBag size={16} />
                      <span>2.1 km</span>
                    </div>

                    <span>$$$</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {selectedRestaurant && (
          <section style={{ marginTop: "40px" }}>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "24px",
                padding: "28px",
                boxShadow: "0 6px 24px rgba(15,23,42,0.08)",
              }}
            >
              <h2 style={{ marginTop: 0, fontSize: "30px" }}>
                Menu — {selectedRestaurant.name}
              </h2>

              <p
                style={{
                  color: "#6b7280",
                  marginTop: "-6px",
                  marginBottom: "22px",
                }}
              >
                Pick your favorite dishes and add them to cart
              </p>

              {menuItems.length === 0 ? (
                <p>No menu items found.</p>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "18px",
                  }}
                >
                  {menuItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        border: "1px solid #e5e7eb",
                        borderRadius: "18px",
                        padding: "18px",
                        backgroundColor: "#fff",
                      }}
                    >
                      <h3 style={{ marginTop: 0, marginBottom: "8px" }}>
                        {item.item_name}
                      </h3>

                      <p
                        style={{
                          color: "#6b7280",
                          fontSize: "14px",
                          minHeight: "40px",
                          marginTop: 0,
                        }}
                      >
                        {item.description}
                      </p>

                      <p
                        style={{
                          fontSize: "20px",
                          fontWeight: 800,
                          margin: "14px 0",
                          color: "#111827",
                        }}
                      >
                        ₹{item.price}
                      </p>

                      <button
                        onClick={() => addToCart(item)}
                        style={{
                          backgroundColor: "#ef4444",
                          color: "white",
                          border: "none",
                          borderRadius: "12px",
                          padding: "12px 16px",
                          fontWeight: 700,
                          cursor: "pointer",
                          width: "100%",
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        <section style={{ marginTop: "40px" }}>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "24px",
              padding: "28px",
              boxShadow: "0 6px 24px rgba(15,23,42,0.08)",
            }}
          >
            <h2 style={{ marginTop: 0, fontSize: "30px" }}>Cart</h2>

            {cart.length === 0 ? (
              <p style={{ color: "#6b7280" }}>Your cart is empty</p>
            ) : (
              <div>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "14px 0",
                      borderBottom: "1px solid #e5e7eb",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <h4 style={{ margin: 0 }}>{item.item_name}</h4>
                      <p style={{ margin: "6px 0 0", color: "#6b7280" }}>
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        style={{
                          width: "34px",
                          height: "34px",
                          borderRadius: "10px",
                          border: "1px solid #d1d5db",
                          backgroundColor: "white",
                          cursor: "pointer",
                        }}
                      >
                        <Minus size={16} />
                      </button>

                      <span
                        style={{
                          minWidth: "20px",
                          textAlign: "center",
                          fontWeight: 700,
                        }}
                      >
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => addToCart(item)}
                        style={{
                          width: "34px",
                          height: "34px",
                          borderRadius: "10px",
                          border: "none",
                          backgroundColor: "#ef4444",
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "16px",
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: "26px" }}>
                    Total: ₹{totalPrice}
                  </h3>

                  <button
                    onClick={handleCheckout}
                    style={{
                      padding: "14px 24px",
                      backgroundColor: "#16a34a",
                      color: "white",
                      border: "none",
                      borderRadius: "14px",
                      fontWeight: 800,
                      fontSize: "16px",
                      cursor: "pointer",
                    }}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
