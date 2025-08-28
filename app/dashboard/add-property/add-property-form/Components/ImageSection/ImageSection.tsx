import React from "react"
import { useImageUpload } from "@/hooks/useImageUpload"
import { Button } from "@/components/ui/button"
import { XIcon, UploadIcon, Trash2Icon, ImageIcon, FileIcon } from "lucide-react"

type Props = { apiKey: string }

export default function ImageSection({ apiKey }: Props) {
    const { files, errors, isUploading, addFiles, removeFile, clearFiles, uploadFiles } = useImageUpload(apiKey)

    const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        addFiles(Array.from(e.target.files))
    }

    return (
        <div className="flex flex-col gap-4">
            <label className="cursor-pointer border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center hover:border-green-400 transition">
                <input type="file" className="hidden" multiple onChange={handleFiles} />
                <ImageIcon className="w-10 h-10 text-gray-400 mb-2" />
                <span className="text-gray-600 text-sm">Drop or select files (Max 5, 20MB each)</span>
            </label>

            {files.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {files.map(file => (
                        <div key={file.name} className="relative border rounded-md overflow-hidden">
                            <img src={file.previewUrl} alt={file.name} className="w-full h-32 object-cover rounded-md" />
                            <button onClick={() => removeFile(file.name)} className="absolute top-1 right-1 bg-white p-1 rounded-full shadow">
                                <XIcon className="w-4 h-4 text-red-500" />
                            </button>
                            <p className="text-xs truncate p-1">{file.name}</p>
                        </div>
                    ))}
                </div>
            )}

            {errors.length > 0 && (
                <div className="text-red-500 text-sm">
                    {errors.map((err, i) => <p key={i}>{err}</p>)}
                </div>
            )}

            {files.length > 0 && (
                <div className="flex gap-2">
                    <Button onClick={clearFiles} variant="outline" className="flex items-center gap-1">
                        <Trash2Icon className="w-4 h-4" /> Remove All
                    </Button>
                    <Button onClick={uploadFiles} disabled={isUploading} className="flex items-center gap-1">
                        <UploadIcon className="w-4 h-4" /> {isUploading ? "Uploading..." : "Upload"}
                    </Button>
                </div>
            )}
        </div>
    )
}
