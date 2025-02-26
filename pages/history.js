import { useState, useEffect } from 'react';

export default function History() {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    fetch('/api/get-scans')
      .then((res) => res.json())
      .then((data) => setScans(data));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Scan History</h1>
      <div className="w-full max-w-md bg-gray-800 p-4 rounded-lg shadow-lg">
        {scans.length > 0 ? (
          <ul>
            {scans.map((scan, index) => (
              <li key={index} className="p-2 border-b border-gray-700">
                {scan.result} <span className="text-gray-400">({new Date(scan.scannedAt).toLocaleString()})</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No scan history available.</p>
        )}
      </div>
    </div>
  );
}
