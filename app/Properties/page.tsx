"use client"
import { useState } from "react";
import FilterSidebar, { Filters } from "../components/FilterSidebar/page";
import NextHead from "../components/NextHead/page";
import PropertiesTitle from "./PropertiesTitle/page";
import PropertyCard from "../components/PropertyCard/page";

export default function PropertiesPage() {
  const [filters, setFilters] = useState<Filters | undefined>(undefined);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 lg:px-0">
      <NextHead title="Properties - Nestify" />
      <PropertiesTitle />

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="lg:w-1/4 w-full">
          <FilterSidebar onFilterChange={setFilters} />
        </div>
        <div className="lg:w-3/4 w-full">
          <PropertyCard filters={filters} />
        </div>
      </div>
    </div>
  );
}
