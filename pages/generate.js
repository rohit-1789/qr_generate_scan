import { useState } from 'react';
import QRCode from 'qrcode';

export default function Generate() {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const generateQRCode = async () => {
    if (!text.trim()) return; // Prevent empty input
    try {
      const url = await QRCode.toDataURL(text);
      setQrCodeUrl(url);
    } catch (error) {
      console.error('Error generating QR Code:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 animate-fade-in">QR Code Generator</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text or URL"
        className="border border-gray-300 rounded p-3 mb-4 w-full max-w-md bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
      />
      <button
        onClick={generateQRCode}
        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg shadow-md transition-all transform hover:scale-105"
      >
        Generate QR Code
      </button>
      {qrCodeUrl && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-lg animate-zoom-in">
          <img src={qrCodeUrl} alt="QR Code" className="border p-2 bg-gray-200 rounded-lg" />
        </div>
      )}
    </div>
  );
}
