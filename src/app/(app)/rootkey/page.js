'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import { AiFillCopy, AiFillCheckCircle, AiFillDelete } from 'react-icons/ai';

const RootKeys = () => {
    const [user, setUser] = useState(null);
    const [rootKeys, setRootKeys] = useState([]);
    const [createdRootKey, setCreatedRootKey] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [keyToDelete, setKeyToDelete] = useState(null);
    const [copiedKey, setCopiedKey] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/me');
                const data = await response.json();

                if (data.success) {
                    setUser(data);
                    fetchRootKeys(data.id);
                } else {
                    router.push('/login');
                }
            } catch (error) {
                router.push('/login');
            }
        };

        const fetchRootKeys = async (userId) => {
            if (!userId) return;
            try {
                const response = await fetch(`/api/rootKey/read/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch root keys');
                }

                const data = await response.json();

                if (data.success) {
                    setRootKeys(data.data);
                } else {
                    setRootKeys([]);
                }
            } catch (error) {
                console.error('Error fetching root keys:', error);
                setRootKeys([]);
            }
        };

        fetchUserData();
    }, [router]);

    const createRootKey = async () => {
        try {
            const response = await fetch(`/api/rootKey/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user.id }), // Include userId in the request body
            });
            const data = await response.json();

            if (data.success) {
                setRootKeys([...rootKeys, data.rootKey]); // Add the created root key to the list
                setCreatedRootKey(data.rootKey); // Set the created root key in state
            } else {
                console.error('Failed to create root key');
            }
        } catch (error) {
            console.error('Create root key error:', error);
        }
    };

    const handleDeleteClick = (key) => {
        setKeyToDelete(key);
        setShowModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch(`/api/rootKey/delete/${keyToDelete.key}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            if (data.success) {
                setRootKeys(rootKeys.filter((key) => key._id !== keyToDelete._id));
                setShowModal(false);
                setKeyToDelete(null);
            } else {
                console.error('Failed to delete root key');
            }
        } catch (error) {
            console.error('Delete root key error:', error);
        }
    };

    const handleDeleteCancel = () => {
        setShowModal(false);
        setKeyToDelete(null);
    };

    const handleCopyKey = (key) => {
        navigator.clipboard.writeText(key);
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000); // Reset after 2 seconds
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center mt-5 bg-black text-white">
            <Navbar />
            <div className="w-full max-w-4xl p-4">
                <div className='flex justify-between items-center mb-4'>
                <h1 className="text-2xl font-bold mb-4">Root Keys</h1>
                <button
                    className="rounded-md bg-white mb-4 text-black p-2 text-sm font-bold"
                    onClick={createRootKey}
                    disabled={!user} // Disable button until user is fetched
                >
                    Create Root Key
                </button>
                </div>
                <ul>
                    {rootKeys.length > 0 ? (
                        rootKeys.map((key) => (
                            <li key={key._id} className="mb-2 bg-zinc-950 p-8 rounded-lg border border-zinc-900 flex justify-between items-center">
                                <div className="flex items-center justify-between ">
                                    <h2 className="text-sm font-bold text-color-zinc-700">{key.key}</h2>
                                    <div className='ml-5'>
                                    <button onClick={() => handleCopyKey(key.key)} className="text-zinc-200">
                                        {copiedKey === key.key ? <AiFillCheckCircle size={24} /> : <AiFillCopy size={24} />}
                                    </button>
                                
                                <button onClick={() => handleDeleteClick(key)} className="text-red-500">
                                    <AiFillDelete size={24} />
                                </button>
                                </div>
                                </div>
                            </li>
                        ))
                    ) : (   
                        <p>No root keys found.</p>
                    )}
                </ul>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-neutral-950 p-6 rounded-lg max-w-md w-full">
                        <h2 className="text-l font-bold mb-4">Confirm Delete</h2>
                        <p>Are you sure you want to delete this root key?</p>
                        <div className="mt-4">
                            <button
                                onClick={handleDeleteConfirm}
                                className="bg-red-700 text-white p-2 rounded-lg mr-2"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={handleDeleteCancel}
                                className="bg-gray-700 text-white p-2 rounded-lg"
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

export default RootKeys;
