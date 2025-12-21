import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { RestaurantPage } from './pages/RestaurantPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { Toaster } from './components/ui/sonner';

type Page = 'home' | 'restaurant' | 'cart' | 'checkout' | 'order-tracking';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleNavigate = (page: string, restaurantId?: string) => {
    setCurrentPage(page as Page);
    if (restaurantId) {
      setSelectedRestaurantId(restaurantId);
    }
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} searchQuery={searchQuery} />;
      case 'restaurant':
        return (
          <RestaurantPage
            restaurantId={selectedRestaurantId}
            onNavigate={handleNavigate}
          />
        );
      case 'cart':
        return <CartPage onNavigate={handleNavigate} />;
      case 'checkout':
        return <CheckoutPage onNavigate={handleNavigate} />;
      case 'order-tracking':
        return <OrderTrackingPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} searchQuery={searchQuery} />;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header
          onNavigate={handleNavigate}
          currentPage={currentPage}
          onSearch={currentPage === 'home' ? handleSearch : undefined}
        />
        <main className="flex-1">
          {renderPage()}
        </main>
        <Footer />
        <Toaster />
      </div>
    </CartProvider>
  );
}
