"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LocationFilterProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function LocationFilter({ value, onChange }: LocationFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="All Cities" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>United States</SelectLabel>
          <SelectItem value="all">All Cities</SelectItem>
          <SelectItem value="California">California</SelectItem>
          <SelectItem value="Michigan">Michigan</SelectItem>
          <SelectItem value="Ohio">Ohio</SelectItem>
          <SelectItem value="New York">New York</SelectItem>
          <SelectItem value="Georgia">Georgia</SelectItem>
          <SelectItem value="Illinois">Illinois</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
