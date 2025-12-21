import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Separator } from './ui/separator';
import { MenuItem, ItemCustomization } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CustomizeItemDialogProps {
  menuItem: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (customization: ItemCustomization) => void;
}

export const CustomizeItemDialog = ({
  menuItem,
  isOpen,
  onClose,
  onSave,
}: CustomizeItemDialogProps) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Reset state when menuItem changes
  useEffect(() => {
    if (menuItem) {
      setSelectedSize(menuItem.sizes?.[0]?.name || '');
      setSelectedAddons([]);
      setSpecialInstructions('');
    }
  }, [menuItem]);

  const handleAddonToggle = (addonName: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonName)
        ? prev.filter((name) => name !== addonName)
        : [...prev, addonName]
    );
  };

  const calculateTotal = () => {
    let total = menuItem?.price || 0;

    // Add size price
    if (selectedSize && menuItem?.sizes) {
      const size = menuItem.sizes.find((s) => s.name === selectedSize);
      if (size) total += size.price;
    }

    // Add addon prices
    if (menuItem?.addons) {
      selectedAddons.forEach((addonName) => {
        const addon = menuItem.addons!.find((a) => a.name === addonName);
        if (addon) total += addon.price;
      });
    }

    return total;
  };

  const handleAddToCart = () => {
    const customization: ItemCustomization = {
      size: selectedSize || undefined,
      addons: selectedAddons,
      specialInstructions: specialInstructions || undefined,
    };
    onSave(customization);
    // Reset form
    setSelectedSize(menuItem?.sizes?.[0]?.name || '');
    setSelectedAddons([]);
    setSpecialInstructions('');
  };

  const hasCustomizations = menuItem?.sizes || menuItem?.addons;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Customize Your Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Item Info */}
          <div className="flex gap-4">
            <div className="w-24 h-24 flex-shrink-0">
              <ImageWithFallback
                src={menuItem?.image || ''}
                alt={menuItem?.name || ''}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div>
              <h3>{menuItem?.name}</h3>
              <p className="text-gray-600 text-sm">{menuItem?.description}</p>
              <p className="text-orange-600 mt-2">
                ${menuItem?.price.toFixed(2) || '0.00'}
              </p>
            </div>
          </div>

          <Separator />

          {/* Size Selection */}
          {menuItem?.sizes && menuItem.sizes.length > 0 && (
            <div>
              <Label className="mb-3 block">Select Size (Required)</Label>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                {menuItem.sizes.map((size) => (
                  <div
                    key={size.name}
                    className="flex items-center justify-between p-3 border rounded-lg mb-2 hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={size.name} id={size.name} />
                      <Label htmlFor={size.name} className="cursor-pointer">
                        {size.name}
                      </Label>
                    </div>
                    <span className="text-sm">
                      {size.price > 0 ? `+$${size.price.toFixed(2)}` : 'Base price'}
                    </span>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Add-ons */}
          {menuItem?.addons && menuItem.addons.length > 0 && (
            <div>
              <Label className="mb-3 block">Add-ons (Optional)</Label>
              <div className="space-y-2">
                {menuItem.addons.map((addon) => (
                  <div
                    key={addon.name}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={addon.name}
                        checked={selectedAddons.includes(addon.name)}
                        onCheckedChange={() => handleAddonToggle(addon.name)}
                      />
                      <Label htmlFor={addon.name} className="cursor-pointer">
                        {addon.name}
                      </Label>
                    </div>
                    <span className="text-sm">+${addon.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div>
            <Label htmlFor="instructions" className="mb-2 block">
              Special Instructions (Optional)
            </Label>
            <Textarea
              id="instructions"
              placeholder="Add any special requests (e.g., no onions, extra sauce)"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <div className="flex-1 text-left">
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-orange-600">${calculateTotal().toFixed(2)}</p>
          </div>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleAddToCart}
            className="bg-orange-600 hover:bg-orange-700"
          >
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};