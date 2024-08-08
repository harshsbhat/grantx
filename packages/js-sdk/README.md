SDK Documentation


grantx(rootKey: string)
Initialize the SDK with a root key.
Parameters
rootKey: The root key used for authorization.



const { grantx } = require('grantx-sdk');


const rootKey = 'your_root_key_here';


(async () => {
  try {
    await grantx(rootKey);
    console.log('SDK initialized successfully with root key:', rootKey);
  } catch (error) {
    console.error('Error initializing SDK:', error.message);
  }
})();




createApplication(name: string)
Create a new application using the initialized SDK.
Parameters
name: The name of the application to create.
Returns
Application Details



const { createApplication } = require('grantx-sdk');


const appName = 'My New Application';


(async () => {
    try {
        const application = await createApplication(appName);
        console.log('Application created successfully:', application);
    } catch (error) {
        console.error('Error creating application:', error.message);
    }
})();


deleteApplication(applicationId)
Deletes an application identified by applicationId using the initialized SDK rootKey.
Parameters:
applicationId (string): The ID of the application to delete.
const { grantx, deleteApplication } = require('./src');


// Replace 'your_root_key' and 'your_application_id' with actual values
const rootKey = 'your_root_key';


const run = async () => {
    try {
        await grantx(rootKey);
        const deletedApp = await deleteApplication("your_application_id");
        console.log('Application deleted successfully:', deletedApp);
    } catch (error) {
        console.error('Error deleting application:', error);
    }
};


run();


createKey(appId, name, role, rateLimit, requestWindowMs)
Creates a new API key associated with a specific application.
Parameters
appId (string): The ID of the application for which the API key will be created.
name (string | null): The name or label for the API key. Can be null.
role (string | null): The role or permissions assigned to the API key. Can be null.
rateLimit (number | null): The maximum number of requests allowed per specified time window. If null, creates an unlimited API key. Default is 100 requests per 900,000 milliseconds (15 minutes).
requestWindowMs (number | null): The time window in milliseconds during which the rate limit applies.Null creates API key with unlimited requests. IIf no variable is created default rate limit  is applied with 100 requests across 90000 milliseconds (15 minutes).



const { grantx, createKey } = require('./src');


const rootKey = 'your_root_key';
const appId = 'your_app_id';
const keyName = 'key_name';
const role = 'role'; // Can be null
const rateLimit = null; // Unlimited requests
const requestWindowMs = null; // Unlimited request window


const run = async () => {
    try {
        await grantx(rootKey); // Initialize SDK with root key
        const key = await createKey(appId, keyName, role, rateLimit, requestWindowMs);
        console.log('Key created successfully:', key);
    } catch (error) {
        console.error('Error creating key:', error);
    }
};


run();




updateKey Function Documentation
The updateKey function is used to update an existing API key associated with an application.
Parameters
keyId: The ID of the API key to be updated.
name: (Optional) The new name for the API key.
role: (Optional) The new role for the API key.
rateLimit: (Optional) The new rate limit for the API key. Use null for unlimited.
requestWindowMs: (Optional) The new request window time (in milliseconds) for rate limiting. Use null for unlimited.
rootKey: The root key required for authentication and authorization.



const { updateKey } = require('./src');


const rootKey = 'your-root-key';
const keyId = 'id-of-api-key-to-update';
const newName = 'Updated API Key Name';
const newRole = 'new admin';
const newRateLimit = 500; // requests per minute
const newRequestWindowMs = 60000; // 60 seconds


const run = async () => {
    try {
        await grantx(rootKey); // Initialize SDK with root key
        const updatedKey = await updateKey(keyId, newName, newRole, newRateLimit, newRequestWindowMs);
        console.log('API Key updated successfully:', updatedKey);
    } catch (error) {
        console.error('Error updating API key:', error);
    }
};


run();




deleteKey Function Documentation
The deleteKey function deletes an API key identified by its keyId using the provided rootKey for authentication and authorization.
Parameters
keyId: The ID of the API key to be deleted.
rootKey: The root key required for authentication and authorization.
const { deleteKey } = require('./src');


// Replace placeholders with actual root key and key ID
const rootKey = '<your_root_key>';
const keyId = '<your_key_id>';


const run = async () => {
    try {
        await grantx(rootKey); // Initialize SDK with root key
        const deletedKey = await deleteKey(keyId);
        console.log('API Key deleted successfully:', deletedKey);
    } catch (error) {
        console.error('Error deleting API key:', error);
    }
};


run();


verifyKey Function Documentation
The verifyKey function verifies the validity of an API key and returns different responses based on the verification result.
const { verifyKey } = require('./src');


// Replace with your actual API key
const apikey = '<your_api_key>';


const run = async () => {
    try {
        const verification = await verifyKey(apikey);
        console.log('Key verified successfully:', verification);
    } catch (error) {
        console.error('Error verifying key:', error);
    }
};


run();

Invalid API key:
{ valid: false, error: 'Invalid API key' }

Indicates that the provided API key does not match any existing keys in the system.

API key not found:

{ valid: false, error: 'API key not found' }

Rate Limit Exceeded:

{ valid: false, message: 'Rate limit exceeded' }

API key verified:

{
    valid: true,
    message: 'API key verified',
    name: keyRecord.name,
    role: keyRecord.role,
}

