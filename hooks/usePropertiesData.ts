import { PropertyType } from "@/app/Types/properties";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export default function usePropertiesData() {
    return useQuery<PropertyType[]>({
        queryKey: ["propertiesData", "getAll"],
        queryFn: async () => {
            const res = await axios.get("/api/properties");
            return res.data as PropertyType[];
        },
    });
}
