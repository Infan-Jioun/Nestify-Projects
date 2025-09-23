"use client";

import { AlertCircleIcon, ImageUpIcon, XIcon } from "lucide-react";
import { useFileUpload } from "@/hooks/use-file-upload";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { CityInfo } from "@/lib/CityInfo";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";


type CityImageProps = {
    register: UseFormRegister<CityInfo>;
    setValue: UseFormSetValue<CityInfo>;
};

export default function ImageSection({ register, setValue }: CityImageProps) {
    const maxSizeMB = 5;
    const maxSize = maxSizeMB * 1024 * 1024;

    const [
        { files, isDragging, errors },
        {
            handleDragEnter,
            handleDragLeave,
            handleDragOver,
            handleDrop,
            openFileDialog,
            removeFile,
            getInputProps,
        },
    ] = useFileUpload({ accept: "image/*", maxSize });

    const previewUrl = files[0]?.preview || null;
    useEffect(() => {
        const fileList: File[] = files
            .map(f => f.file)
            .filter((f): f is File => f instanceof File)

        setValue("cityImage", fileList[0] || null, { shouldValidate: true });
    }, [files, setValue])

    return (
        <div className="px-7  flex flex-col gap-2 mt-5">
            <div
                role="button"
                onClick={openFileDialog}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                data-dragging={isDragging || undefined}
                className="border border-dashed p-4 rounded-xl text-center"
            >
                <input {...getInputProps()} className="sr-only" />
                {previewUrl ? (
                    <div className="relative">
                        <img src={previewUrl} alt="preview" className="w-full h-52 object-cover rounded-xl" />
                        <button
                            type="button"
                            onClick={() => removeFile(files[0]?.id)}
                            className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1"
                        >
                            <XIcon className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <ImageUpIcon className="w-8 h-8 mb-2" />
                        <p>Drop your image here or click to browse (Max {maxSizeMB}MB)</p>
                    </div>
                )}
            </div>

            {errors.length > 0 && (
                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircleIcon className="w-4 h-4" />
                    <span>{errors[0]}</span>
                </div>
            )}
        </div>
    );
}
