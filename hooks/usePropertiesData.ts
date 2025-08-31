// hooks/usePropertiesData.ts
import Property from "@/app/models/properties";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { InferSchemaType } from "mongoose";

export type PropertyType = InferSchemaType<typeof Property.schema>;

export default function usePropertiesData() {
    return useQuery<PropertyType[]>({
        queryKey: ["propertiesData", "getAll"],
        queryFn: async () => {
            const res = await axios.get("/api/properties");
            return res.data as PropertyType[];
        },
    });
}
