export default function ChatbotPage() {
  return (
    <section className="flex flex-col p-4 h-screen border border-gray-900 rounded-lg">
      <div className="flex-1">
        <div
          className="
          flex flex-col
          h-100
          overflow-y-auto 
        "
        >
          <div className="mb-4 h-96 overflow-y-auto">
            <div className="mb-4 text-left">
              <p className="bg-[#035A9D] text-justify text-white font-semibold p-4 rounded-lg inline-block w-auto max-w-[70%]">
                Hello! How can I assist you today? Hello! Hello! How can I
                assist you today? Hello! Hello! How can I assist you today?
                Hello!
              </p>
            </div>
            <div className="mb-4  text-right">
              <p
                className="bg-[#65DA65]  text-justify text-black p-4 rounded-lg inline-block 
                font-semibold 
              w-auto max-w-[70%]"
              >
                This box is human message box This box is human message box This
                box is human message box
              </p>
            </div>
          </div>
        </div>
      </div>

      <form className="flex items-center">
        <input
          type="text"
          className="flex-1 p-4 rounded-l-lg border border-gray-300 border-r-0"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="p-4 rounded-r-lg border border-gray-300 bg-transparent
          hover:bg-gray-100 transition-colors duration-300 ease-in-out text-gray-500 hover:text-gray-600  cursor-pointer
          "
        >
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
        </button>
      </form>
    </section>
  );
}
