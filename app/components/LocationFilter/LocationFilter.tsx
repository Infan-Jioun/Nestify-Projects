"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const locations = [
  { value: "all", label: "All Cities" },
  { value: "California", label: "California" },
  { value: "Los Angeles", label: "Los Angeles" },
  { value: "New Jersy", label: "New Jersy" },
  { value: "New York", label: "New York" },
  { value: "San Diego", label: "San Diego" },
  { value: "San Fransico", label: "San Fransico" },
]

export function LocationFilter() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("all")

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[220px] justify-between rounded-lg shadow-sm"
          >
            {locations.find((location) => location.value === value)?.label}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[220px] p-0 rounded-lg shadow-lg">
          <Command>
            <CommandInput placeholder="Search location..." />
            <CommandList>
              <CommandEmpty>No location found.</CommandEmpty>
              <CommandGroup>
                {locations.map((location) => (
                  <CommandItem
                    key={location.value}
                    value={location.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue)
                      setOpen(false)
                    }}
                    className={cn(
                      "cursor-pointer rounded-md px-2 py-1.5",
                      value === location.value
                        ? "bg-blue-100 text-blue-600"
                        : "hover:bg-gray-100"
                    )}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === location.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {location.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
