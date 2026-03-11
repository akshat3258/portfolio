import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./styles/style.css";
const HoverLinks = ({ text, cursor }) => {
    return (_jsx("div", { className: "hover-link", "data-cursor": !cursor && `disable`, children: _jsxs("div", { className: "hover-in", children: [text, " ", _jsx("div", { children: text })] }) }));
};
export default HoverLinks;
