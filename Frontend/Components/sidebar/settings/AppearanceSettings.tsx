import { useEffect, useState } from "react";

export const AppearanceSettings = () => {
    const [darkMode, setDarkMode] = useState(false);

    // Load saved theme
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleTheme = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);

        if (newMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    return (
        <div>
            <h3 className="text-xl font-semibold mb-6">Appearance</h3>

            <div className="flex items-center justify-between p-4 rounded-xl bg-gray-100 dark:bg-gray-800 transition">
                <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                        Dark Mode
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Toggle between light and dark theme
                    </p>
                </div>

                {/* 🔥 Toggle Switch */}
                <button
                    onClick={toggleTheme}
                    className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                        darkMode ? "bg-indigo-600" : "bg-gray-300"
                    }`}
                >
                    <span
                        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ${
                            darkMode ? "translate-x-7" : "translate-x-0"
                        }`}
                    />
                </button>
            </div>
        </div>
    );
};