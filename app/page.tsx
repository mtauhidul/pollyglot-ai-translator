"use client";

import { FormEvent, useEffect, useState } from "react";
import { Translate } from "./services";

export default function ChatbotPage() {
  const [messages, setMessages] = useState(() => {
    if (typeof window !== "undefined") {
      const savedMessages = window.sessionStorage.getItem("chatMessages");
      return savedMessages
        ? JSON.parse(savedMessages)
        : [
            {
              role: "system",
              content: "Hello! What do you want to translate today?",
            },
          ];
    }
    return [
      {
        role: "system",
        content: "Hello! What do you want to translate today?",
      },
    ];
  });

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setInputValue("");
    setIsLoading(true);

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    try {
      const chatCompletion =
        (await Translate(userMessage)) ||
        "I'm sorry, I didn't understand that.";

      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: chatCompletion,
        },
      ]);
    } catch (error) {
      console.error("Translation error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content: "Something went wrong. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col p-4 h-screen border border-gray-900 rounded-lg">
      <div className="flex-1">
        <div className="flex flex-col h-96 overflow-y-auto">
          <div className="mb-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${
                  message.role === "system" ? "text-left" : "text-right"
                }`}
              >
                <p
                  className={`${
                    message.role === "system"
                      ? "bg-blue-600 text-white"
                      : "bg-green-400 text-black"
                  } text-justify font-semibold p-4 rounded-lg inline-block w-auto max-w-[70%]`}
                >
                  {message.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <form
        className="flex items-center mt-4"
        onSubmit={handleSendMessage}
        noValidate
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 p-4 rounded-l-lg border border-gray-300 border-r-0"
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button
          type="submit"
          className="p-4 rounded-r-lg border border-gray-300 bg-gray-200 hover:bg-gray-300 transition-colors duration-300 text-gray-700 hover:text-gray-800 cursor-pointer"
          disabled={isLoading || !inputValue.trim()}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-blue-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          )}
        </button>
      </form>
    </section>
  );
}
