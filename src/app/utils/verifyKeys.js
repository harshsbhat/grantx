import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const passphrase = process.env.AES_PASSPHRASE;


export function verifyAESKey(generatedKey, salt) {
    const expectedKey = crypto.pbkdf2Sync(passphrase, salt, 100000, 32, 'sha512').toString('hex'); 

    return generatedKey === expectedKey; 
}