import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/lib/store"
import axios from "axios"
import { addFiles as addFilesAction, removeFile as removeFileAction, clearFiles as clearFilesAction, setErrors, setUploading } from "@/app/features/imageUploadSlice/imageUploadSlice"

type UploadedImage = { url: string; name: string }

export const useImageUpload = (apiKey: string, maxFiles = 5, maxSizeMB = 20) => {
    const dispatch = useDispatch()
    const { files, errors, isUploading } = useSelector((state: RootState) => state.imageUpload)

    const [localFiles, setLocalFiles] = useState<File[]>([])

    const addFiles = (newFiles: File[]) => {
        const validFiles = newFiles.filter(file => {
            if (file.size > maxSizeMB * 1024 * 1024) {
                dispatch(setErrors([`${file.name} exceeds ${maxSizeMB}MB`]))
                return false
            }
            return true
        }).slice(0, maxFiles - localFiles.length)

        setLocalFiles([...localFiles, ...validFiles])

        const filesToStore = validFiles.map(file => ({
            name: file.name,
            previewUrl: URL.createObjectURL(file)
        }))

        dispatch(addFilesAction(filesToStore))
    }

    const removeFile = (name: string) => {
        setLocalFiles(localFiles.filter(f => f.name !== name))
        dispatch(removeFileAction(name))
    }

    const clearFiles = () => {
        setLocalFiles([])
        dispatch(clearFilesAction())
    }

    const uploadFiles = async (): Promise<UploadedImage[]> => {
        dispatch(setUploading(true))
        const uploaded: UploadedImage[] = []

        try {
            for (const file of localFiles) {
                const formData = new FormData()
                formData.append("image", file)
                const res = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData)
                if (res.data?.data?.url) uploaded.push({ name: file.name, url: res.data.data.url })
            }
        } catch (err) {
            console.error(err)
            dispatch(setErrors(["Upload failed"]))
        } finally {
            dispatch(setUploading(false))
        }

        return uploaded
    }

    return { files, errors, isUploading, addFiles, removeFile, clearFiles, uploadFiles, localFiles }
}
