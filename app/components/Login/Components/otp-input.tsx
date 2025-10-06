"use client"

import { useState, useRef } from "react"
import { OTPInput, SlotProps } from "input-otp"
import { MinusIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface OTPInputProps {
    onComplete: (otp: string) => void;
    length?: number;
    disabled?: boolean;
}

export default function OTPInputComponent({
    onComplete,
    length = 6,
    disabled = false
}: OTPInputProps) {
    const [otp, setOtp] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = (value: string) => {
        console.log("OTP Input changed:", value);
        setOtp(value)
        if (value.length === length) {
            console.log(" OTP Complete, calling onComplete:", value);
            onComplete(value)
        }
    }

    return (
        <div className="*:not-first:mt-4">
            <p className="text-sm font-medium mb-3 text-center">Enter OTP Code</p>

            <OTPInput
                ref={inputRef}
                value={otp}
                onChange={handleChange}
                maxLength={length}
                containerClassName="flex justify-center items-center  gap-2 has-[:disabled]:opacity-50"
                disabled={disabled}
                render={({ slots }) => (
                    <>
                        <div className="flex">
                            {slots.slice(0, 3).map((slot, idx) => (
                                <Slot key={idx} {...slot} />
                            ))}
                        </div>

                        <div className="text-muted-foreground/80 mx-2">
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

            <p className="text-xs text-center text-muted-foreground mt-2">
                Enter the 6-digit code sent to your email
            </p>
        </div>
    )
}

function Slot(props: SlotProps) {
    return (
        <div
            className={cn(
                "border-input bg-background text-foreground relative flex size-12 items-center justify-center border font-medium text-lg shadow-xs transition-all duration-200 first:rounded-l-md last:rounded-r-md",
                {
                    "border-ring ring-ring/30 z-10 ring-2 shadow-md": props.isActive,
                    "border-green-500 bg-green-50": props.char !== null && !props.isActive
                }
            )}
        >
            {props.char !== null && <div>{props.char}</div>}
            {props.hasFakeCaret && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="h-6 w-px animate-caret-blink bg-foreground duration-1000" />
                </div>
            )}
        </div>
    )
}