import clientPromise from '../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('qrCodeDB');
      const collection = db.collection('scans');

      const scans = await collection.find({}).sort({ scannedAt: -1 }).toArray();

      res.status(200).json(scans);
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Error fetching scan history' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
    