"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BiError, BiCheckCircle } from "react-icons/bi";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { OTPInput, SlotProps } from "input-otp";
import { MinusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function VerifyEmail() {
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [resendLoading, setResendLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const userEmail = localStorage.getItem("verificationEmail");
        if (userEmail) {
            setEmail(userEmail);
        }
    }, []);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!otp || otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/auth/confirm-verification", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess("Email verified successfully! Redirecting to login...");
                localStorage.removeItem("verificationEmail");
                setTimeout(() => {
                    router.push("/LoginPage");
                }, 2000);
            } else {
                setError(data.error || "Verification failed");
            }
        } catch (err) {
            setError("An error occurred during verification");
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (!email) {
            setError("Email not found. Please try registering again.");
            return;
        }

        setResendLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/auth/verify-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess("New OTP sent to your email!");
            } else {
                setError(data.error || "Failed to resend OTP");
            }
        } catch (err) {
            setError("An error occurred while resending OTP");
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-green-100 dark:bg-gray-900 px-4">
            <Card className="w-full max-w-md shadow-lg border dark:border-gray-800 bg-white dark:bg-gray-950">
                <CardHeader className="text-center space-y-2">
                    <div className="flex justify-center">
                        <MdOutlineMarkEmailRead className="h-12 w-12 text-green-500" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
                    <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                        Enter the 6-digit OTP sent to your email address
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg flex items-center gap-2 text-red-700">
                            <BiError className="h-5 w-5" />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg flex items-center gap-2 text-green-700">
                            <BiCheckCircle className="h-5 w-5" />
                            <span className="text-sm">{success}</span>
                        </div>
                    )}

                    <form onSubmit={handleVerify} className="space-y-6">
                        <div className="space-y-3">
                            <div className="text-center">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    6-digit code sent to <span className="font-semibold text-green-600">{email}</span>
                                </p>
                            </div>

                            <div className="flex justify-center">
                                <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    maxLength={6}
                                    containerClassName="flex items-center gap-3 has-[:disabled]:opacity-50"
                                    render={({ slots }) => (
                                        <>
                                            <div className="flex">
                                                {slots.slice(0, 3).map((slot, idx) => (
                                                    <Slot key={idx} {...slot} />
                                                ))}
                                            </div>

                                            <div className="text-muted-foreground/80">
                                                <MinusIcon size={16} aria-hidden="true" />
                                            </div>

                                            <div className="flex">
                                                {slots.slice(3).map((slot, idx) => (
                                                    <Slot key={idx} {...slot} />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                />
                            </div>

                            {otp.length === 6 && (
                                <p className="text-xs text-green-600 text-center animate-pulse">
                                    OTP entered! Click Verify Email to continue.
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-600"
                            disabled={loading || otp.length !== 6}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Verifying...
                                </div>
                            ) : (
                                "Verify Email"
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {"Didn't receive the code? "}
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={resendLoading}
                                className="text-green-500 hover:text-green-600 font-medium disabled:opacity-50 ml-1"
                            >
                                {resendLoading ? "Sending..." : "Resend OTP"}
                            </button>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function Slot(props: SlotProps) {
    return (
        <div
            className={cn(
                " border-gray-300 bg-white text-foreground relative flex size-12 items-center justify-center border font-bold text-lg shadow-xs transition-all duration-200 first:rounded-l-md last:rounded-r-md",
                {
                    "border-green-500 ring-2 ring-green-200 z-10 scale-105": props.isActive,
                    "border-green-500 bg-green-50": props.char !== null && !props.isActive
                }
            )}
        >
            {props.char !== null && <div>{props.char}</div>}
            {props.hasFakeCaret && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="h-6 w-px animate-caret-blink bg-gray-600 duration-1000" />
                </div>
            )}
        </div>
    );
}