'use client';
import { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import Modal from '../../../components/Modal';
import { useRouter } from 'next/navigation';

const ApplicationDetails = ({ params }) => {
    const [application, setApplication] = useState(null);
    const [apiKeys, setApiKeys] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchApplicationDetails = async () => {
            try {
                const response = await fetch(`/api/applications/${params.appId}`);
                const data = await response.json();

                if (data.success) {
                    setApplication(data.application);
                } else {
                    console.error('Failed to fetch application details');
                }
            } catch (error) {
                console.error('Fetch application details error:', error);
            }
        };

        const fetchApiKeys = async () => {
            try {
                const response = await fetch(`/api/applications/${params.appId}/keys`);
                const data = await response.json();

                if (data.success) {
                    setApiKeys(data.apiKeys);
                } else {
                    console.error('Failed to fetch API keys');
                }
            } catch (error) {
                console.error('Fetch API keys error:', error);
            }
        };

        fetchApplicationDetails();
        fetchApiKeys();
    }, [params.appId]);

    const createApiKey = async ({ name, rateLimit, requestWindowMs, role, whitelistedIPs}) => {
        const appId = params.appId;
        try {
            const response = await fetch(`/api/applications/createKey`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ appId, name, rateLimit, requestWindowMs, role, whitelistedIPs }),
            });
            const data = await response.json();

            if (data.success) {
                setApiKeys((prev) => [...prev, data.apiKey]);
                setShowModal(false); // Close the modal after successful API key creation
            } else {
                console.error('Failed to create API key');
            }
        } catch (error) {
            console.error('Create API key error:', error);
        }
    };

    const deleteApplication = async () => {
        try {
            const response = await fetch(`/api/applications/deleteApp/${params.appId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            if (data.success) {
                router.push('/applications'); // Redirect to the applications list after successful deletion
            } else {
                console.error('Failed to delete application');
            }
        } catch (error) {
            console.error('Delete application error:', error);
        }
    };

    const handleCreateKeyClick = () => {
        setShowModal(true);
    };

    const handleDeleteAppClick = () => {
        setShowDeleteModal(true);
    };

    const handleApiKeyClick = (apiKey) => {
        router.push(`/keys/${apiKey}`);
    };

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    if (!application) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
                <Navbar />
                <div className="flex w-full max-w-4xl p-4 justify-center">
                    <p>Application Details Not found</p>
                </div>
            </div>
        );
    }

    const { _id, name } = application;

    // Filtering API keys based on search term
    const filteredApiKeys = apiKeys.filter(apiKey =>
        apiKey._id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col items-center mt-5 bg-black text-white">
            <Navbar />
            <div className="w-full max-w-4xl p-4">
                <div className="flex gap-4 mb-4 justify-between items-center">
                    <h1 className="text-2xl font-bold"> {name} (ID: {_id})</h1>
                    <div>
                        <button
                            className="border border-red-500 rounded-md bg-black mb-2 mr-2 text-red-500 p-2 text-sm font-bold"
                            onClick={handleDeleteAppClick}
                        >
                            Delete App
                        </button>                    
                        <button
                            className="rounded-md bg-white mb-2 text-black p-2 text-sm font-bold"
                            onClick={handleCreateKeyClick}
                        >
                            Create Key
                        </button>
                    </div>
                </div>

                {/* Search bar */}
                <input
                    type="text"
                    placeholder="Search API keys..."
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    className="outline-none bg-zinc-950 border-2 border-zinc-900 rounded-md p-2 mb-4 w-full"
                />

                <div className="grid grid-cols-1 gap-4">
                    {filteredApiKeys.length > 0 ? (
                        filteredApiKeys.map((apiKey) => (
                            <div
                                key={apiKey.key}
                                className="border border-neutral-900 bg-black-800 rounded-lg p-4 hover:border-zinc-500 cursor-pointer"
                                onClick={() => handleApiKeyClick(apiKey._id)}
                            >
                                <p className="text-zinc-200">{apiKey.name}</p>
                                <p className="text-zinc-500">{apiKey._id}</p>
                            </div>
                        ))
                    ) : (
                        <p>No API keys found.</p>
                    )}
                </div>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)} onSubmit={createApiKey} />
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="border border-neutral-300 bg-black rounded-lg p-6 w-96">
                        <h2 className="text-xl font-bold mb-4 text-white">Confirm Deletion</h2>
                        <p className="text-white">Are you sure you want to delete this application and all its API keys?</p>
                        <div className="flex justify-start mt-4">
                            <button
                                className="mr-2 p-2 bg-gray-300 text-black rounded"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="p-2 font-semibold bg-red-600 text-white rounded"
                                onClick={deleteApplication}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicationDetails;
