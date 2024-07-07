const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

let rootKey;

const grantx = async (key) => {
    rootKey = key;
    if (!rootKey) {
        throw new Error('Root key is required');
    }
    console.log('SDK initialized with root key:', rootKey);
};

const apiClient = axios.create({
<<<<<<< HEAD
    baseURL: 'https://grantx.vercel.app/api',
=======
    baseURL: 'http://localhost:3000/api',
>>>>>>> e50b67abe70f27aa1f17cb97efb76a08df41cef2
    headers: {
        'Content-Type': 'application/json',
    }
});

const createApplication = async (name) => {
    try {
        if (!rootKey) {
            throw new Error('Please call grantx() to initialize the SDK with a root key before calling createApplication()');
        }
        console.log('Creating application with name:', name, 'and root key:', rootKey);
        const response = await apiClient.post('/sdk/applications/create', { name, rootKey });

        return response.data;
    } catch (error) {
        console.error('Error creating application:', error);
        throw new Error(error.response ? error.response.data.error : error.message);
    }
};

const deleteApplication = async (appId) => {
    try {
        if (!rootKey) {
            throw new Error('Please call grantx() to initialize the SDK with a root key before calling deleteApplication()');
        }
        console.log('Deleting application with name:', appId, 'and root key:', rootKey);
        const response = await apiClient.post('/sdk/applications/delete', { appId, rootKey });

        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.error : error.message);
    }
};


const createKey = async (appId, name, role, rateLimit, requestWindowMs) => {
    try {
        if (!rootKey) {
            throw new Error('Please call grantx() to initialize the SDK with a root key before calling createKey()');
        }
        console.log('Creating key with name:', appId, 'and root key:', rootKey);
        const response = await apiClient.post('/sdk/keys/create', { appId, name, role, rateLimit, requestWindowMs, rootKey });

        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.error : error.message);
    }
};


const updateKey = async (keyId, name, role, rateLimit, requestWindowMs) => {
    try {
        if (!rootKey) {
            throw new Error('Please call grantx() to initialize the SDK with a root key before calling createKey()');
        }
        console.log('Update API key with id:', keyId, 'and root key:', rootKey);
        const response = await apiClient.post('/sdk/keys/update', { keyId, name, role, rateLimit, requestWindowMs, rootKey });

        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.error : error.message);
    }
};

const deleteKey = async (keyId) => {
    try {
        if (!rootKey) {
            throw new Error('Please call grantx() to initialize the SDK with a root key before calling createKey()');
        }
        console.log('Deleting API key with id:', keyId, 'and root key:', rootKey);
        const response = await apiClient.post('/sdk/keys/delete', {keyId, rootKey} );

        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.error : error.message);
    }
};

const verifyKey = async (apiKey) => {
    try {
        const response = await apiClient.post('/sdk/keys/verify', {apiKey} );
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.error : error.message);
    }
};


module.exports = {
    createKey,
    updateKey,
    deleteKey,
    verifyKey,
    createApplication,
    deleteApplication,
    grantx,
    
};






