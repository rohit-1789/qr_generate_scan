import "../styles/globals.css";
import { DarkModeProvider } from "../context/DarkModeContext";
import DarkModeToggle from "../components/DarkModeToggle";

function MyApp({ Component, pageProps }) {
  return (
    <DarkModeProvider>
      <div className="min-h-screen transition-all bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
        <DarkModeToggle />
        <Component {...pageProps} />
      </div>
    </DarkModeProvider>
  );
}

export default MyApp;
