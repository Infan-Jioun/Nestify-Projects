"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { fetchProperties, setPage } from "@/app/features/Properties/propertySlice";
import PropertyCard from "./PropertyCard";
import { Button } from "@/components/ui/button";

export default function PropertyList() {
  const dispatch = useDispatch<AppDispatch>();
  const { properties, loading, error, page, limit, total } = useSelector(
    (state: RootState) => state.properties
  );

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    dispatch(fetchProperties({ page, limit }));
  }, [dispatch, page, limit]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setPage(newPage));
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(property => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
        <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
          Previous
        </Button>

        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            variant={page === i + 1 ? "default" : "outline"}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Button>
        ))}

        <Button disabled={page === totalPages} onClick={() => handlePageChange(page + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
