import { useState, useEffect } from "react";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";

export default function Scan() {
  const [result, setResult] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    if (!showScanner) return;

    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });

    scanner.render(
      (decodedText) => {
        setResult(decodedText);

        fetch("/api/save-scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ result: decodedText }),
        });

        if (decodedText.startsWith("http")) {
          const userConfirm = window.confirm(`Do you want to open this link in a new tab? \n${decodedText}`);
          if (userConfirm) {
            window.open(decodedText, "_blank");
          }
        }
      },
      (error) => console.log("Scan Error:", error)
    );

    return () => scanner.clear();
  }, [showScanner]);

  const handleStartScanner = () => setShowScanner(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 dark:bg-gray-900 dark:text-white p-6 transition-all">
      <h1 className="text-4xl font-bold mb-6 animate-fade-in">QR Code Scanner</h1>

      <button onClick={handleStartScanner} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105">
        Start QR Scanner
      </button>

      {showScanner && <div id="reader" className="mt-6 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-lg"></div>}
    </div>
  );
}
