import clientPromise from '../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      const db = client.db('qrCodeDB');
      const collection = db.collection('scans');

      const { result } = req.body;
      if (!result) return res.status(400).json({ error: 'Invalid data' });

      await collection.insertOne({ result, scannedAt: new Date() });

      res.status(200).json({ message: 'Scan saved successfully' });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Error saving scan data' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
