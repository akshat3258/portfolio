import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
const projects = [
    {
        title: "AI Prompt Evaluation & Optimization Agent",
        category: "Generative AI",
        tools: "Python, LangChain, OpenAI, Azure AI Studio , RAG-Pipeline",
        description: "Built an AI prompt evaluation system that analyzes prompt quality, scores effectiveness, and suggests optimized prompt structures for better LLM responses.",
        image: "/images/multi_agent.png",
    },
    {
        title: "Embeddings optimization using hierarchy search ",
        category: "Generative AI & Machine Learning ",
        tools: "Python, RAG-Pipeline , Hierarchy Search , vector search , reranking ",
        description: "Built an embeddings optimization system that uses hierarchy search and vector search to optimize embeddings for better LLM responses in RAG pipelines.",
        image: "/images/azure_agent.png",
    },
    {
        title: "Automated News Aggregation & Summarization Pipeline",
        category: "AI Automation & Workflow Orchestration",
        tools: "n8n, AI Summarization APIs, RSS Feeds, Gmail Automation",
        description: "Built an automated news intelligence pipeline using n8n that collects the latest news across multiple sectors from the internet, summarizes the content using AI, and delivers concise updates directly to a dedicated Gmail inbox. The system runs fully automated workflows for real-time news aggregation, summarization, and distribution.",
        image: "/images/news_automation.png",
    }
];
const Work = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const goToSlide = useCallback((index) => {
        if (isAnimating)
            return;
        setIsAnimating(true);
        setCurrentIndex(index);
        setTimeout(() => setIsAnimating(false), 500);
    }, [isAnimating]);
    const goToPrev = useCallback(() => {
        const newIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
        goToSlide(newIndex);
    }, [currentIndex, goToSlide]);
    const goToNext = useCallback(() => {
        const newIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
        goToSlide(newIndex);
    }, [currentIndex, goToSlide]);
    return (_jsx("div", {
        className: "work-section", id: "work", children: _jsxs("div", {
            className: "work-container section-container", children: [_jsxs("h2", { children: ["My ", _jsx("span", { children: "Work" })] }), _jsxs("div", {
                className: "carousel-wrapper", children: [_jsx("button", { className: "carousel-arrow carousel-arrow-left", onClick: goToPrev, "aria-label": "Previous project", "data-cursor": "disable", children: _jsx(MdArrowBack, {}) }), _jsx("button", { className: "carousel-arrow carousel-arrow-right", onClick: goToNext, "aria-label": "Next project", "data-cursor": "disable", children: _jsx(MdArrowForward, {}) }), _jsx("div", {
                    className: "carousel-track-container", children: _jsx("div", {
                        className: "carousel-track", style: {
                            transform: `translateX(-${currentIndex * 100}%)`,
                        }, children: projects.map((project, index) => (_jsx("div", { className: "carousel-slide", children: _jsxs("div", { className: "carousel-content", children: [_jsxs("div", { className: "carousel-info", children: [_jsx("div", { className: "carousel-number", children: _jsxs("h3", { children: ["0", index + 1] }) }), _jsxs("div", { className: "carousel-details", children: [_jsx("h4", { children: project.title }), _jsx("p", { className: "carousel-category", children: project.category }), _jsx("p", { className: "carousel-description", children: project.description }), _jsxs("div", { className: "carousel-tools", children: [_jsx("span", { className: "tools-label", children: "Tools & Features" }), _jsx("p", { children: project.tools })] })] })] }), _jsx("div", { className: "carousel-image-wrapper", children: _jsx(WorkImage, { image: project.image, alt: project.title }) })] }) }, index)))
                    })
                }), _jsx("div", { className: "carousel-dots", children: projects.map((_, index) => (_jsx("button", { className: `carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""}`, onClick: () => goToSlide(index), "aria-label": `Go to project ${index + 1}`, "data-cursor": "disable" }, index))) })]
            })]
        })
    }));
};
export default Work;
