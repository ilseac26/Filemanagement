import React, { useState } from 'react';
import { ArrowLeft, Star, Clock, DollarSign, MapPin, Info } from 'lucide-react';
import { Button } from '../components/ui/button';
import { MenuItemCard } from '../components/MenuItemCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { CustomizeItemDialog } from '../components/CustomizeItemDialog';
import { Badge } from '../components/ui/badge';
import { restaurants, menuItems } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import { MenuItem, ItemCustomization } from '../types';

interface RestaurantPageProps {
  restaurantId: string;
  onNavigate: (page: string) => void;
}

export const RestaurantPage = ({ restaurantId, onNavigate }: RestaurantPageProps) => {
  const restaurant = restaurants.find((r) => r.id === restaurantId);
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [customizationDialogOpen, setCustomizationDialogOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);

  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Restaurant not found</p>
        <Button onClick={() => onNavigate('home')} className="mt-4">
          Back to Home
        </Button>
      </div>
    );
  }

  const restaurantMenuItems = menuItems.filter(
    (item) => item.restaurantId === restaurantId
  );

  // Get unique categories
  const categories = [
    'All',
    ...new Set(restaurantMenuItems.map((item) => item.category)),
  ];

  // Filter menu items
  const filteredMenuItems =
    selectedCategory === 'All'
      ? restaurantMenuItems
      : restaurantMenuItems.filter((item) => item.category === selectedCategory);

  const handleItemClick = (menuItemId: string) => {
    const menuItem = menuItems.find((item) => item.id === menuItemId);
    if (!menuItem) return;

    // If item has customizations, open dialog
    if (menuItem.sizes || menuItem.addons) {
      setSelectedMenuItem(menuItem);
      setCustomizationDialogOpen(true);
    } else {
      // Otherwise add directly to cart
      addToCart(menuItem, restaurant);
      toast.success('Added to cart!', {
        description: `${menuItem.name} has been added to your cart.`,
      });
    }
  };

  const handleAddWithCustomization = (customization: ItemCustomization) => {
    if (selectedMenuItem) {
      addToCart(selectedMenuItem, restaurant, customization);
      toast.success('Added to cart!', {
        description: `${selectedMenuItem.name} has been added to your cart.`,
      });
      setCustomizationDialogOpen(false);
      setSelectedMenuItem(null);
    }
  };

  return (
    <div>
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" onClick={() => onNavigate('home')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Restaurants
        </Button>
      </div>

      {/* Restaurant Header */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <ImageWithFallback
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {!restaurant.isOpen && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Badge variant="secondary" className="text-lg">
              Currently Closed
            </Badge>
          </div>
        )}
      </div>

      {/* Restaurant Info */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="mb-2">{restaurant.name}</h1>
              <p className="text-gray-600 mb-3">{restaurant.description}</p>
              <div className="flex flex-wrap gap-2">
                {restaurant.cuisine.map((cuisine) => (
                  <Badge key={cuisine} variant="secondary">
                    {cuisine}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <div>
                <p className="text-sm text-gray-600">Rating</p>
                <p>{restaurant.rating}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Delivery Time</p>
                <p>{restaurant.deliveryTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Delivery Fee</p>
                <p>${restaurant.deliveryFee.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Min Order</p>
                <p>${restaurant.minOrder.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h2 className="mb-4">Menu</h2>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Menu Items */}
        <div className="space-y-4">
          {filteredMenuItems.length > 0 ? (
            filteredMenuItems.map((menuItem) => (
              <MenuItemCard
                key={menuItem.id}
                menuItem={menuItem}
                onAddToCart={() => handleItemClick(menuItem.id)}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No items found in this category.</p>
            </div>
          )}
        </div>
      </div>

      {/* Customize Item Dialog */}
      {selectedMenuItem && (
        <CustomizeItemDialog
          menuItem={selectedMenuItem}
          isOpen={customizationDialogOpen}
          onClose={() => setCustomizationDialogOpen(false)}
          onSave={handleAddWithCustomization}
        />
      )}
    </div>
  );
};