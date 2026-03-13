import { useEffect, useState } from "react";

type Restaurant = {
  id: number;
  name: string;
  location: string;
  rating: number;
};

function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    fetch("/api/restaurants")
      .then((res) => res.json())
      .then((data: Restaurant[]) => {
        console.log(data);
        setRestaurants(data);
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Restaurant List</h1>

      {restaurants.length === 0 ? (
        <p>Loading...</p>
      ) : (
        restaurants.map((restaurant) => (
          <div key={restaurant.id} style={{ marginBottom: "20px" }}>
            <h2>{restaurant.name}</h2>
            <p>{restaurant.location}</p>
            <p>Rating: {restaurant.rating}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
