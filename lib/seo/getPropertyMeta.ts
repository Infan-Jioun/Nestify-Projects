export async function getPropertyMeta(id: string) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties/${id}`,
            { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const property = await res.json();

        return {
            title: property?.title || "Property Details",
            description: property?.description || `${property?.bedrooms ?? ""} bed property in ${property?.geoCountryLocation ?? ""}`.trim(),
            image: property?.images?.[0] ?? null,
            price: property?.price ?? null,
            currency: property?.currency ?? null,
            location: property?.geoCountryLocation ?? null,
        };
    } catch {
        return {
            title: "Property Not Found",
            description: "This property does not exist or has been removed.",
            image: null,
            price: null,
            currency: null,
            location: null,
        };
    }
}