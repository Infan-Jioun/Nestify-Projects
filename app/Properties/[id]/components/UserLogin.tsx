"use client"
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { setUserProfile } from "@/app/features/user/userSlice";
import { AppDispatch } from "@/lib/store";

const UserLogin = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleDemoLogin = () => {
        dispatch(setUserProfile({
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+1234567890"
        }));
    };

    const handleDemoLogout = () => {
        dispatch(setUserProfile(null));
    };

    return (
        <div className="fixed bottom-4 right-4 flex gap-2">
            <Button onClick={handleDemoLogin} size="sm" variant="outline">
                Demo Login
            </Button>
            <Button onClick={handleDemoLogout} size="sm" variant="outline">
                Demo Logout
            </Button>
        </div>
    );
};

export default UserLogin;