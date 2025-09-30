"use client"

import React, { useState, useRef, KeyboardEvent } from 'react'
import { X, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface TagsInputProps {
    tags?: string[]
    onTagsChange?: (tags: string[]) => void  
    placeholder?: string
    maxTags?: number
    className?: string
}

export function Tags({
    tags = [],
    onTagsChange = () => { },  
    placeholder = "Add tags...",
    maxTags = 10,
    className = ""
}: TagsInputProps) {
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const addTag = (tag: string) => {
        const trimmedTag = tag.trim()
        if (trimmedTag && !tags.includes(trimmedTag) && tags.length < maxTags) {
            onTagsChange([...tags, trimmedTag])
            setInputValue('')
        }
    }

    const removeTag = (tagToRemove: string) => {
        onTagsChange(tags.filter(tag => tag !== tagToRemove))
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addTag(inputValue)
        } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
            removeTag(tags[tags.length - 1])
        }
    }

    const handleAddClick = () => {
        addTag(inputValue)
    }

    return (
        <div className={`space-y-3 ${className}`}>
            {/* Selected Tags */}
            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <Badge
                            key={index}
                            variant="secondary"
                            className="px-3 py-1.5 text-sm bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                        >
                            {tag}
                            <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-2 hover:text-green-900 transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </Badge>
                    ))}
                </div>
            )}

            {/* Input Section */}
            <div className="flex gap-2">
                <div className="flex-1 relative">
                    <Input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="pr-20"
                        disabled={tags.length >= maxTags}
                    />
                    {tags.length > 0 && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <span className="text-xs text-gray-500">
                                {tags.length}/{maxTags}
                            </span>
                        </div>
                    )}
                </div>

                <Button
                    type="button"
                    onClick={handleAddClick}
                    disabled={!inputValue.trim() || tags.length >= maxTags}
                    size="sm"
                    className="whitespace-nowrap"
                >
                    <Plus size={16} className="mr-1" />
                    Add
                </Button>
            </div>

            {/* Helper Text */}
            {tags.length >= maxTags && (
                <p className="text-sm text-red-500">
                    Maximum {maxTags} tags allowed
                </p>
            )}
        </div>
    )
}