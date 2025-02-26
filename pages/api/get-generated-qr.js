import clientPromise from '../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('qr-code-app');
      const collection = db.collection('generated_qr');

      const savedQRCodes = await collection.find({}).sort({ createdAt: -1 }).toArray();

      res.status(200).json(savedQRCodes);
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Error fetching QR Codes' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
