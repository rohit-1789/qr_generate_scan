import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function Scan() {
  const [result, setResult] = useState('');

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', { fps: 10, qrbox: 250 });

    scanner.render(
      async (decodedText) => {
        setResult(decodedText);
        scanner.clear();

        // Save the scanned result to MongoDB
        await fetch('/api/save-scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ result: decodedText }),
        });
      },
      (error) => console.log('Scan Error:', error)
    );

    return () => scanner.clear(); // Cleanup on unmount
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">QR Code Scanner</h1>
      <div id="reader" className="mt-6"></div>
      {result && (
        <p className="mt-4 text-lg">
          Scanned Result: <span className="text-blue-400">{result}</span>
        </p>
      )}
    </div>
  );
}
