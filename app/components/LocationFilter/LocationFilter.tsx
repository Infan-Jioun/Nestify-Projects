import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function LocationFilter() {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="All Cities" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>United States</SelectLabel>
          <SelectItem value="California">California</SelectItem>
          <SelectItem value="Michigan">Michigan</SelectItem>
          <SelectItem value="Ohio">Ohio</SelectItem>
          <SelectItem value="New York">New York</SelectItem>
          <SelectItem value="Georgia">Georgia</SelectItem>
          <SelectItem value="Illinois">Illinois</SelectItem>
        </SelectGroup>

      </SelectContent>
    </Select>
  )
}
