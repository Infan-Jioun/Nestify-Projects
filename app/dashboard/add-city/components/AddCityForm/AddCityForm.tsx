"use client"


import { useForm } from "react-hook-form"
import CitySelectSection from "./Components/CitySelectSection"
import ImageSection from "./Components/ImageSection"
import { CityInfo } from "@/lib/CityInfo";



export default function AddCityForm() {
    const { register, handleSubmit, watch, setValue, control, reset, formState: { errors },
    } = useForm<CityInfo>();
    const onSubmit = (data: CityInfo) => {
    console.log(data);
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <ImageSection register={register} errors={errors} setValue={setValue} />
                <CitySelectSection control={control} errors={errors} />

            </form>
        </div>
    )
}
