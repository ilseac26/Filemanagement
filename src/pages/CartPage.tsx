import React from 'react';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface CartPageProps {
  onNavigate: (page: string) => void;
}

export const CartPage = ({ onNavigate }: CartPageProps) => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const calculateItemPrice = (item: any) => {
    let price = item.menuItem.price;
    
    // Add size price
    if (item.customization?.size && item.menuItem.sizes) {
      const size = item.menuItem.sizes.find((s: any) => s.name === item.customization?.size);
      if (size) price += size.price;
    }
    
    // Add addon prices
    if (item.customization?.addons && item.menuItem.addons) {
      item.customization.addons.forEach((addonName: string) => {
        const addon = item.menuItem.addons!.find((a: any) => a.name === addonName);
        if (addon) price += addon.price;
      });
    }
    
    return price;
  };

  const subtotal = getCartTotal();
  const deliveryFee = cartItems.length > 0 ? cartItems[0].restaurant.deliveryFee : 0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + deliveryFee + tax;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          <h2 className="mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Add items from a restaurant to start building your order.
          </p>
          <Button
            onClick={() => onNavigate('home')}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Browse Restaurants
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => onNavigate('home')} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Continue Shopping
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <h2 className="mb-6">Your Order</h2>
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <Card key={`${item.menuItem.id}-${index}`}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 flex-shrink-0">
                      <ImageWithFallback
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4>{item.menuItem.name}</h4>
                          <p className="text-sm text-gray-600">{item.restaurant.name}</p>
                          {/* Display customizations */}
                          {item.customization && (
                            <div className="mt-1 text-xs text-gray-500">
                              {item.customization.size && (
                                <p>Size: {item.customization.size}</p>
                              )}
                              {item.customization.addons && item.customization.addons.length > 0 && (
                                <p>Add-ons: {item.customization.addons.join(', ')}</p>
                              )}
                              {item.customization.specialInstructions && (
                                <p>Note: {item.customization.specialInstructions}</p>
                              )}
                            </div>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(index)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(index, item.quantity - 1)
                            }
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(index, item.quantity + 1)
                            }
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <span className="text-orange-600">
                          ${(calculateItemPrice(item) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h3 className="mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Button
                className="w-full bg-orange-600 hover:bg-orange-700"
                onClick={() => onNavigate('checkout')}
              >
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};