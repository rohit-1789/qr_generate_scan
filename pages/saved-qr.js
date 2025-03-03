import { useState, useEffect } from 'react';

export default function SavedQR() {
  const [savedQRCodes, setSavedQRCodes] = useState([]);

  useEffect(() => {
    fetch('/api/get-generated-qr')
      .then((res) => res.json())
      .then((data) => setSavedQRCodes(data));
  }, []);

  const downloadQRCode = (qrCodeUrl, text) => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `QR-${text || 'Code'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Saved QR Codes</h1>
      <div className="w-full max-w-md bg-gray-800 p-4 rounded-lg shadow-lg">
        {savedQRCodes.length > 0 ? (
          <ul>
            {savedQRCodes.map((qr, index) => (
              <li key={index} className="p-2 border-b border-gray-700 flex flex-col items-center">
                <p className="text-gray-300 mb-2">{qr.text}</p>
                <img src={qr.qrCodeUrl} alt="Saved QR Code" className="w-32 h-32 border p-2 bg-white rounded-lg" />
                <button
                  onClick={() => downloadQRCode(qr.qrCodeUrl, qr.text)}
                  className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                >
                  Download QR Code
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No saved QR codes available.</p>
        )}
      </div>
    </div>
  );
}