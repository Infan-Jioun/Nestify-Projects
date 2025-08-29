import axios from "axios"

interface ImgbbResponse {
    data: {
        url: string
        display_url: string
        delete_url: string
    }
    success: boolean
    status: number
}

export const imageUpload = async (image: File): Promise<ImgbbResponse> => {
    const formData = new FormData()
    formData.append("image", image)

    const { data } = await axios.post<ImgbbResponse>(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        formData
    )

    return data
}
