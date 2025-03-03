import { useState } from 'react';
import QRCode from 'qrcode';

export default function Generate() {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [saveStatus, setSaveStatus] = useState(null);

  const generateQRCode = async () => {
    if (!text.trim()) return;
    try {
      const url = await QRCode.toDataURL(text);
      setQrCodeUrl(url);
      setSaveStatus(null);
    } catch (error) {
      console.error('Error generating QR Code:', error);
    }
  };

  const saveQRCode = async () => {
    if (!qrCodeUrl) return;

    const response = await fetch('/api/save-generated-qr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, qrCodeUrl }),
    });

    const data = await response.json();

    if (response.status === 409) {
      setSaveStatus('already-saved');
    } else if (response.ok) {
      setSaveStatus('saved');
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `QR-${text || 'Code'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white p-6 transition-all">
      <h1 className="text-4xl font-bold mb-6">QR Code Generator</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text or URL"
        className="border border-gray-300 rounded p-3 mb-4 w-full max-w-md bg-gray-200 dark:bg-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
      />
      <button
        onClick={generateQRCode}
        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg shadow-md transition-all transform hover:scale-105"
      >
        Generate QR Code
      </button> 
      {qrCodeUrl && (
        <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg animate-zoom-in flex flex-col items-center">
          <img src={qrCodeUrl} alt="QR Code" className="border p-2 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div className="flex mt-4 space-x-4">
            {saveStatus === 'already-saved' ? (
              <p className="text-yellow-400">QR Code already saved!</p>
            ) : saveStatus === 'saved' ? (
              <p className="text-green-400">QR Code saved successfully!</p>
            ) : (
              <button
                onClick={saveQRCode}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Save QR Code
              </button>
            )}
            <button
              onClick={downloadQRCode}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              Download QR Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
