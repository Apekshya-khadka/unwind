import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Minus } from "lucide-react";

const BOT_NAME = "Unwind Support";

const QUICK_REPLIES = [
  "How do I book a cabin?",
  "What's your cancellation policy?",
  "Do cabins have WiFi?",
  "How many guests per cabin?",
];

const AUTO_REPLIES = {
  "how do i book": "To book a cabin, click on any cabin, choose your dates and number of travellers, then fill in your name and email. You'll get a confirmation right away! 🏡",
  "cancellation": "We offer free cancellation up to 7 days before your check-in date. After that, a 50% fee applies. Contact us for special circumstances.",
  "wifi": "Most of our cabins have WiFi, but signal strength varies by location. Each cabin listing shows the amenities — look for the WiFi icon! 📶",
  "how many guests": "Each cabin has a maximum capacity listed on its page. We have cabins ranging from cosy 2-person retreats up to large group lodges for 12+.",
  "price": "Prices vary per cabin and are shown per person per night. Use the search bar on our homepage to find cabins in your budget.",
  "check": "Check-in is from 3pm and check-out is by 11am. Early/late arrangements can sometimes be made — just ask us!",
  "hello": "Hi there! 👋 Welcome to Unwind Cabins. How can I help you today?",
  "hi": "Hey! 😊 Happy to help. What would you like to know?",
  "help": "I can help with bookings, cabin info, pricing, and more. What's your question?",
};

function getBotReply(message) {
  const lower = message.toLowerCase();
  for (const [key, reply] of Object.entries(AUTO_REPLIES)) {
    if (lower.includes(key)) return reply;
  }
  return "Thanks for your message! Our team will get back to you shortly. For urgent queries, please use the Contact page or call us directly. 😊";
}

export default function LiveChat() {
  const [open, setOpen] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 Hi! Welcome to Unwind Cabins. How can I help you today?",
      time: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open && !minimised) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, minimised]);

  const sendMessage = (presetText) => {
    const userMsg = typeof presetText === "string" ? presetText.trim() : input.trim();
    if (!userMsg) return;

    setMessages((prev) => [...prev, { from: "user", text: userMsg, time: new Date() }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getBotReply(userMsg);
      setMessages((prev) => [...prev, { from: "bot", text: reply, time: new Date() }]);
      setIsTyping(false);
    }, 900 + Math.random() * 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {open && (
        <div
          className={`fixed bottom-24 right-5 z-50 w-[340px] bg-white rounded-2xl shadow-2xl border border-black/10 flex flex-col transition-all ${
            minimised ? "h-14" : "h-[480px]"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-3 bg-forest text-white rounded-t-2xl flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
              <span className="font-semibold text-sm">{BOT_NAME}</span>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setMinimised((v) => !v)} className="p-1 hover:bg-white/20 rounded" aria-label="Minimise">
                <Minus size={16} />
              </button>
              <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/20 rounded" aria-label="Close chat">
                <X size={16} />
              </button>
            </div>
          </div>

          {!minimised && (
            <>
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex flex-col ${msg.from === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                        msg.from === "user"
                          ? "bg-forest text-white rounded-br-none"
                          : "bg-white text-navy border border-black/10 rounded-bl-none shadow-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-gray-400 mt-0.5">{formatTime(msg.time)}</span>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-start">
                    <div className="bg-white border border-black/10 rounded-xl rounded-bl-none shadow-sm px-3 py-2">
                      <span className="flex gap-1 items-center h-5">
                        <span className="w-2 h-2 bg-navy/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-navy/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-navy/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </span>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <div className="px-3 pt-2 flex gap-2 flex-wrap border-t border-black/5 bg-white">
                {QUICK_REPLIES.map((qr) => (
                  <button
                    key={qr}
                    onClick={() => sendMessage(qr)}
                    className="text-xs border border-forest text-forest rounded-full px-3 py-1 hover:bg-forest hover:text-white transition-colors mb-1"
                  >
                    {qr}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 px-3 py-3 border-t border-black/10 bg-white rounded-b-2xl">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message…"
                  className="flex-1 text-sm border border-black/15 rounded-full px-4 py-2 outline-none focus:border-forest"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim()}
                  className="w-9 h-9 rounded-full bg-forest text-white flex items-center justify-center disabled:opacity-40 hover:bg-forest/90 transition-colors"
                  aria-label="Send message"
                >
                  <Send size={15} />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <button
        onClick={() => { setOpen((v) => !v); setMinimised(false); }}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-forest text-white shadow-lg flex items-center justify-center hover:bg-forest/90 transition-all hover:scale-110"
        aria-label="Open live chat"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold text-navy text-[9px] font-bold flex items-center justify-center">
            1
          </span>
        )}
      </button>
    </>
  );
}