import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Separator } from './ui/separator';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white mb-4">FoodHub</h3>
            <p className="text-sm">
              Your favorite food, delivered fast. Discover the best restaurants in your area and enjoy delicious meals at home.
            </p>
            <div className="flex gap-4 mt-4">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-orange-500 transition-colors" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-orange-500 transition-colors" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-orange-500 transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li className="cursor-pointer hover:text-orange-500 transition-colors">About Us</li>
              <li className="cursor-pointer hover:text-orange-500 transition-colors">Restaurants</li>
              <li className="cursor-pointer hover:text-orange-500 transition-colors">Become a Partner</li>
              <li className="cursor-pointer hover:text-orange-500 transition-colors">Careers</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li className="cursor-pointer hover:text-orange-500 transition-colors">Help Center</li>
              <li className="cursor-pointer hover:text-orange-500 transition-colors">Terms of Service</li>
              <li className="cursor-pointer hover:text-orange-500 transition-colors">Privacy Policy</li>
              <li className="cursor-pointer hover:text-orange-500 transition-colors">Contact Us</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@foodhub.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        <div className="text-center text-sm">
          <p>&copy; 2025 FoodHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
