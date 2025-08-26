
"use client"

import React from 'react'
import Select from 'react-select'

interface CustomSelectProps {
    options: { value: string; label: string }[]
    placeholder: string
    isLoading: boolean
    value: string
    onChange: (value: string) => void
    error?: { message?: string }
    name: string
}

export function CustomSelect({
    options,
    placeholder,
    isLoading,
    value,
    onChange,
    error,
    name
}: CustomSelectProps) {
    return (
        <div>
            <Select
                options={options}
                placeholder={placeholder}
                isLoading={isLoading}
                value={options.find(opt => opt.value === value)}
                onChange={selected => onChange(selected?.value || '')}
                name={name}
                className="react-select-container"
                classNamePrefix="react-select"
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error.message}</p>
            )}
        </div>
    )
}