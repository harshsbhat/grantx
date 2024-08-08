'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';


const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [applications, setApplications] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [appName, setAppName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/me');
                const data = await response.json();

                if (data.success) {
                    setUser(data);
                    fetchApplications(data.id); 
                } else {
                    router.push('/login');
                }
            } catch (error) {
                router.push('/login');
            }
        };

        const fetchApplications = async (userId) => {
            if (!userId) return;
            try {
                const response = await fetch('/api/applications/read', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch applications');
                }

                const data = await response.json();

                if (data.success) {
                    setApplications(data.data);
                } else {
                    setApplications([]);
                }
            } catch (error) {
                console.error('Error fetching applications:', error);
                setApplications([]);
            } 
        };
        
        fetchUserData();
    }, [router]);

    const handleCreateClick = () => {
        setShowForm(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/applications/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user.id, name: appName }),
            });

            if (!response.ok) {
                throw new Error('Failed to create application');
            }

            const data = await response.json();

            if (data.success) {
                setApplications([...applications, data.application]);
                setShowForm(false);
                setAppName('');
            } else {
                console.error('Failed to create application');
            }
        } catch (error) {
            console.error('Error creating application:', error);
        }
    };

    const handleApplicationClick = (appId) => {
        router.push(`/applications/${appId}`);
    };

    if (!user) {
        return <p>Loading...</p>;
    }

    // Filtering applications based on search term
    const filteredApplications = applications.filter(app =>
        app.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-1 flex flex-col items-center justify-between items-center bg-black text-white">
            <Navbar />
            <div className="flex w-full max-w-4xl p-4  justify-between items-center">
                <div>
                <h1 className="text-xl font-bold mb-2 ">Applications</h1>
                </div>
                <div>
                <button 
                    className="rounded-md bg-white mb-2 text-black p-2  text-sm font-bold" 
                    onClick={handleCreateClick}
                >
                    Create
                </button>
                </div>
            </div>
            <div className="mt-6 w-full max-w-4xl p-4">
                {/* Search bar */}
                <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="outline-none bg-zinc-950 border-2 border-zinc-900 rounded-md p-2 mb-4 w-full"
                />
                
                {filteredApplications.length > 0 ? (
                    <ul className="">
                        {filteredApplications.map((app) => (
                            <li key={app._id} className="mb-2 bg-zinc-950 p-8 rounded-lg border border-zinc-900 hover:border-zinc-500" onClick={() => handleApplicationClick(app._id)}>
                                <h2 className="text-l font-bold cursor-pointer">{app.name}</h2>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No applications found.</p>
                )}
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-neutral-950 p-6 rounded-lg max-w-md w-full">
                        <h2 className="text-l font-bold mb-4">Name</h2>
                        <form  onSubmit={handleFormSubmit}>
                            <input 
                                type="text" 
                                placeholder="application name" 
                                value={appName} 
                                onChange={(e) => setAppName(e.target.value)}
                                className="bg-neutral-950 rounded-md outline-none text-white border p-3 mb-4 w-full"
                            />
                            <button type="submit" className="bg-white text-black p-2 rounded-lg">Create</button>
                            <button 
                                type="button" 
                                className="bg-red-700 text-white p-2 rounded-lg ml-2" 
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
