import { useId } from "react"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FieldErrors,  UseFormSetValue } from "react-hook-form"
import { Inputs } from "../Inputs"

type ListingStatusProps = {

  setValue: UseFormSetValue<Inputs>
  errors: FieldErrors<Inputs>
}
export default function ListingStatus({  setValue, errors }: ListingStatusProps) {
  const id = useId()
  return (
    <div className="*:not-first:mt-2">
      <Label className="mb-2 block text-gray-700 text-xs" htmlFor={id}>Select Listing Status</Label>
      <Select onValueChange={(value) => setValue("listingStatus", value as "Sale" | "Rent", {shouldValidate: true})}>
        <SelectTrigger id={id}>
          <SelectValue placeholder="Select Status (Sale or Rent)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Sale" >
            Sale
          </SelectItem>
          <SelectItem value="Rent">Rent</SelectItem>

        </SelectContent>
      </Select>
      {errors.listingStatus && <p className="text-red-500 text-sm">{errors.listingStatus.message}</p>}
    </div>
  )
}
