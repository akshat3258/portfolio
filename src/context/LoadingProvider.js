import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState, } from "react";
import Loading from "../components/Loading";
export const LoadingContext = createContext(null);
export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState(0);
    const value = {
        isLoading,
        setIsLoading,
        setLoading,
    };
    useEffect(() => { }, [loading]);
    return (_jsxs(LoadingContext.Provider, { value: value, children: [isLoading && _jsx(Loading, { percent: loading }), _jsx("main", { className: "main-body", children: children })] }));
};
export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
};
