import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UploadedFile {
    name: string
    previewUrl: string
}

interface ImageUploadState {
    files: UploadedFile[]
    errors: string[]
    isUploading: boolean
}

const initialState: ImageUploadState = {
    files: [],
    errors: [],
    isUploading: false,
}

export const imageUploadSlice = createSlice({
    name: "imageUpload",
    initialState,
    reducers: {
        setFiles: (state, action: PayloadAction<UploadedFile[]>) => {
            state.files = action.payload
        },
        addFiles: (state, action: PayloadAction<UploadedFile[]>) => {
            state.files = [...state.files, ...action.payload]
        },
        removeFile: (state, action: PayloadAction<string>) => {
            state.files = state.files.filter(f => f.name !== action.payload)
        },
        clearFiles: (state) => {
            state.files = []
        },
        setErrors: (state, action: PayloadAction<string[]>) => {
            state.errors = action.payload
        },
        setUploading: (state, action: PayloadAction<boolean>) => {
            state.isUploading = action.payload
        },
    },
})

export const { setFiles, addFiles, removeFile, clearFiles, setErrors, setUploading } = imageUploadSlice.actions
export default imageUploadSlice.reducer
