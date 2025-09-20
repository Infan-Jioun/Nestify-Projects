"use client"

import { AlertCircleIcon, ImageUpIcon, XIcon } from "lucide-react"

import { useFileUpload } from "@/hooks/use-file-upload"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
export default function AddCityForm() {
    const maxSizeMB = 5
    const maxSize = maxSizeMB * 1024 * 1024

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
    ] = useFileUpload({
        accept: "image/*",
        maxSize,
    })

    const previewUrl = files[0]?.preview || null

    return (
        <div>
            <div className="flex flex-col gap-2 drop-shadow-xl mt-5 border-t-2">
                <div className="relative">
                    {/* Drop area */}
                    <div
                        role="button"
                        onClick={openFileDialog}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        data-dragging={isDragging || undefined}
                        className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:ring-[3px]"
                    >
                        <input
                            {...getInputProps()}
                            className="sr-only"
                            aria-label="Upload file"
                        />
                        {previewUrl ? (
                            <div className="absolute inset-0">
                                <img
                                    src={previewUrl}
                                    alt={files[0]?.file?.name || "Uploaded image"}
                                    className="size-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center px-4 py-3 text-center ">
                                <div
                                    className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                                    aria-hidden="true"
                                >
                                    <ImageUpIcon className="size-4 opacity-60" />
                                </div>
                                <p className="mb-1.5 text-sm font-medium">
                                    Drop your image here or click to browse
                                </p>
                                <p className="text-muted-foreground text-xs">
                                    Max size: {maxSizeMB}MB
                                </p>
                            </div>
                        )}
                    </div>
                    {previewUrl && (
                        <div className="absolute top-4 right-4">
                            <button
                                type="button"
                                className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
                                onClick={() => removeFile(files[0]?.id)}
                                aria-label="Remove image"
                            >
                                <XIcon className="size-4" aria-hidden="true" />
                            </button>
                        </div>
                    )}
                </div>

                {errors.length > 0 && (
                    <div
                        className="text-destructive flex items-center gap-1 text-xs"
                        role="alert"
                    >
                        <AlertCircleIcon className="size-3 shrink-0" />
                        <span>{errors[0]}</span>
                    </div>
                )}


            </div>
            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Division & District" />
                </SelectTrigger>
                <SelectContent>
                    {/* Dhaka Division */}
                    <SelectGroup>
                        <SelectLabel>Dhaka Division</SelectLabel>
                        <SelectItem value="dhaka">Dhaka</SelectItem>
                        <SelectItem value="faridpur">Faridpur</SelectItem>
                        <SelectItem value="gazipur">Gazipur</SelectItem>
                        <SelectItem value="gopalganj">Gopalganj</SelectItem>
                        <SelectItem value="jamalpur">Jamalpur</SelectItem>
                        <SelectItem value="kishoreganj">Kishoreganj</SelectItem>
                        <SelectItem value="madaripur">Madaripur</SelectItem>
                        <SelectItem value="manikganj">Manikganj</SelectItem>
                        <SelectItem value="munshiganj">Munshiganj</SelectItem>
                        <SelectItem value="narayanganj">Narayanganj</SelectItem>
                        <SelectItem value="narsingdi">Narsingdi</SelectItem>
                        <SelectItem value="netrokona">Netrokona</SelectItem>
                        <SelectItem value="shariatpur">Shariatpur</SelectItem>
                        <SelectItem value="tangail">Tangail</SelectItem>
                    </SelectGroup>

                    {/* Chattogram Division */}
                    <SelectGroup>
                        <SelectLabel>Chattogram Division</SelectLabel>
                        <SelectItem value="bandarban">Bandarban</SelectItem>
                        <SelectItem value="brahmanbaria">Brahmanbaria</SelectItem>
                        <SelectItem value="chattogram">Chattogram</SelectItem>
                        <SelectItem value="coxsbazar">Cox's Bazar</SelectItem>
                        <SelectItem value="comilla">Comilla</SelectItem>
                        <SelectItem value="feni">Feni</SelectItem>
                        <SelectItem value="khagrachhari">Khagrachhari</SelectItem>
                        <SelectItem value="lakshmipur">Lakshmipur</SelectItem>
                        <SelectItem value="noakhali">Noakhali</SelectItem>
                        <SelectItem value="rangamati">Rangamati</SelectItem>
                    </SelectGroup>

                    {/* Rajshahi Division */}
                    <SelectGroup>
                        <SelectLabel>Rajshahi Division</SelectLabel>
                        <SelectItem value="bogura">Bogura</SelectItem>
                        <SelectItem value="joypurhat">Joypurhat</SelectItem>
                        <SelectItem value="naogaon">Naogaon</SelectItem>
                        <SelectItem value="natore">Natore</SelectItem>
                        <SelectItem value="chapai_nawabganj">Chapai Nawabganj</SelectItem>
                        <SelectItem value="pabna">Pabna</SelectItem>
                        <SelectItem value="rajshahi">Rajshahi</SelectItem>
                        <SelectItem value="sirajganj">Sirajganj</SelectItem>
                    </SelectGroup>

                    {/* Khulna Division */}
                    <SelectGroup>
                        <SelectLabel>Khulna Division</SelectLabel>
                        <SelectItem value="bagerhat">Bagerhat</SelectItem>
                        <SelectItem value="chuadanga">Chuadanga</SelectItem>
                        <SelectItem value="jessore">Jessore</SelectItem>
                        <SelectItem value="jhenaidah">Jhenaidah</SelectItem>
                        <SelectItem value="khulna">Khulna</SelectItem>
                        <SelectItem value="kustia">Kustia</SelectItem>
                        <SelectItem value="magura">Magura</SelectItem>
                        <SelectItem value="narail">Narail</SelectItem>
                        <SelectItem value="satkhira">Satkhira</SelectItem>
                    </SelectGroup>

                    {/* Barishal Division */}
                    <SelectGroup>
                        <SelectLabel>Barishal Division</SelectLabel>
                        <SelectItem value="barguna">Barguna</SelectItem>
                        <SelectItem value="barishal">Barishal</SelectItem>
                        <SelectItem value="bhola">Bhola</SelectItem>
                        <SelectItem value="jhalokathi">Jhalokathi</SelectItem>
                        <SelectItem value="patuakhali">Patuakhali</SelectItem>
                        <SelectItem value="pirojpur">Pirojpur</SelectItem>
                    </SelectGroup>

                    {/* Sylhet Division */}
                    <SelectGroup>
                        <SelectLabel>Sylhet Division</SelectLabel>
                        <SelectItem value="habiganj">Habiganj</SelectItem>
                        <SelectItem value="maulvibazar">Maulvibazar</SelectItem>
                        <SelectItem value="sunamganj">Sunamganj</SelectItem>
                        <SelectItem value="sylhet">Sylhet</SelectItem>
                    </SelectGroup>

                    {/* Rangpur Division */}
                    <SelectGroup>
                        <SelectLabel>Rangpur Division</SelectLabel>
                        <SelectItem value="dinajpur">Dinajpur</SelectItem>
                        <SelectItem value="gaibandha">Gaibandha</SelectItem>
                        <SelectItem value="kurigram">Kurigram</SelectItem>
                        <SelectItem value="lalmonirhat">Lalmonirhat</SelectItem>
                        <SelectItem value="nilphamari">Nilphamari</SelectItem>
                        <SelectItem value="panchagarh">Panchagarh</SelectItem>
                        <SelectItem value="rangpur">Rangpur</SelectItem>
                        <SelectItem value="thakurgaon">Thakurgaon</SelectItem>
                    </SelectGroup>

                    {/* Mymensingh Division */}
                    <SelectGroup>
                        <SelectLabel>Mymensingh Division</SelectLabel>
                        <SelectItem value="jamalpur">Jamalpur</SelectItem>
                        <SelectItem value="mymensingh">Mymensingh</SelectItem>
                        <SelectItem value="netrokona">Netrokona</SelectItem>
                        <SelectItem value="kishoreganj">Kishoreganj</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}
