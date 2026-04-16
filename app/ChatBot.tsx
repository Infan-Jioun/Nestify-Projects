"use client";

import { MessageCircle, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content:
                "Hello! I'm the Nestify AI assistant. How can I help you with properties today?",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const bottomRef = useRef<HTMLDivElement>(null);

    const suggestions = [
        "Buy apartment in Dhaka",
        "Rent house in Mirpur",
        "How to list property?",
        "Price of flats in Bangladesh",
    ];

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMessage: Message = { role: "user", content: input };
        const updatedMessages = [...messages, userMessage];

        setMessages(updatedMessages);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ messages: updatedMessages }),
                }
            );

            const data = await res.json();

            setMessages([
                ...updatedMessages,
                { role: "assistant", content: data.message },
            ]);
        } catch {
            setMessages([
                ...updatedMessages,
                {
                    role: "assistant",
                    content: "Sorry, something went wrong. Please try again.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleSuggestion = (text: string) => {
        setInput(text);
        setTimeout(() => {
            sendMessage();
        }, 100);
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-50 transition-all"
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-80 h-[450px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">

                    {/* Header */}
                    <div className="bg-green-500 text-white p-3 rounded-t-2xl text-center">
                        <div className="font-bold">Nestify Assistant</div>
                        <div className="text-xs opacity-80">
                            Real Estate Help • Buy, Sell & Rent
                        </div>
                    </div>

                    {/* Suggestions */}
                    <div className="p-2 flex flex-wrap gap-2 border-b">
                        {suggestions.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => handleSuggestion(item)}
                                className="text-xs bg-green-100 hover:bg-green-500 hover:text-white 
                                text-green-700 px-3 py-1 rounded-full transition-all"
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${msg.role === "user"
                                    ? "justify-end"
                                    : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`max-w-[78%] px-3 py-2 rounded-xl text-sm leading-relaxed ${msg.role === "user"
                                        ? "bg-green-500 text-white rounded-br-none"
                                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {/* Loading */}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 px-4 py-2 rounded-xl rounded-bl-none flex items-center gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                </div>
                            </div>
                        )}

                        <div ref={bottomRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t flex flex-col sm:flex-row gap-2">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && sendMessage()
                            }
                            placeholder="Type your message..."
                            className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none 
                            focus:border-green-400 w-full"
                        />

                        <button
                            onClick={sendMessage}
                            disabled={loading}
                            className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white 
                            px-4 py-2 rounded-xl text-sm transition-all w-full sm:w-auto"
                        >
                            ➤
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}