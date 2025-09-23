"use client";

import { useForm } from "react-hook-form";
import CitySelectSection from "./Components/CitySelectSection";
import ImageSection from "./Components/ImageSection";
import { CityInfo } from "@/lib/CityInfo";
import { Button } from "@/components/ui/button";
import { imageUpload } from "@/hooks/useImageUpload";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { Loader } from "lucide-react";
import { setButtonLoader } from "@/app/features/loader/loaderSlice";
import { useRouter } from "next/navigation";

export default function AddCityForm() {
    const {
        register,
        handleSubmit,
        setValue,
        control,
        reset,
        formState: { errors },
    } = useForm<CityInfo>();
const router = useRouter();
    const buttonLoader = useSelector((state: RootState) => state.loader.buttonLoader);
    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = async (data: CityInfo) => {
        dispatch(setButtonLoader(true));
        try {
            let imageUrl = "";

            if (data.cityImage instanceof File) {
                const uploadRes = await imageUpload(data.cityImage);
                imageUrl = uploadRes.data.url;
            } else if (typeof data.cityImage === "string") {
                imageUrl = data.cityImage;
            }

            const payload = {
                cityName: data.cityName.trim(),
                cityImage: imageUrl,
            };

            const res = await axios.post("/api/addCity", payload);
            toast.success("City added successfully!");
            reset();
            router.push("/seeAllCities");
            if (res.status === 200) {
                console.log("City Added:", res.data);
            }
        } catch (error) {
            console.error("City Add Error:", error);
            toast.error("Failed to add city. Try again.");
        } finally {
            dispatch(setButtonLoader(false));
        }
    };

    return (
        <div className="border-t-4  ">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-7">
                <ImageSection register={register} setValue={setValue} />
                <CitySelectSection control={control} errors={errors} />

                <Button
                    type="submit"
                    className={`
                        w-full flex items-center justify-center gap-2
                        px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-4
                        rounded-lg
                        bg-green-500 hover:bg-green-600
                        text-white font-semibold text-sm sm:text-base
                        transition-colors duration-200
                    `}
                    disabled={buttonLoader}
                >
                    {buttonLoader ? (
                        <Loader className="animate-spin w-5 h-5" />
                    ) : (
                        "Add City"
                    )}
                </Button>
            </form>
        </div>
    );
}
