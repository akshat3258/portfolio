import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import "./styles/Navbar.css";
gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother;
const Navbar = () => {
    useEffect(() => {
        smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.7,
            speed: 1.7,
            effects: true,
            autoResize: true,
            ignoreMobileResize: true,
        });
        smoother.scrollTop(0);
        smoother.paused(true);
        let links = document.querySelectorAll(".header ul a");
        links.forEach((elem) => {
            let element = elem;
            element.addEventListener("click", (e) => {
                if (window.innerWidth > 1024) {
                    e.preventDefault();
                    let elem = e.currentTarget;
                    let section = elem.getAttribute("data-href");
                    smoother.scrollTo(section, true, "top top");
                }
            });
        });
        window.addEventListener("resize", () => {
            ScrollSmoother.refresh(true);
        });
    }, []);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "header", children: [_jsx("a", { href: "/#", className: "navbar-title", "data-cursor": "disable", children: "AM" }), _jsx("a", { href: "mailto:akshatmathur99@gmail.com", className: "navbar-connect", "data-cursor": "disable", children: "akshatmathur99@gmail.com" }), _jsxs("ul", { children: [_jsx("li", { children: _jsx("a", { "data-href": "#about", href: "#about", children: _jsx(HoverLinks, { text: "ABOUT" }) }) }), _jsx("li", { children: _jsx("a", { "data-href": "#work", href: "#work", children: _jsx(HoverLinks, { text: "WORK" }) }) }), _jsx("li", { children: _jsx("a", { "data-href": "#contact", href: "#contact", children: _jsx(HoverLinks, { text: "CONTACT" }) }) })] })] }), _jsx("div", { className: "landing-circle1" }), _jsx("div", { className: "landing-circle2" }), _jsx("div", { className: "nav-fade" })] }));
};
export default Navbar;
