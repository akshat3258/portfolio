import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";
import Marquee from "react-fast-marquee";
const Loading = ({ percent }) => {
    const { setIsLoading } = useLoading();
    const [loaded, setLoaded] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [clicked, setClicked] = useState(false);
    // Move side-effect timers into useEffect to avoid calling them on every render
    useEffect(() => {
        if (percent >= 100) {
            const t1 = setTimeout(() => {
                setLoaded(true);
                const t2 = setTimeout(() => {
                    setIsLoaded(true);
                }, 1000);
                return () => clearTimeout(t2);
            }, 600);
            return () => clearTimeout(t1);
        }
    }, [percent]);
    useEffect(() => {
        import("./utils/initialFX").then((module) => {
            if (isLoaded) {
                setClicked(true);
                setTimeout(() => {
                    if (module.initialFX) {
                        module.initialFX();
                    }
                    setIsLoading(false);
                }, 900);
            }
        });
    }, [isLoaded]);
    function handleMouseMove(e) {
        const { currentTarget: target } = e;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        target.style.setProperty("--mouse-x", `${x}px`);
        target.style.setProperty("--mouse-y", `${y}px`);
    }
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "loading-header", children: [_jsx("a", { href: "/#", className: "loader-title", "data-cursor": "disable", children: "AM" }), _jsx("div", { className: `loaderGame ${clicked && "loader-out"}`, children: _jsxs("div", { className: "loaderGame-container", children: [_jsx("div", { className: "loaderGame-in", children: [...Array(27)].map((_, index) => (_jsx("div", { className: "loaderGame-line" }, index))) }), _jsx("div", { className: "loaderGame-ball" })] }) })] }), _jsxs("div", { className: "loading-screen", children: [_jsx("div", { className: "loading-marquee", children: _jsxs(Marquee, { children: [_jsx("span", { children: " ML Engineer" }), " ", _jsx("span", { children: "AI Agent Builder" }), _jsx("span", { children: " GenAI Developer" }), " ", _jsx("span", { children: "LLM Orchestrator" })] }) }), _jsxs("div", { className: `loading-wrap ${clicked && "loading-clicked"}`, onMouseMove: (e) => handleMouseMove(e), children: [_jsx("div", { className: "loading-hover" }), _jsxs("div", { className: `loading-button ${loaded && "loading-complete"}`, children: [_jsxs("div", { className: "loading-container", children: [_jsx("div", { className: "loading-content", children: _jsxs("div", { className: "loading-content-in", children: ["Loading ", _jsxs("span", { children: [percent, "%"] })] }) }), _jsx("div", { className: "loading-box" })] }), _jsx("div", { className: "loading-content2", children: _jsx("span", { children: "Welcome" }) })] })] })] })] }));
};
export default Loading;
export const setProgress = (setLoading) => {
    let percent = 0;
    let interval = setInterval(() => {
        if (percent <= 50) {
            let rand = Math.round(Math.random() * 5);
            percent = percent + rand;
            setLoading(percent);
        }
        else {
            clearInterval(interval);
            interval = setInterval(() => {
                percent = percent + Math.round(Math.random());
                setLoading(percent);
                if (percent > 91) {
                    clearInterval(interval);
                }
            }, 2000);
        }
    }, 100);
    function clear() {
        clearInterval(interval);
        setLoading(100);
    }
    function loaded() {
        return new Promise((resolve) => {
            clearInterval(interval);
            interval = setInterval(() => {
                if (percent < 100) {
                    percent++;
                    setLoading(percent);
                }
                else {
                    resolve(percent);
                    clearInterval(interval);
                }
            }, 2);
        });
    }
    return { loaded, percent, clear };
};
