import dbConnect from './dbConnect';
import RootKey from '../models/Rootkey';

export async function verifyRootKey(key) {
    await dbConnect();

    const rootKey = key;
    console.log('Root Key:', rootKey);

    if (!rootKey) {
        return { valid: false, error: 'No Root Key Provided' };
    }

    try {
        const keyRecord = await RootKey.findOne({ key: rootKey });

        if (!keyRecord) {
            return { valid: false, error: 'Invalid root key' };
        }

        return { valid: true, userId: keyRecord.userId };
    } catch (error) {
        console.error('Error verifying root key:', error);
        return { valid: false, error: 'Server error' };
    }
}
