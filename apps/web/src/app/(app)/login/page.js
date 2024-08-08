'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter()
    const handleLogin = async () => {
        
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Login failed');
            }

            
            console.log('Login successful');
            router.push("/applications")
        } catch (error) {
            setError(error.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-75">
            <div className="max-w-md w-full p-8 bg-black bg-opacity-90 border border-gray-700 rounded-lg shadow-lg">
                <div>
                    <h2 className="text-3xl font-extrabold text-white text-center mb-4">Sign In</h2>
                    <p className="text-center text-gray-400 mb-6">
                        New to KeyX? <Link href="/signup" className="text-indigo-500 hover:text-indigo-400">Create new account</Link>
                    </p>
                </div>
                <div className="space-y-4">
                    <button
                        className="w-full flex items-center justify-center py-2 px-4 border border-gray-500 rounded-lg text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none"
                    >
                        <i className="fab fa-github mr-2"></i> GitHub
                    </button>
                    <button
                        className="w-full flex items-center justify-center py-2 px-4 border border-gray-500 rounded-lg text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none"
                    >
                        <i className="fab fa-google mr-2"></i> Google
                    </button>
                </div>
                <div className="text-center text-gray-400 my-6">
                    <span>or continue using email</span>
                </div>
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-lg relative block w-full px-4 py-2 bg-gray-800 bg-opacity-50 border border-gray-500 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-4 py-2 bg-gray-800 bg-opacity-50 border border-gray-500 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            className="w-full mt-6 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign In with Email
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
