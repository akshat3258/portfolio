import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { IoChatbubbleOutline, IoClose, IoSend } from "react-icons/io5";
import { smoother } from "./Navbar";
import "./styles/Chatbot.css";
const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: "bot",
            content: "Hi! I'm Akshat's AI Digital Twin. Feel free to ask me about his work in AI Engineering, Generative AI, or AI Agents.",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
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
        if (!input.trim() || isLoading)
            return;
        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);
        try {
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
        if (!apiKey) {
            throw new Error("OpenAI API key is not configured");
        }
        const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
            method: "POST",
            headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            model: "gpt-4-turbo",
            messages: [
                { role: "system", content: systemPrompt },
                ...messages.map((msg) => ({
                role: msg.role === "user" ? "user" : "assistant",
                content: msg.content
                })),
                { role: "user", content: userMessage }
            ],
            temperature: 0.7,
            max_tokens: 500
            })
        }
        );
            if (!response.ok) {
                throw new Error("API request failed");
            }
            const data = await response.json();
            const botRawResponse = data?.choices?.[0]?.message?.content ||
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
                            }
                            else {
                                // Fallback for mobile or if smoother isn't ready
                                const element = document.querySelector(target);
                                element?.scrollIntoView({ behavior: "smooth" });
                            }
                        }
                        catch (e) {
                            console.warn("Chatbot navigation failed:", e);
                        }
                    }, 500);
                }
            }
            // Clean response for display
            const cleanResponse = botRawResponse.replace(/\[NAVIGATE: #\w+\]/g, "").trim();
            setMessages((prev) => [...prev, { role: "bot", content: cleanResponse }]);
        }
        catch (error) {
            console.error("Chatbot Error:", error);
            setMessages((prev) => [
                ...prev,
                {
                    role: "bot",
                    content: "I'm having trouble connecting to the AI service right now. Please try again shortly.",
                },
            ]);
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("div", { className: "chatbot-container", children: [_jsx("div", { className: "chatbot-toggle", onClick: () => setIsOpen(!isOpen), "data-cursor": "disable", children: isOpen ? _jsx(IoClose, {}) : _jsx(IoChatbubbleOutline, {}) }), isOpen && (_jsxs("div", { className: "chatbot-window", children: [_jsxs("div", { className: "chatbot-header", children: [_jsx("div", { className: "status" }), _jsx("h4", { children: "Akshat AI Assistant" })] }), _jsxs("div", { className: "chatbot-messages", children: [messages.map((msg, index) => (_jsx("div", { className: `message ${msg.role}`, children: msg.content }, index))), isLoading && (_jsx("div", { className: "message bot", children: _jsxs("div", { className: "typing-indicator", children: [_jsx("span", {}), _jsx("span", {}), _jsx("span", {})] }) })), _jsx("div", { ref: messagesEndRef })] }), _jsxs("div", { className: "chatbot-input", children: [_jsx("input", { type: "text", placeholder: "Ask about Akshat's AI work...", value: input, onChange: (e) => setInput(e.target.value), onKeyDown: (e) => e.key === "Enter" && handleSend() }), _jsx("button", { onClick: handleSend, disabled: isLoading || !input.trim(), children: _jsx(IoSend, {}) })] })] }))] }));
};
export default Chatbot;
