import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "@/pages/HomePage";
import RestaurantPage from "@/pages/RestaurantPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import OrderTrackingPage from "@/pages/OrderTrackingPage";
import OrdersPage from "@/pages/OrdersPage";
import ProfilePage from "@/pages/ProfilePage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import SearchPage from "@/pages/SearchPage";
import AdminDashboard from "@/pages/AdminDashboard";
import DeliveryDashboard from "@/pages/DeliveryDashboard";
import FavoritesPage from "@/pages/FavoritesPage";
import NotificationsPage from "@/pages/NotificationsPage";
import InvoicePage from "@/pages/InvoicePage";
import SupportPage from "@/pages/SupportPage";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/restaurant/:id" element={<RestaurantPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-tracking/:id" element={<OrderTrackingPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/delivery" element={<DeliveryDashboard />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/invoice/:id" element={<InvoicePage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
