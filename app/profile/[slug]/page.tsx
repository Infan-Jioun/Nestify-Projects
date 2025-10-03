"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type DisplayUser = {
    _id?: string;
    name?: string;
    email?: string;
    image?: string | null;
    slug?: string | null;
    error?: string;
};

export default function ProfilePage() {
    const params = useParams();
    const slug = params?.slug as string;

    const [user, setUser] = useState<DisplayUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        async function fetchUser() {
            try {
                const res = await fetch(`/api/users/${encodeURIComponent(slug)}`);
                const data = await res.json();
                setUser(data);
            } catch (err) {
                console.error(err);
                setUser({ error: "User not found" });
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, [slug]);

    if (loading) return <p>Loading...</p>;
    if (!user || user.error) return <p>User not found</p>;

    return (
        <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <img src={user.image || "/image/businessman-character-avatar-isolated.png"} alt={user.name} />
        </div>
    )
}
