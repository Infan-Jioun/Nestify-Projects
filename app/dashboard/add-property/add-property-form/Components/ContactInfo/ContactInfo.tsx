"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FieldErrors, UseFormRegister, Controller, useForm } from 'react-hook-form'
import { Inputs } from '../Inputs'
import React, { useId } from "react"
import { ChevronDownIcon, PhoneIcon } from "lucide-react"
import * as RPNInput from "react-phone-number-input"
import flags from "react-phone-number-input/flags"
import { MailIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type ContactInfoProps = {
    register: UseFormRegister<Inputs>
    errors: FieldErrors<Inputs>
    control: any 
}

export default function ContactInfo({ register, errors, control }: ContactInfoProps) {
    const id = useId()

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Email Input */}
            <div>
                <Label htmlFor={id} className='mb-2 block text-gray-700 text-xs'>Email</Label>
                <div className="relative">
                    <Input
                        id={id}
                        className="peer pe-9"
                        placeholder="Email"
                        type="email"
                        {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && (
                        <span className="text-red-500 text-sm">{errors.email.message}</span>
                    )}
                    <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                        <MailIcon size={16} aria-hidden="true" />
                    </div>
                </div>
            </div>

            {/* Phone Input */}
            <div className="*:not-first:mt-2" dir="ltr">
                <Label htmlFor="contactNumber" className='mb-2 block text-gray-700 text-xs'>Phone</Label>
                <Controller
                    name="contactNumber"
                    control={control}
                    rules={{ required: "Contact number is required" }}
                    render={({ field }) => (
                        <RPNInput.default
                            {...field}
                            className="flex rounded-md shadow-xs"
                            international
                            flagComponent={FlagComponent}
                            countrySelectComponent={CountrySelect}
                            inputComponent={PhoneInput}
                            placeholder="Enter phone number"
                            value={field.value || ""}
                            onChange={(value) => field.onChange(value)}
                        />
                    )}
                />
                {errors.contactNumber && (
                    <span className="text-red-500 text-sm">{errors.contactNumber.message}</span>
                )}
            </div>
        </div>
    )
}

const PhoneInput = ({ className, ...props }: React.ComponentProps<"input">) => {
    return (
        <Input
            data-slot="phone-input"
            className={cn(
                "-ms-px rounded-s-none shadow-none focus-visible:z-10",
                className
            )}
            {...props}
        />
    )
}
PhoneInput.displayName = "PhoneInput"

type CountrySelectProps = {
    disabled?: boolean
    value: RPNInput.Country
    onChange: (value: RPNInput.Country) => void
    options: { label: string; value: RPNInput.Country | undefined }[]
}

const CountrySelect = ({ disabled, value, onChange, options }: CountrySelectProps) => {
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value as RPNInput.Country)
    }

    return (
        <div className="border-input bg-background text-muted-foreground focus-within:border-ring focus-within:ring-ring/50 hover:bg-accent hover:text-foreground relative inline-flex items-center self-stretch rounded-s-md border py-2 ps-3 pe-2 transition-[color,box-shadow] outline-none">
            <div className="inline-flex items-center gap-1" aria-hidden="true">
                <FlagComponent country={value} countryName={value} aria-hidden="true" />
                <span className="text-muted-foreground/80">
                    <ChevronDownIcon size={16} aria-hidden="true" />
                </span>
            </div>
            <select
                disabled={disabled}
                value={value}
                onChange={handleSelect}
                className="absolute inset-0 text-sm opacity-0"
                aria-label="Select country"
            >
                <option key="default" value="">
                    Select a country
                </option>
                {options.filter((x) => x.value).map((option, i) => (
                    <option key={option.value ?? `empty-${i}`} value={option.value}>
                        {option.label}{" "}
                        {option.value && `+${RPNInput.getCountryCallingCode(option.value)}`}
                    </option>
                ))}
            </select>
        </div>
    )
}

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
    const Flag = flags[country]
    return (
        <span className="w-5 overflow-hidden rounded-sm">
            {Flag ? <Flag title={countryName} /> : <PhoneIcon size={16} aria-hidden="true" />}
        </span>
    )
}
