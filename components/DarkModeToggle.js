import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 bg-gray-800 dark:bg-white text-white dark:text-black px-4 py-2 rounded shadow-md transition-all"
    >
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
