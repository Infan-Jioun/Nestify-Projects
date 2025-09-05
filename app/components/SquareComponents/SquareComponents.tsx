import { Input } from '@/components/ui/input';
import React from 'react';

interface SquareComponentsProps {
  minSqFt: string;
  maxSqFt: string;
  onMinSqFtChange: (value: string) => void;
  onMaxSqFtChange: (value: string) => void;
}

export default function SquareComponents({
  minSqFt,
  maxSqFt,
  onMinSqFtChange,
  onMaxSqFtChange
}: SquareComponentsProps) {
  return (
    <div className="mt-5">
      <p className="font-semibold text-black">Square Feet</p>
      <div className="flex items-center gap-3 mt-3">
        <Input
          type="number"
          placeholder="min"
          className="w-1/2"
          value={minSqFt}
          onChange={(e) => onMinSqFtChange(e.target.value)}
        />
        -
        <Input
          type="number"
          placeholder="max"
          className="w-1/2"
          value={maxSqFt}
          onChange={(e) => onMaxSqFtChange(e.target.value)}
        />
      </div>
    </div>
  );
}
