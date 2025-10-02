"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/lib/store";
import {
    setQuery,
    clearSuggestions,
    addRecent,
    removeRecent,
    fetchSuggestions,
    Suggestion,
} from "@/app/features/search/searchSlice";
import { Input } from "@/components/ui/input";
import { Search, X, Clock, Building, MapPin, Loader } from "lucide-react";

const SearchBox: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { query, suggestions, recent, loading } = useSelector(
        (state: RootState) => state.search
    );
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);

    // fetch suggestions
    useEffect(() => {
        if (query.length >= 2) {
            const timer = setTimeout(() => {
                dispatch(fetchSuggestions(query));
            }, 300);
            return () => clearTimeout(timer);
        } else {
            dispatch(clearSuggestions());
        }
    }, [query, dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setQuery(e.target.value));
    };

    // Amazon-style suggestion click handler
    const handleSuggestionClick = useCallback(
        (suggestion: Suggestion) => {
            // First set the query to show in input (Amazon-style)
            const displayText = suggestion.title;
            dispatch(setQuery(displayText));

            // Show loading state
            setIsNavigating(true);
            setShowSuggestions(false);

            // Add to recent searches
            dispatch(addRecent(displayText));

            // Navigate after a small delay to show the query in input
            setTimeout(() => {
                if (suggestion.type === "category") {
                    router.push(`/category/${encodeURIComponent(suggestion.title)}`);
                } else if (suggestion.type === "property") {
                    router.push(`/Properties/${suggestion.id}`);
                }

                dispatch(clearSuggestions());

                // Reset navigating state
                setTimeout(() => {
                    setIsNavigating(false);
                }, 500);
            }, 100);
        },
        [dispatch, router]
    );

    const handleRecentClick = (recentQuery: string) => {
        dispatch(setQuery(recentQuery));
        setShowSuggestions(true);
        dispatch(fetchSuggestions(recentQuery));
    };

    const handleRecentRemove = (e: React.MouseEvent, recentQuery: string) => {
        e.stopPropagation();
        dispatch(removeRecent(recentQuery));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            dispatch(addRecent(query.trim()));
            setIsNavigating(true);
            setShowSuggestions(false);
            router.push(`/search?q=${encodeURIComponent(query)}`);

            setTimeout(() => {
                setIsNavigating(false);
            }, 1000);
        }
    };

    const clearSearch = () => {
        dispatch(setQuery(""));
        dispatch(clearSuggestions());
        setShowSuggestions(false);
    };

    const handleInputFocus = () => {
        setShowSuggestions(true);
    };

    const handleInputBlur = () => {
        setTimeout(() => setShowSuggestions(false), 200);
    };

    // Enter key press handler for suggestions
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && query.trim()) {
            handleSubmit(e);
        }
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        type="text"
                        placeholder="Search properties, categories..."
                        value={query}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        onKeyDown={handleKeyDown}
                        className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </form>

            {/* Dropdown */}
            {showSuggestions && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-96 overflow-y-auto z-50">
                    {isNavigating ? (
                        <div className="p-4 text-center text-gray-500 flex items-center justify-center">
                            <Loader className="h-4 w-4 animate-spin mr-2" />
                            <div>{`Navigating to "${query}"...`}</div>

                        </div>
                    ) : (
                        <>
                            {/* Recent Searches */}
                            {!query && recent.length > 0 && (
                                <div className="p-2 border-b">
                                    <h3 className="text-sm font-semibold text-gray-600 mb-2 flex items-center">
                                        <Clock className="h-4 w-4 mr-1" />
                                        Recent Searches
                                    </h3>
                                    {recent.map((recentQuery, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                                            onClick={() => handleRecentClick(recentQuery)}
                                        >
                                            <div className="flex items-center text-sm flex-1">
                                                <Clock className="h-3 w-3 mr-2 text-gray-400" />
                                                {recentQuery}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={(e) => handleRecentRemove(e, recentQuery)}
                                                className="text-gray-400 hover:text-red-500 p-1"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Suggestions */}
                            {query && suggestions.length > 0 && (
                                <div className="p-2">
                                    <h3 className="text-sm font-semibold text-gray-600 mb-2">
                                        Suggestions
                                    </h3>
                                    {suggestions.map((suggestion, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => handleSuggestionClick(suggestion)}
                                            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md flex items-start space-x-3 transition-colors duration-150"
                                        >
                                            {suggestion.type === "category" ? (
                                                <Building className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                            ) : (
                                                <MapPin className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-medium text-gray-900 truncate">
                                                    {suggestion.title}
                                                </div>
                                                {suggestion.type === "property" &&
                                                    suggestion.subtitle && (
                                                        <div className="text-xs text-gray-500 truncate">
                                                            {suggestion.subtitle}
                                                        </div>
                                                    )}
                                                <div className="text-xs text-gray-400 capitalize">
                                                    {suggestion.type}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Search Results Button (Amazon-style) */}
                            {query && suggestions.length > 0 && (
                                <div className="p-2 border-t">
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="w-full text-center px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-md text-sm font-medium transition-colors duration-150"
                                    >
                                        See all results for &quot;{query}&quot;
                                    </button>
                                </div>
                            )}

                            {/* No Results Found */}
                            {query && query.length >= 2 && suggestions.length === 0 && !loading && (
                                <div className="p-4 text-center text-gray-500">
                                    No results found for &quot;{query}&quot;
                                </div>
                            )}

                            {/* Loading State */}
                            {query && loading && (
                                <div className="p-4 text-center text-gray-500 flex items-center justify-center">
                                    <Loader className="h-4 w-4 animate-spin mr-2" />
                                    Searching for &quot;{query}&quot;...
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBox;