"use client"

import React, { useEffect } from "react"
import { FieldErrors, UseFormSetValue, UseFormRegister } from "react-hook-form"
import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Inputs } from "../Inputs"
import { useFileUpload, formatBytes } from "@/hooks/use-file-upload"

type ImageSectionProps = {
    register: UseFormRegister<Inputs>
    errors: FieldErrors<Inputs>
    setValue: UseFormSetValue<Inputs>
}

export default function ImageSection({ errors, setValue }: ImageSectionProps) {
    const maxSizeMB = 5
    const maxSize = maxSizeMB * 1024 * 1024
    const maxFiles = 6

    const [
        { files, isDragging, errors: uploadErrors },
        {
            handleDragEnter,
            handleDragLeave,
            handleDragOver,
            handleDrop,
            openFileDialog,
            removeFile,
            clearFiles,
            getInputProps,
        },
    ] = useFileUpload({
        accept: "image/png,image/jpeg,image/jpg,image/gif",
        maxSize,
        multiple: true,
        maxFiles,
    })

    useEffect(() => {
        const fileList = files.map((f) => f.file)
        setValue("images", fileList as any, { shouldValidate: true })
    }, [files, setValue])

    return (
        <div className="space-y-2">
            <Label htmlFor="images" className="text-sm font-medium">
                Property Images
            </Label>

            {/* Drop area */}
            <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                data-dragging={isDragging || undefined}
                data-files={files.length > 0 || undefined}
                className="border-input data-[dragging=true]:bg-accent/50 relative flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed p-4 transition-colors"
            >
                <input
                    {...getInputProps()}
                    id="images"
                    className="sr-only"
                    aria-label="Upload images"
                />

                <div className="flex flex-col items-center text-center">
                    <div className="bg-background mb-2 flex size-11 items-center justify-center rounded-full border">
                        <ImageIcon className="size-4 opacity-60" />
                    </div>
                    <p className="mb-1.5 text-sm font-medium">Drop your images here</p>
                    <p className="text-muted-foreground text-xs">
                        PNG, JPG or GIF (max. {maxSizeMB}MB)
                    </p>
                    <Button
                        variant="outline"
                        size="sm"
                        className="mt-3"
                        onClick={openFileDialog}
                    >
                        <UploadIcon className="mr-2 size-4 opacity-60" /> Select images
                    </Button>
                </div>
            </div>

            {/* Upload errors */}
            {(uploadErrors.length > 0 || errors.images) && (
                <div
                    className="text-destructive flex items-center gap-1 text-xs mt-1"
                    role="alert"
                >
                    <AlertCircleIcon className="size-3 shrink-0" />
                    <span>
                        {uploadErrors[0] ||
                            (errors.images?.message as string) ||
                            "Something went wrong"}
                    </span>
                </div>
            )}

            {/* File list */}
            {files.length > 0 && (
                <div className="space-y-2 mt-3">
                    {files.map((file) => (
                        <div
                            key={file.id}
                            className="bg-background flex items-center justify-between gap-2 rounded-lg border p-2 pe-3"
                        >
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="bg-accent aspect-square shrink-0 rounded">
                                    <img
                                        src={file.preview}
                                        alt={file.file.name}
                                        className="size-10 rounded-[inherit] object-cover"
                                    />
                                </div>
                                <div className="flex min-w-0 flex-col gap-0.5">
                                    <p className="truncate text-[13px] font-medium">
                                        {file.file.name}
                                    </p>
                                    <p className="text-muted-foreground text-xs">
                                        {formatBytes(file.file.size)}
                                    </p>
                                </div>
                            </div>

                            <Button
                                size="icon"
                                variant="ghost"
                                className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
                                onClick={() => removeFile(file.id)}
                                aria-label="Remove file"
                            >
                                <XIcon aria-hidden="true" />
                            </Button>
                        </div>
                    ))}

                    {files.length > 1 && (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={clearFiles}
                            className="mt-2"
                        >
                            Remove all files
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}
