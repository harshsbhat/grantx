import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const passphrase = process.env.AES_PASSPHRASE;

export function generateAESKey() {
    const salt = crypto.randomBytes(16).toString('hex'); // Generate random salt
    const key = crypto.pbkdf2Sync(passphrase, salt, 100000, 32, 'sha512').toString('hex'); // Derive key using PBKDF2
    const prefix = "gratnx_"
    const prefixed = prefix.concat(key.toString('hex'))
    return prefixed;
}
p