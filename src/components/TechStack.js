import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import { BallCollider, Physics, RigidBody, CylinderCollider, } from "@react-three/rapier";
const textureLoader = new THREE.TextureLoader();
const imageUrls = [
    "/images/python.png",
    "/images/python.png",
    "/images/python.png",

    "/images/openai.png",
    "/images/openai.png",
    "/images/openai.png",

    "/images/node.webp",
    "/images/node.webp",
    "/images/node.webp",

    "/images/claude.png",
    "/images/claude.png",
    "/images/claude.png",

    "/images/fastapi.png",
    "/images/fastapi.png",
    "/images/fastapi.png",

    "/images/aws.jpg",
    "/images/aws.jpg",
    "/images/aws.jpg",

    "/images/github_logo.png",
    "/images/github_logo.png",
    "/images/github_logo.png",

    "/images/javascript.webp",
    "/images/javascript.webp",
    "/images/javascript.webp",

    "/images/react.webp",
    "/images/react.webp",
    "/images/react.webp",

    "/images/airtable.png",
    "/images/airtable.png",
    "/images/airtable.png"
];
const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);
// Pre-assign a materialIndex per sphere — prevents random re-assignment on every render
const spheres = [...Array(30)].map((_, i) => ({
    scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
    materialIndex: i % imageUrls.length,
}));
function SphereGeo({ vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread, material, isActive, }) {
    const api = useRef(null);
    useFrame((_state, delta) => {
        if (!isActive)
            return;
        delta = Math.min(0.1, delta);
        const impulse = vec
            .copy(api.current.translation())
            .normalize()
            .multiply(new THREE.Vector3(-50 * delta * scale, -150 * delta * scale, -50 * delta * scale));
        api.current?.applyImpulse(impulse, true);
    });
    return (_jsxs(RigidBody, { linearDamping: 0.75, angularDamping: 0.15, friction: 0.2, position: [r(20), r(20) - 25, r(20) - 10], ref: api, colliders: false, children: [_jsx(BallCollider, { args: [scale] }), _jsx(CylinderCollider, { rotation: [Math.PI / 2, 0, 0], position: [0, 0, 1.2 * scale], args: [0.15 * scale, 0.275 * scale] }), _jsx("mesh", { castShadow: true, receiveShadow: true, scale: scale, geometry: sphereGeometry, material: material, rotation: [0.3, 1, 1] })] }));
}
function Pointer({ vec = new THREE.Vector3(), isActive }) {
    const ref = useRef(null);
    useFrame(({ pointer, viewport }) => {
        if (!isActive)
            return;
        const targetVec = vec.lerp(new THREE.Vector3((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0), 0.2);
        ref.current?.setNextKinematicTranslation(targetVec);
    });
    return (_jsx(RigidBody, { position: [100, 100, 100], type: "kinematicPosition", colliders: false, ref: ref, children: _jsx(BallCollider, { args: [2] }) }));
}
const TechStack = () => {
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            const workEl = document.getElementById("work");
            if (!workEl)
                return; // Null guard — prevents crash if section isn't mounted
            const threshold = workEl.getBoundingClientRect().top;
            setIsActive(scrollY > threshold);
        };
        document.querySelectorAll(".header a").forEach((elem) => {
            const element = elem;
            element.addEventListener("click", () => {
                const interval = setInterval(() => {
                    handleScroll();
                }, 10);
                setTimeout(() => {
                    clearInterval(interval);
                }, 1000);
            });
        });
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    // Load textures inside useMemo to avoid blocking module initialization
    const materials = useMemo(() => {
        const textures = imageUrls.map((url) => textureLoader.load(url));
        return textures.map((texture) => new THREE.MeshPhysicalMaterial({
            map: texture,
            emissive: "#ffffff",
            emissiveMap: texture,
            emissiveIntensity: 0.3,
            metalness: 0.5,
            roughness: 1,
            clearcoat: 0.1,
        }));
    }, []);
    return (_jsxs("div", { className: "techstack", children: [_jsx("h2", { children: " My Techstack" }), _jsxs(Canvas, { shadows: true, gl: { alpha: true, stencil: false, depth: false, antialias: false }, camera: { position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }, onCreated: (state) => (state.gl.toneMappingExposure = 1.5), className: "tech-canvas", children: [_jsx("ambientLight", { intensity: 1 }), _jsx("spotLight", { position: [20, 20, 25], penumbra: 1, angle: 0.2, color: "white", castShadow: true, "shadow-mapSize": [512, 512] }), _jsx("directionalLight", { position: [0, 5, -4], intensity: 2 }), _jsxs(Physics, { gravity: [0, 0, 0], children: [_jsx(Pointer, { isActive: isActive }), spheres.map((props, i) => (_jsx(SphereGeo, { ...props, material: materials[props.materialIndex], isActive: isActive }, i)))] }), _jsx(Environment, { files: "/models/char_enviorment.hdr", environmentIntensity: 0.5, environmentRotation: [0, 4, 2] }), _jsx(EffectComposer, { enableNormalPass: false, children: _jsx(N8AO, { color: "#0f002c", aoRadius: 2, intensity: 1.15 }) })] })] }));
};
export default TechStack;
