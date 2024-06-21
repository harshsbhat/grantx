'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [applications, setApplications] = useState([]);
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

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
            <Navbar />
            <div className="w-full max-w-4xl p-4">
            <h1 className="text-3xl font-bold mb-4">Applications</h1>
                {applications.length > 0 ? (
                    <ul>
                        {applications.map((app) => (
                            <li key={app._id} className="bg-gray-800 p-4 mb-2 rounded-lg">
                                <h2 className="text-xl font-bold">{app.name}</h2>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No applications created yet.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
