import clientPromise from '../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const client = await clientPromise;
      const db = client.db('qrCodeDB');
      const collection = db.collection('generated_qr');

      const { text, qrCodeUrl } = req.body;
      if (!text || !qrCodeUrl) return res.status(400).json({ error: 'Invalid data' });

      // Check if the QR code already exists
      const existingQR = await collection.findOne({ text });

      if (existingQR) {
        return res.status(409).json({ message: 'QR Code already saved' });
      }

      await collection.insertOne({ text, qrCodeUrl, createdAt: new Date() });

      res.status(200).json({ message: 'QR Code saved successfully' });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Error saving QR Code' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
