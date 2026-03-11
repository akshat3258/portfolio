import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const WhatIDo = () => {
    const containerRef = useRef([]);
    const setRef = (el, index) => {
        containerRef.current[index] = el;
    };
    useEffect(() => {
        if (ScrollTrigger.isTouch) {
            containerRef.current.forEach((container) => {
                if (container) {
                    container.classList.remove("what-noTouch");
                    container.addEventListener("click", () => handleClick(container));
                }
            });
        }
        return () => {
            containerRef.current.forEach((container) => {
                if (container) {
                    container.removeEventListener("click", () => handleClick(container));
                }
            });
        };
    }, []);
    return (_jsxs("div", { className: "whatIDO", id: "what-i-do", children: [_jsx("div", { className: "what-box", children: _jsxs("h2", { className: "title", children: ["W", _jsx("span", { className: "hat-h2", children: "HAT" }), _jsxs("div", { children: ["I", _jsx("span", { className: "do-h2", children: " DO" })] })] }) }), _jsx("div", { className: "what-box", children: _jsxs("div", { className: "what-box-in", children: [_jsx("div", { className: "what-border2", children: _jsxs("svg", { width: "100%", children: [_jsx("line", { x1: "0", y1: "0", x2: "0", y2: "100%", stroke: "white", strokeWidth: "2", strokeDasharray: "7,7" }), _jsx("line", { x1: "100%", y1: "0", x2: "100%", y2: "100%", stroke: "white", strokeWidth: "2", strokeDasharray: "7,7" })] }) }), _jsxs("div", { className: "what-content what-noTouch", ref: (el) => setRef(el, 0), children: [_jsx("div", { className: "what-border1", children: _jsxs("svg", { height: "100%", children: [_jsx("line", { x1: "0", y1: "0", x2: "100%", y2: "0", stroke: "white", strokeWidth: "2", strokeDasharray: "6,6" }), _jsx("line", { x1: "0", y1: "100%", x2: "100%", y2: "100%", stroke: "white", strokeWidth: "2", strokeDasharray: "6,6" })] }) }), _jsx("div", { className: "what-corner" }), _jsxs("div", { className: "what-content-in", children: [_jsx("h3", { children: "AI AGENTS" }), _jsx("h4", { children: "Intelligent Agentic Systems" }), _jsx("p", { children: "Developing autonomous AI agents using LangChain, LangGraph, RAG-AdvancRAG , Multi-agent orchestration. Specializing in prompt engineering and cognitive architecture design." }), _jsx("h5", { children: "Skillset & tools" }), _jsxs("div", { className: "what-content-flex", children: [_jsx("div", { className: "what-tags", children: "LangChain" }), _jsx("div", { className: "what-tags", children: "Prompt Engineering" }), _jsx("div", { className: "what-tags", children: "RAG-AdvancRAG" }), _jsx("div", { className: "what-tags", children: "Python" }), _jsx("div", { className: "what-tags", children: "Azure AI Studio" }), _jsx("div", { className: "what-tags", children: "LangGraph" }), _jsx("div", { className: "what-tags", children: "OpenAI" }), _jsx("div", { className: "what-tags", children: "Claude" }), _jsx("div", { className: "what-tags", children: "Llama Index" })] }), _jsx("div", { className: "what-arrow" })] })] }), _jsxs("div", { className: "what-content what-noTouch", ref: (el) => setRef(el, 1), children: [_jsx("div", { className: "what-border1", children: _jsx("svg", { height: "100%", children: _jsx("line", { x1: "0", y1: "100%", x2: "100%", y2: "100%", stroke: "white", strokeWidth: "2", strokeDasharray: "6,6" }) }) }), _jsx("div", { className: "what-corner" }), _jsxs("div", { className: "what-content-in", children: [_jsx("h3", { children: "AUTOMATION" }), _jsx("h4", { children: "Workflow & Pipeline AI" }), _jsx("p", { children: "Architecting AI-driven automation using n8n, Make.com, and custom Python scripts. Streamlining business processes with intelligent data extraction and classification." }), _jsx("h5", { children: "Skillset & tools" }), _jsxs("div", { className: "what-content-flex", children: [_jsx("div", { className: "what-tags", children: "n8n" }), _jsx("div", { className: "what-tags", children: "Make.com" }), _jsx("div", { className: "what-tags", children: "Microsoft Copilot" }), _jsx("div", { className: "what-tags", children: "AWS" }), _jsx("div", { className: "what-tags", children: "Vibe Coding" }), _jsx("div", { className: "what-tags", children: "FastAPI" }), _jsx("div", { className: "what-tags", children: "Docker" }), _jsx("div", { className: "what-tags", children: "Workflow Architecture" })] }), _jsx("div", { className: "what-arrow" })] })] })] }) })] }));
};
export default WhatIDo;
function handleClick(container) {
    container.classList.toggle("what-content-active");
    container.classList.remove("what-sibling");
    if (container.parentElement) {
        const siblings = Array.from(container.parentElement.children);
        siblings.forEach((sibling) => {
            if (sibling !== container) {
                sibling.classList.remove("what-content-active");
                sibling.classList.toggle("what-sibling");
            }
        });
    }
}
