import { useState, useRef, useEffect } from "react";
import { IoChatbubbleOutline, IoClose, IoSend } from "react-icons/io5";
import { smoother } from "./Navbar";
import "./styles/Chatbot.css";

interface Message {
    role: "user" | "bot";
    content: string;
}

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [messages, setMessages] = useState<Message[]>([
        {
            role: "bot",
            content:
                "Hi! I'm Akshat's AI Digital Twin. Feel free to ask me about his work in AI Engineering, Generative AI, or AI Agents.",
        },
    ]);

    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const systemPrompt = `
You are the AI Digital Twin of Akshat Mathur — an AI Engineer focused on Generative AI, LLM orchestration, and intelligent automation.

PERSONALITY
- Professional, confident, and approachable
- Concise and informative
- Passionate about AI systems and innovation

SITE STRUCTURE & NAVIGATION
You can navigate the user to any section of the site. If the user asks about a specific topic or wants to contact Akshat, use the following tags at the VERY END of your response to trigger navigation:
- [NAVIGATE: #landingDiv] -> Home / Hero section
- [NAVIGATE: #about] -> About Me section
- [NAVIGATE: #what-i-do] -> Detailed skills in AI Agents & Automation
- [NAVIGATE: #experience] -> Career, Education, and Work History
- [NAVIGATE: #work] -> Projects and Portfolio work
- [NAVIGATE: #contact] -> Contact section (Email, Socials)

KNOWLEDGE BASE
- About: AI Engineer building agentic systems and scalable AI solutions.
- Work: AI Prompt Evaluator, Sentiment Analysis, Object Detection, Instagram Automation, AI Voice Prototype.
- Experience: ML Engineer at Exponentia.ai, MCA in AI/ML from DY Patil, BCA from Lachoo College.
- Contact: akshatmathur99@gmail.com, LinkedIn (in/akshat-mathur-42a2291b1), GitHub (akshat8415), Instagram (akshatmathur_2).

RULES
- Always respond in first person ("I build...", "My work focuses on...")
- Keep responses under 3 sentences.
- Use only the provided navigation tags when relevant.
- Redirect unrelated questions politely.
- If they ask HOW to contact you -> Give the email AND trigger [NAVIGATE: #contact].
`;

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();

        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

        setIsLoading(true);

        try {
                const response = await fetch(
                "https://openrouter.ai/api/v1/chat/completions",
                {
                    method: "POST",
                    headers: {
                    Authorization: `Bearer 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`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": window.location.origin,
                    "X-Title": "Akshat AI Portfolio"
                    },
                    body: JSON.stringify({
                    model: "openrouter/auto",
                    messages: [
                        { role: "system", content: systemPrompt },
                        ...messages.map((msg) => ({
                        role: msg.role === "user" ? "user" : "assistant",
                        content: msg.content
                        })),
                        { role: "user", content: userMessage }
                    ]
                    })
                }
                );

            if (!response.ok) {
                throw new Error("API request failed");
            }

            const data = await response.json();

            const botRawResponse =
                data?.choices?.[0]?.message?.content ||
                "Sorry, I couldn't generate a response.";

            // Handle Navigation
            if (botRawResponse.includes("[NAVIGATE:")) {
                const navMatch = botRawResponse.match(/\[NAVIGATE: (#[\w-]+)\]/); // Fixed: include hyphens for IDs like #what-i-do
                if (navMatch && navMatch[1]) {
                    const target = navMatch[1];
                    setTimeout(() => {
                        try {
                            if (smoother) {
                                smoother.scrollTo(target, true, "top top");
                            } else {
                                // Fallback for mobile or if smoother isn't ready
                                const element = document.querySelector(target);
                                element?.scrollIntoView({ behavior: "smooth" });
                            }
                        } catch (e) {
                            console.warn("Chatbot navigation failed:", e);
                        }
                    }, 500);
                }
            }

            // Clean response for display
            const cleanResponse = botRawResponse.replace(/\[NAVIGATE: #\w+\]/g, "").trim();
            setMessages((prev) => [...prev, { role: "bot", content: cleanResponse }]);
        } catch (error) {
            console.error("Chatbot Error:", error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "bot",
                    content:
                        "I'm having trouble connecting to the AI service right now. Please try again shortly.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chatbot-container">
            <div
                className="chatbot-toggle"
                onClick={() => setIsOpen(!isOpen)}
                data-cursor="disable"
            >
                {isOpen ? <IoClose /> : <IoChatbubbleOutline />}
            </div>

            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div className="status"></div>
                        <h4>Akshat AI Assistant</h4>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.role}`}>
                                {msg.content}
                            </div>
                        ))}

                        {isLoading && (
                            <div className="message bot">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chatbot-input">
                        <input
                            type="text"
                            placeholder="Ask about Akshat's AI work..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />

                        <button onClick={handleSend} disabled={isLoading || !input.trim()}>
                            <IoSend />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;