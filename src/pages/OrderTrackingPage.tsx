import React, { useState, useEffect } from 'react';
import { CheckCircle2, Package, Truck, Home } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';

interface OrderTrackingPageProps {
  onNavigate: (page: string) => void;
}

export const OrderTrackingPage = ({ onNavigate }: OrderTrackingPageProps) => {
  const [orderStatus, setOrderStatus] = useState<'preparing' | 'on-the-way' | 'delivered'>('preparing');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate order progress
    const timer1 = setTimeout(() => {
      setOrderStatus('on-the-way');
      setProgress(50);
    }, 3000);

    const timer2 = setTimeout(() => {
      setOrderStatus('delivered');
      setProgress(100);
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const getStatusStep = (status: typeof orderStatus) => {
    switch (status) {
      case 'preparing':
        return 1;
      case 'on-the-way':
        return 2;
      case 'delivered':
        return 3;
      default:
        return 1;
    }
  };

  const currentStep = getStatusStep(orderStatus);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Order #12345</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <Progress value={progress} className="h-2 mb-4" />
          <div className="flex justify-between">
            <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-orange-600' : 'text-gray-400'}`}>
              <Package className="w-8 h-8 mb-2" />
              <p className="text-sm">Preparing</p>
            </div>
            <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-orange-600' : 'text-gray-400'}`}>
              <Truck className="w-8 h-8 mb-2" />
              <p className="text-sm">On the Way</p>
            </div>
            <div className={`flex flex-col items-center ${currentStep >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
              <Home className="w-8 h-8 mb-2" />
              <p className="text-sm">Delivered</p>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="mb-4">Delivery Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Delivery Address</p>
                <p>123 Main St, New York, NY 10001</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estimated Delivery Time</p>
                <p>30-45 minutes</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact Number</p>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Message */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="text-center">
              {orderStatus === 'preparing' && (
                <div>
                  <Package className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                  <h3 className="mb-2">Preparing Your Order</h3>
                  <p className="text-gray-600">
                    The restaurant is preparing your delicious food with care.
                  </p>
                </div>
              )}
              {orderStatus === 'on-the-way' && (
                <div>
                  <Truck className="w-12 h-12 text-orange-600 mx-auto mb-3" />
                  <h3 className="mb-2">On the Way</h3>
                  <p className="text-gray-600">
                    Your order is on its way! Our delivery partner will arrive soon.
                  </p>
                </div>
              )}
              {orderStatus === 'delivered' && (
                <div>
                  <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h3 className="mb-2">Delivered!</h3>
                  <p className="text-gray-600">
                    Enjoy your meal! Thank you for ordering with FoodHub.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onNavigate('home')}
          >
            Order Again
          </Button>
          {orderStatus === 'delivered' && (
            <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
              Rate Order
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
