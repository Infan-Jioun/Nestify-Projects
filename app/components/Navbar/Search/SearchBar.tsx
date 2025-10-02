"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/lib/store";
import {
    setQuery, clearSuggestions, addRecent, removeRecent, fetchSuggestions, clearRecent, Suggestion,
} from "@/app/features/search/searchSlice";
import { Input } from "@/components/ui/input";
import { Search, X, Clock, Building, MapPin, Loader } from "lucide-react";

const SearchBox: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { query, suggestions, recent, loading } = useSelector(
        (state: RootState) => state.search
    );

    const [showDropdown, setShowDropdown] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
    const containerRef = useRef<HTMLDivElement>(null);

    // Fetch suggestions with debounce
    useEffect(() => {
        if (query.length >= 2) {
            const timer = setTimeout(() => dispatch(fetchSuggestions(query)), 300);
            return () => clearTimeout(timer);
        } else {
            dispatch(clearSuggestions());
        }
    }, [query, dispatch]);

    // Scroll highlighted item into view
    useEffect(() => {
        if (containerRef.current && highlightedIndex >= 0) {
            const items = containerRef.current.querySelectorAll<HTMLDivElement>(".search-item");
            const current = items[highlightedIndex];
            if (current) {
                current.scrollIntoView({ block: "nearest" });
            }
        }
    }, [highlightedIndex]);

    // Input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setQuery(e.target.value));
        setShowDropdown(true);
        setHighlightedIndex(-1);
    };

    // Clear input
    const clearInput = () => {
        dispatch(setQuery(""));
        dispatch(clearSuggestions());
        setHighlightedIndex(-1);
    };


    const handleSelect = useCallback(
        (item: Suggestion | string) => {
            const displayText = typeof item === "string" ? item : item.title;
            dispatch(setQuery(displayText));
            dispatch(addRecent(displayText));
            setShowDropdown(false);

            if (typeof item !== "string") {
                if (item.type === "category") {
                    router.push(`/category/${encodeURIComponent(item.title)}`);
                } else if (item.type === "property") {
                    router.push(`/Properties/${item.id}`);
                }
            } else {
                router.push(`/Properties?search=${encodeURIComponent(item)}`);
            }
        },
        [dispatch, router]
    );


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const totalItems = suggestions.length + (query ? 1 : 0);
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightedIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (highlightedIndex === -1) handleSelect(query);
            else if (highlightedIndex < suggestions.length) handleSelect(suggestions[highlightedIndex]);
            else handleSelect(query);
        }
    };


    const handleFocus = () => setShowDropdown(true);
    const handleBlur = () => setTimeout(() => setShowDropdown(false), 150);

    return (
        <div className="relative w-full max-w-2xl mx-auto" ref={containerRef}>
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        type="text"
                        value={query}
                        placeholder="Search properties, categories..."
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={clearInput}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>

            {showDropdown && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-96 overflow-y-auto z-50">
                    {loading && (
                        <div className="p-4 flex items-center justify-center text-gray-500">
                            <Loader className="h-4 w-4 animate-spin mr-2" />
                            {`No results found for "${query}"`}
                        </div>
                    )}

                    {/* Recent searches */}
                    {!loading && !query && recent.length > 0 && (
                        <div className="p-2 border-b">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-sm font-semibold text-gray-600 flex items-center">
                                    <Clock className="h-4 w-4 mr-1" /> Recent Searches
                                </h3>
                                <button
                                    className="text-xs text-red-500 hover:underline"
                                    onMouseDown={() => dispatch(clearRecent())}
                                >
                                    Clear All
                                </button>
                            </div>
                            {recent.map((r, idx) => (
                                <div
                                    key={idx}
                                    className={`search-item flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer ${highlightedIndex === idx ? "bg-gray-100" : ""
                                        }`}
                                    onMouseDown={() => handleSelect(r)}
                                    onMouseEnter={() => setHighlightedIndex(idx)}
                                >
                                    <div className="flex items-center text-sm flex-1">
                                        <Clock className="h-3 w-3 mr-2 text-gray-400" /> {r}
                                    </div>
                                    <button
                                        onMouseDown={(e) => {
                                            e.stopPropagation();
                                            dispatch(removeRecent(r));
                                        }}
                                        className="text-gray-400 hover:text-red-500 p-1"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Suggestions */}
                    {!loading && query && suggestions.length > 0 && (
                        <div className="p-2">
                            <h3 className="text-sm font-semibold text-gray-600 mb-2">
                                Suggestions
                            </h3>
                            {suggestions.map((s, idx) => (
                                <div
                                    key={idx}
                                    className={`search-item flex items-start px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer ${highlightedIndex === idx ? "bg-gray-100" : ""
                                        }`}
                                    onMouseDown={() => handleSelect(s)}
                                    onMouseEnter={() => setHighlightedIndex(idx)}
                                >
                                    {s.type === "category" ? (
                                        <Building className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                    ) : (
                                        <MapPin className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                    )}
                                    <div className="flex-1 ml-2 min-w-0">
                                        <div className="text-sm font-medium text-gray-900 truncate">
                                            {s.title}
                                        </div>
                                        {s.type === "property" && s.subtitle && (
                                            <div className="text-xs text-gray-500 truncate">{s.subtitle}</div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* See all results */}
                            <button
                                className={`search-item w-full text-center px-3 py-2 mt-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-md text-sm font-medium ${highlightedIndex === suggestions.length ? "bg-green-100" : ""
                                    }`}
                                onMouseDown={() => handleSelect(query)}
                                onMouseEnter={() => setHighlightedIndex(suggestions.length)}
                            >
                                {`No results found for "${query}"`}
                            </button>
                        </div>
                    )}

                    {/* No results found */}
                    {!loading && query.length >= 2 && suggestions.length === 0 && (
                        <div className="p-4 text-center text-gray-500">
                            {`No results found for "${query}"`}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBox;
