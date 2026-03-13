import { useEffect, useState } from "react";

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

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    fetch("/api/restaurants")
      .then((res) => res.json())
      .then((data: Restaurant[]) => setRestaurants(data))
      .catch((err) => console.error("Error fetching restaurants:", err));
  }, []);

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);

    fetch(`/api/menu/${restaurant.id}`)
      .then((res) => res.json())
      .then((data: MenuItem[]) => setMenuItems(data))
      .catch((err) => console.error("Error fetching menu:", err));
  };

  const addToCart = (item: MenuItem | CartItem) => {
    const existing = cart.find((cartItem) => cartItem.id === item.id);

    if (existing) {
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

  const removeFromCart = (id: number) => {
    const existing = cart.find((item) => item.id === id);

    if (!existing) return;

    if (existing.quantity === 1) {
      setCart(cart.filter((item) => item.id !== id));
    } else {
      const updatedCart = cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setCart(updatedCart);
    }
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cart,
        totalAmount
      })
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

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Feast Finder</h1>

      <h2>Restaurants</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            onClick={() => handleRestaurantClick(restaurant)}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              width: "250px",
              borderRadius: "10px",
              cursor: "pointer"
            }}
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              width="100%"
              style={{ borderRadius: "10px" }}
            />
            <h3>{restaurant.name}</h3>
            <p>{restaurant.location}</p>
            <p>Rating: {restaurant.rating}</p>
          </div>
        ))}
      </div>

      {selectedRestaurant && (
        <div style={{ marginTop: "40px" }}>
          <h2>Menu - {selectedRestaurant.name}</h2>

          {menuItems.length === 0 ? (
            <p>No menu items found.</p>
          ) : (
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "15px",
                    width: "250px",
                    borderRadius: "10px"
                  }}
                >
                  <h3>{item.item_name}</h3>
                  <p>{item.description}</p>
                  <p>₹{item.price}</p>

                  <button onClick={() => addToCart(item)}>
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: "40px" }}>
        <h2>Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  borderBottom: "1px solid #ccc",
                  padding: "10px 0"
                }}
              >
                <h4>{item.item_name}</h4>
                <p>₹{item.price}</p>
                <p>Quantity: {item.quantity}</p>

                <button onClick={() => addToCart(item)}>+</button>

                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{ marginLeft: "10px" }}
                >
                  -
                </button>
              </div>
            ))}

            <h3>Total: ₹{totalAmount}</h3>

            <button
              onClick={handleCheckout}
              style={{
                marginTop: "10px",
                padding: "10px 20px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "5px"
              }}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
