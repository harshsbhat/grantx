'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();
    

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/me');
                const data = await response.json();

                if (data.success) {
                    setUser(data    );
                } else {
                    router.push('/login');
                }
            } catch (error) {
                router.push('/login');  
            }
        };

        fetchUserData();
    }, [router]);

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <Navbar></Navbar>
            <div className="max-w-4xl w-full p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">Welcome, {user.id}</h2>
                <div className="mt-6">
                    <p className="text-lg text-gray-700">Email: {user.email}</p>
                    {/* Add more user-specific information here */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
