'use client'
import { useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';
import { useRouter } from 'next/navigation';
import { AiFillEye, AiFillEyeInvisible, AiFillCopy, AiFillCheckCircle } from 'react-icons/ai';
import Modal from '@/app/components/Modal'; // Adjust the import path as needed

const KeyDetails = ({ params }) => {
    const [apiKey, setApiKey] = useState(null);
    const [showKey, setShowKey] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmationInput, setConfirmationInput] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchApiKeyDetails = async () => {
            try {
                const response = await fetch(`/api/applications/readKey/${params.apiId}`);
                const data = await response.json();

                if (data.success) {
                    setApiKey(data.keyDetails);
                } else {
                    console.error('Failed to fetch API key details');
                }
            } catch (error) {
                console.error('Fetch API key details error:', error);
            }
        };

        fetchApiKeyDetails();
    }, [params.apiId]);

    const revokeApiKey = async () => {
        try {
            const response = await fetch(`/api/applications/deleteKey/${params.apiId}`, {
                method: 'DELETE',
            });
            const data = await response.json();

            if (data.success) {
                router.push(`/applications`); // Redirect to the applications page after revoking the key
            } else {
                console.error('Failed to revoke API key');
            }
        } catch (error) {
            console.error('Revoke API key error:', error);
        }
    };

    const updateApiKey = async (updatedDetails) => {
        try {
            const response = await fetch(`/api/applications/updateKey/${params.apiId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedDetails),
            });
            const data = await response.json();

            if (data.success) {
                setApiKey(data.updatedKeyDetails);
                setShowEditModal(false);
            } else {
                console.error('Failed to update API key');
            }
        } catch (error) {
            console.error('Update API key error:', error);
        }
    };

    const handleToggleKeyVisibility = () => {
        setShowKey(!showKey);
    };

    const handleCopyKey = () => {
        navigator.clipboard.writeText(apiKey.key);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    };

    const handleRevokeClick = () => {
        setShowConfirmModal(true);
    };

    const handleConfirmRevoke = () => {
        if (confirmationInput.toLowerCase() === 'confirm') {
            revokeApiKey();
        }
    };

    if (!apiKey) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
                <Navbar />
                <div className="flex w-full max-w-4xl p-4 justify-center">
                    <p>API Key Details Not found</p>
                </div>
            </div>
        );
    }

    const { _id, key, name, requestLimit, requestWindowMs, isUnlimited, requestCount, createdAt } = apiKey;

    // Function to format date and time
    const formatDateTime = (dateTimeString) => {
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };

        return new Date(dateTimeString).toLocaleString('en-GB', options);
    };

    return (
        <div className="min-h-screen flex flex-col items-center mt-5 bg-black text-white">
            <Navbar />
            <div className="w-full max-w-4xl p-4">
                <div className='flex justify-between items-center mb-2'>
                    <h1 className="text-xl font-bold mb-4">{_id}</h1>
                    <div>
                        <button 
                            className='rounded-md bg-white mb-2 mr-1 text-black p-2 text-sm font-bold w-24 border border-gray-300 hover:border-black'
                            onClick={() => setShowEditModal(true)}
                        >
                            Edit
                        </button>
                        <button 
                            className='rounded-md bg-neutral-900 mb-2 text-red-500 p-2 text-sm font-bold w-24 border border-red-500 hover:bg-neutral-700 border border-neutral-800'
                            onClick={handleRevokeClick}
                        >
                            Revoke
                        </button>
                    </div>
                </div>
                <div className="border border-neutral-900 bg-black-800 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <p className="text-zinc-200 mr-2">Key: {showKey ? key : '••••••••••••••••••••••••'}</p>
                        </div>
                        <div>
                            <button onClick={handleToggleKeyVisibility} className="text-zinc-200 mr-2">
                                {showKey ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
                            </button>
                            <button onClick={handleCopyKey} className="text-zinc-200">
                                {copied ? <AiFillCheckCircle size={24} /> : <AiFillCopy size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
                {name && (
                    <div className="border border-neutral-900 bg-black-800 rounded-lg p-4 mb-4">
                        <p className="text-zinc-200">Name: {name}</p>
                    </div>
                )}
                {requestLimit && (
                    <div className="border border-neutral-900 bg-black-800 rounded-lg p-4 mb-4">
                        <p className="text-zinc-200">Request Limit: {requestLimit}</p>
                    </div>
                )}
                {requestWindowMs && (
                    <div className="border border-neutral-900 bg-black-800 rounded-lg p-4 mb-4">
                        <p className="text-zinc-200">Request Window (ms): {requestWindowMs}</p>
                    </div>
                )}
                <div className="border border-neutral-900 bg-black-800 rounded-lg p-4 mb-4">
                    <p className="text-zinc-200">Request Count: {requestCount}</p>
                </div>
                {createdAt && (
                    <div className="border border-neutral-900 bg-black-800 rounded-lg p-4 mb-4">
                        <p className="text-zinc-200">Created at: {formatDateTime(createdAt)}</p>
                    </div>
                )}
                <div className="border border-neutral-900 bg-black-800 rounded-lg p-4 mb-4">
                    <p className="text-zinc-200">Unlimited: {isUnlimited ? 'True' : 'False'}</p>
                </div>
            </div>

            {/* Edit Modal */}
            <Modal
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSubmit={updateApiKey}
                initialData={{ 
                    name: name || '', 
                    role: apiKey.role || '', 
                    rateLimit: requestLimit || 100, 
                    requestWindowMs: requestWindowMs || 15 * 60 * 1000, 
                    isUnlimited: isUnlimited || false 
                }}
            />

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="border border-zinc-500 bg-black p-4 rounded-lg">
                        <h2 className="text-lg font-bold mb-2 text-white">Confirm Revocation</h2>
                        <p className="text-zinc-200 mb-2">Type &quot;confirm&quot; to revoke the API key.<br /> Note that these keys after deletion <strong>cannot be recovered.</strong></p>
                        <input
                            type="text"
                            value={confirmationInput}
                            onChange={(e) => setConfirmationInput(e.target.value)}
                            className="outline-none bg-zinc-950 border-2 border-neutral-700 rounded-md p-2 mb-4 w-full text-white"
                        />
                        <div className="flex justify-start gap-2">
                            <button
                                className="rounded-md border border-red-500 bg-zinc-900 text-red-500 p-2"
                                onClick={handleConfirmRevoke}
                            >
                                Confirm
                            </button>
                            <button
                                className="rounded-md border border-neutral-700 bg-zinc-900 text-white p-2"
                                onClick={() => setShowConfirmModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KeyDetails;
