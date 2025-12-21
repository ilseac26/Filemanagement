import React, { useState } from 'react';
import { RestaurantCard } from '../components/RestaurantCard';
import { Button } from '../components/ui/button';
import { restaurants } from '../data/mockData';
import { Restaurant } from '../types';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Utensils, Truck, Clock, Award } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string, restaurantId?: string) => void;
  searchQuery: string;
}

export const HomePage = ({ onNavigate, searchQuery }: HomePageProps) => {
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All');

  // Get unique cuisines
  const cuisines = ['All', ...new Set(restaurants.flatMap((r) => r.cuisine))];

  // Filter restaurants
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesCuisine =
      selectedCuisine === 'All' || restaurant.cuisine.includes(selectedCuisine);
    const matchesSearch =
      searchQuery === '' ||
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.some((c) =>
        c.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCuisine && matchesSearch;
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-white mb-4">
              Your Favorite Food
              <br />
              Delivered Hot & Fresh
            </h1>
            <p className="text-xl mb-8 text-orange-50">
              Order from the best local restaurants with easy, on-demand delivery.
            </p>
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100"
              onClick={() => {
                document.getElementById('restaurants')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Order Now
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="mb-2">Wide Selection</h3>
              <p className="text-gray-600">Choose from hundreds of restaurants</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your food in 30 minutes or less</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="mb-2">24/7 Service</h3>
              <p className="text-gray-600">Order anytime, anywhere</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="mb-2">Quality Food</h3>
              <p className="text-gray-600">Only the best restaurants</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cuisine Filter */}
      <section id="restaurants" className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-6">Browse by Cuisine</h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {cuisines.map((cuisine) => (
              <Button
                key={cuisine}
                variant={selectedCuisine === cuisine ? 'default' : 'outline'}
                onClick={() => setSelectedCuisine(cuisine)}
                className={
                  selectedCuisine === cuisine
                    ? 'bg-orange-600 hover:bg-orange-700'
                    : ''
                }
              >
                {cuisine}
              </Button>
            ))}
          </div>

          {/* Restaurants Grid */}
          <h2 className="mb-6">
            {searchQuery
              ? `Search results for "${searchQuery}"`
              : selectedCuisine === 'All'
              ? 'All Restaurants'
              : `${selectedCuisine} Restaurants`}
          </h2>
          {filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={() => onNavigate('restaurant', restaurant.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No restaurants found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4">Ready to order?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of happy customers enjoying delicious food delivered to their door.
          </p>
          <Button
            size="lg"
            className="bg-orange-600 hover:bg-orange-700"
            onClick={() => {
              document.getElementById('restaurants')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Start Ordering
          </Button>
        </div>
      </section>
    </div>
  );
};
