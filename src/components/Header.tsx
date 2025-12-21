import React from 'react';
import { ShoppingCart, Search, MapPin, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onSearch?: (query: string) => void;
}

export const Header = ({ onNavigate, currentPage, onSearch }: HeaderProps) => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div
            className="cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <h1 className="text-orange-600">FoodHub</h1>
          </div>

          {/* Location */}
          <div className="hidden md:flex items-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5" />
            <div>
              <p className="text-sm">Deliver to</p>
              <p>New York, NY 10001</p>
            </div>
          </div>

          {/* Search Bar */}
          {currentPage === 'home' && onSearch && (
            <div className="flex-1 max-w-md hidden lg:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for restaurants or dishes..."
                  className="pl-10"
                  onChange={(e) => onSearch(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => onNavigate('cart')}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {cartCount}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {currentPage === 'home' && onSearch && (
          <div className="mt-4 lg:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search restaurants or dishes..."
                className="pl-10"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
