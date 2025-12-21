import React from 'react';
import { Plus, Leaf, TrendingUp } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MenuItem } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MenuItemCardProps {
  menuItem: MenuItem;
  onAddToCart: () => void;
}

export const MenuItemCard = ({ menuItem, onAddToCart }: MenuItemCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex gap-4 p-4">
        <div className="flex-1">
          <div className="flex items-start gap-2 mb-2">
            <div className="flex-1">
              <h4>{menuItem.name}</h4>
              {(menuItem.isVegetarian || menuItem.isPopular) && (
                <div className="flex gap-2 mt-1">
                  {menuItem.isVegetarian && (
                    <Badge variant="secondary" className="text-xs">
                      <Leaf className="w-3 h-3 mr-1" />
                      Vegetarian
                    </Badge>
                  )}
                  {menuItem.isPopular && (
                    <Badge variant="default" className="text-xs bg-orange-500">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-3">{menuItem.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-orange-600">${menuItem.price.toFixed(2)}</span>
            <Button size="sm" onClick={onAddToCart} className="bg-orange-600 hover:bg-orange-700">
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
        <div className="w-24 h-24 flex-shrink-0">
          <ImageWithFallback
            src={menuItem.image}
            alt={menuItem.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </Card>
  );
};
