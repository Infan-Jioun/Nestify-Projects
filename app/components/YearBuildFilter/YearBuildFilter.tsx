import { Input } from '@/components/ui/input';
import React from 'react';

interface YearBuildFilterProps {
  minYear: string;
  maxYear: string;
  onMinYearChange: (value: string) => void;
  onMaxYearChange: (value: string) => void;
}

export default function YearBuildFilter({
  minYear,
  maxYear,
  onMinYearChange,
  onMaxYearChange
}: YearBuildFilterProps) {
  return (
    <div className="mt-5">
      <p className="font-semibold text-black">Year Built</p>
      <div className="flex items-center gap-3 mt-3">
        <Input
          type="number"
          placeholder="Min Year"
          className="w-1/2"
          value={minYear}
          onChange={(e) => onMinYearChange(e.target.value)}
        />
        -
        <Input
          type="number"
          placeholder="Max Year"
          className="w-1/2"
          value={maxYear}
          onChange={(e) => onMaxYearChange(e.target.value)}
        />
      </div>
    </div>
  );
}
