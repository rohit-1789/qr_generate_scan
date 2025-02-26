import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <h1 className="text-5xl font-extrabold mb-6 animate-fade-in">Welcome to QR Code App</h1>
      <p className="text-xl text-gray-300 mb-8 animate-slide-in">
        Generate and Scan QR Codes Instantly!
      </p>
      <div className="flex space-x-6">
        <Link href="/generate">
          <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg rounded-lg shadow-lg transition-all transform hover:scale-105 animate-pulse">
            Generate QR Code
          </button>
        </Link>
        <Link href="/scan">
          <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white text-lg rounded-lg shadow-lg transition-all transform hover:scale-105 animate-pulse">
            Scan QR Code
          </button>
        </Link>
      </div>
      
    </div>
    
  );
}
