import React from 'react';
import Link from 'next/link';

const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-black py-5 px-6"> {/* Added px-4 for horizontal padding */}
            <nav className="w-full p-4 flex justify-between items-center bg-black bg-opacity-75">
            <Link href="/"><div className="cursor-pointer text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 ">
                    GrantX    
                </div></Link>
                <div>
                    <Link href="/signup" className="text-black font-medium hover:text-gray-700 mx-4 bg-white py-2 px-4 rounded-md">
                        Get Started
                    </Link>
                    <Link href="/login" className="text-white">
                        Login
                    </Link>
                </div>
            </nav>
            <div className="flex-grow flex items-center justify-center px-4"> {/* Added px-4 for horizontal padding */}
                <div className="max-w-md w-full text-center">
                    <h1 className="text-3xl font-extrabold text-white mb-6">Effortless API Management</h1>
                    <p className="text-l text-gray-400 mb-6">
                        Control access, set rate limits, and revoke keys seamlessly. Simplify your workflow, focus on coding brilliance!
                    </p>
                    <div className="flex justify-center">
                        <Link href="/signup" className="w-40 mt-6 py-2 px-4 border border-black text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
