import { PropertyType } from "@/app/Types/properties";
import { Field, propertyCategoryData } from "@/lib/proprtyCategory";
import {
    Bed, Bath, Ruler, TreePine, Car, Home, Layers, Calendar
} from "lucide-react";

export const getPropertyCategoryType = (property: PropertyType): string => {
    if (!property.category) return 'residential';

    const categoryName = property.category.name.toLowerCase();

    if (categoryName.includes('land') || categoryName.includes('plot')) {
        return 'land';
    } else if (categoryName.includes('commercial') ||
        categoryName.includes('office') ||
        categoryName.includes('shop') ||
        categoryName.includes('warehouse') ||
        categoryName.includes('restaurant')) {
        return 'commercial';
    } else {
        return 'residential';
    }
};

export const getCategorySpecificFields = (property: PropertyType): Field[] => {
    if (!property.category) return [];
    const categoryName = property.category.name;
    return propertyCategoryData[categoryName] || [];
};

export interface FeatureIcon {
    icon: React.ReactNode;
    label: string;
    value: string;
}

export const getFeatureIcons = (property: PropertyType): FeatureIcon[] => {
    const categoryFields = getCategorySpecificFields(property);
    const featuredFields = categoryFields.slice(0, 4);

    return featuredFields.map(field => {
        let icon;
        switch (field.name) {
            case 'bedrooms':
                icon = <Bed size={24} />;
                break;
            case 'bathrooms':
                icon = <Bath size={24} />;
                break;
            case 'landArea':
            case 'floorArea':
            case 'propertySize':
                icon = <Ruler size={24} />;
                break;
            case 'plotNumber':
                icon = <Layers size={24} />;
                break;
            case 'landType':
                icon = <TreePine size={24} />;
                break;
            case 'parkingSpaces':
                icon = <Car size={24} />;
                break;
            case 'floor':
                icon = <Home size={24} />;
                break;
            case 'roomsSections':
                icon = <Layers size={24} />;
                break;
            case "yearBuild":
                icon = <Calendar size={24} />;
                break;
            default:
                icon = <Home size={24} />;
        }

        const value = property[field.name as keyof PropertyType];
        // Ensure value is always string
        const stringValue = value !== null && value !== undefined ? value.toString() : "N/A";

        return {
            icon,
            label: field.label,
            value: stringValue
        };
    });
};

export interface PropertyDetail {
    label: string;
    value: string;
}

export const getPropertyDetails = (property: PropertyType): PropertyDetail[] => {
    const categoryFields = getCategorySpecificFields(property);

    const categoryDetails = categoryFields.map(field => {
        const value = property[field.name as keyof PropertyType];
        // Ensure value is always string
        const stringValue = value !== null && value !== undefined ? value.toString() : "N/A";

        return {
            label: field.label,
            value: stringValue
        };
    });

    const commonDetails: PropertyDetail[] = [
        {
            label: "Property Size",
            value: `${property.propertySize?.toString() || "N/A"} sqft`
        },
        {
            label: "Status",
            value: property.status || "N/A"
        },
        {
            label: "Listing Status",
            value: property.listingStatus || "N/A"
        },
        {
            label: "Address",
            value: property.address || "N/A"
        },
        {
            label: "Year Build",
            value: property.yearBuild?.toString() || "N/A"
        },
    ];

    return [...categoryDetails, ...commonDetails];
};