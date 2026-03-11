import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
const WorkImage = (props) => {
    const [isVideo, setIsVideo] = useState(false);
    const [video, setVideo] = useState("");
    const handleMouseEnter = async () => {
        if (props.video) {
            setIsVideo(true);
            const response = await fetch(`src/assets/${props.video}`);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            setVideo(blobUrl);
        }
    };
    return (_jsx("div", { className: "work-image", children: _jsxs("a", { className: "work-image-in", href: props.link, onMouseEnter: handleMouseEnter, onMouseLeave: () => setIsVideo(false), target: "_blank", "data-cursor": "disable", children: [props.link && (_jsx("div", { className: "work-link", children: _jsx(MdArrowOutward, {}) })), _jsx("img", { src: props.image, alt: props.alt }), isVideo && _jsx("video", { src: video, autoPlay: true, muted: true, playsInline: true, loop: true })] }) }));
};
export default WorkImage;
