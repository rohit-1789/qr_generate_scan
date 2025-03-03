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

        // Save the scanned result to MongoDB
        fetch("/api/save-scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ result: decodedText }),
        });

        // Open URL in a new tab if it's a link
        if (decodedText.startsWith("http")) {
          const userConfirm = window.confirm(
            `Do you want to open this link in a new tab? \n${decodedText}`
          );
          if (userConfirm) {
            window.open(decodedText, "_blank");
          }
        }
      },
      (error) => console.log("Scan Error:", error)
    );

    return () => scanner.clear(); // Cleanup on unmount
  }, [showScanner]);

  // Handle file upload and scan QR code from an image file
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const html5QrCode = new Html5Qrcode("reader");
      try {
        const decodedText = await html5QrCode.scanFile(file, false);
        setResult(decodedText);

        // Save the scanned result to MongoDB
        fetch("/api/save-scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ result: decodedText }),
        });

        // Open URL in a new tab if it's a link
        if (decodedText.startsWith("http")) {
          const userConfirm = window.confirm(
            `Do you want to open this link in a new tab? \n${decodedText}`
          );
          if (userConfirm) {
            window.open(decodedText, "_blank");
          }
        }
      } catch (error) {
        alert("Failed to read QR Code from the file. Please try again.");
      }
    };
    reader.readAsDataURL(file);
  };

  // Ask for camera permission before starting
  const handleStartScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (stream) {
        setShowScanner(true);
      }
    } catch (error) {
      alert("Camera access denied. Please allow camera permissions.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 dark:bg-gray-900 dark:text-white p-6 transition-all">
      <h1 className="text-4xl font-bold mb-6 animate-fade-in">QR Code Scanner</h1>

      {/* QR Scanner Animation */}
      <img
        src="/qr-scan-animation.gif"
        alt="QR Scanner"
        className="w-48 h-48 mb-6 animate-pulse transition-all"
      />

      {/* Buttons to choose scan method */}
      {!showScanner && (
        <div className="flex space-x-4">
          <button
            onClick={handleStartScanner}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105"
          >
            Scan Using Camera
          </button>
          <label className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105 cursor-pointer">
            Open QR File to Scan
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      )}

      {/* Scanner */}
      {showScanner && (
        <div id="reader" className="mt-6 p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-lg"></div>
      )}

      {/* Scanned Result */}
      {result && (
        <div className="mt-6 text-lg bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 px-4 py-2 rounded-md shadow-md animate-fade-in flex flex-col items-center">
          <p className="font-semibold">Scanned Result:</p>
          {result.startsWith("http") ? (
            <a href={result} target="_blank" rel="noopener noreferrer" className="underline text-blue-500 dark:text-blue-300">
              {result}
            </a>
          ) : (
            <span className="font-semibold">{result}</span>
          )}
          {/* Scan Again Button */}
          <button
            onClick={() => setResult("")}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-md transition-all"
          >
            Scan Another QR Code
          </button>
        </div>
      )}
    </div>
  );
}
