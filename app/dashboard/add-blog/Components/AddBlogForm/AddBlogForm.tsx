"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { setButtonLoader } from "@/app/features/loader/loaderSlice";
import { BlogPost } from "@/app/Types/BlogPost";
import { imageUpload } from "@/hooks/useImageUpload";
import Title from "./Components/Title";
import Slug from "./Components/Slug";

export default function AddBlogForm() {
    const dispatch = useDispatch<AppDispatch>();
    const buttonLoader = useSelector(
        (state: RootState) => state.loader.buttonLoader
    );

    // react-hook-form setup
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<BlogPost>();

    // Submit handler
    const onSubmit: SubmitHandler<BlogPost> = async (data) => {
        dispatch(setButtonLoader(true));
        try {
            let imageUrl = "";


            if (data.featuredImage instanceof File) {
                const uploadRes = await imageUpload(data.featuredImage);
                imageUrl = uploadRes.data.url;
            } else if (typeof data.featuredImage === "string") {
                imageUrl = data.featuredImage;
            }

            const payload = {
                ...data,
                featuredImage: imageUrl,
                publishedAt: new Date().toISOString(),
                isPublished: true,
                views: 0,
                likes: 0,
            };

            // এখানে তুমি axios.post("/api/blog", payload) কল করতে পারো
            console.log("Final Blog Payload:", payload);

            reset(); // ফর্ম সাবমিট হওয়ার পর clear করবে
        } catch (err) {
            console.error("Error creating blog:", err);
        } finally {
            dispatch(setButtonLoader(false));
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 p-6 bg-white shadow rounded"
        >
            {/* Title */}
            <div>
                <Title register={register} errors={errors} />
            </div>

            {/* Slug */}
            <div>
                <Slug register={register} errors={errors} />
               
            </div>

            {/* Excerpt */}
            <div>
                <label className="block mb-1 font-medium">Excerpt</label>
                <textarea
                    {...register("excerpt", { required: "Excerpt is required" })}
                    className="w-full border rounded p-2"
                />
                {errors.excerpt && (
                    <p className="text-red-500 text-sm">{errors.excerpt.message}</p>
                )}
            </div>

            {/* Content */}
            <div>
                <label className="block mb-1 font-medium">Content</label>
                <textarea
                    {...register("content", { required: "Content is required" })}
                    className="w-full border rounded p-2 h-32"
                />
                {errors.content && (
                    <p className="text-red-500 text-sm">{errors.content.message}</p>
                )}
            </div>

            {/* Featured Image */}
            <div>
                <label className="block mb-1 font-medium">Featured Image</label>
                <input
                    type="file"
                    {...register("featuredImage")}
                    className="w-full border rounded p-2"
                />
            </div>

            {/* Author Name */}
            <div>
                <label className="block mb-1 font-medium">Author Name</label>
                <input
                    type="text"
                    {...register("author.name", { required: "Author name is required" })}
                    className="w-full border rounded p-2"
                />
            </div>

            {/* Author Bio */}
            <div>
                <label className="block mb-1 font-medium">Author Bio</label>
                <textarea
                    {...register("author.bio")}
                    className="w-full border rounded p-2"
                />
            </div>

            {/* Categories */}
            <div>
                <label className="block mb-1 font-medium">Categories (comma separated)</label>
                <input
                    type="text"
                    {...register("categories")}
                    className="w-full border rounded p-2"
                />
            </div>

            {/* Tags */}
            <div>
                <label className="block mb-1 font-medium">Tags (comma separated)</label>
                <input
                    type="text"
                    {...register("tags")}
                    className="w-full border rounded p-2"
                />
            </div>

            {/* Submit button */}
            <button
                type="submit"
                disabled={buttonLoader}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {buttonLoader ? "Publishing..." : "Publish Blog"}
            </button>
        </form>
    );
}
