import { authenticate } from '../../../middleware';
import Application from '../../../models/Application';
import dbConnect from '../../../utils/dbConnect';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    authenticate(req, res, async () => {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ success: false, error: 'Name is required' });
        }

        try {
            const newApplication = new Application({
                name,
                owner: req.user._id,
            });

            await newApplication.save();

            return res.status(201).json({ success: true, data: newApplication });
        } catch (error) {
            return res.status(500).json({ success: false, error: 'Server error' });
        }
    });
}
