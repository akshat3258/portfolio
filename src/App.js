import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { lazy, Suspense } from "react";
import "./App.css";
const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";
const App = () => {
    return (_jsx(_Fragment, { children: _jsx(LoadingProvider, { children: _jsx(Suspense, { children: _jsx(MainContainer, { children: _jsx(Suspense, { children: _jsx(CharacterModel, {}) }) }) }) }) }));
};
export default App;
