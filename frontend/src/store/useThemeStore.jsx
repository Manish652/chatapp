import { create } from "zustand";

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("chart-theme") || "coffee",
    fontSize: localStorage.getItem("chart-font-size") || "medium", // small, medium, large
    setTheme: (theme) => {
        localStorage.setItem("chart-theme", theme);
        set({ theme });
    },
    setFontSize: (fontSize) => {
        localStorage.setItem("chart-font-size", fontSize);
        document.documentElement.setAttribute('data-font-size', fontSize);
        set({ fontSize });
    }
}));

