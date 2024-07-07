'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { Router } from 'next/router';


const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const res = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!data.success) {
                setError(data.error);
                return;
            }

            setSuccess('Signup successful!');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setError('');
            router.push('/applications');
        } catch (error) {
            setError('An error occurred');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-75">
            <div className="max-w-md w-full p-8 bg-black bg-opacity-90 border border-gray-700 rounded-lg shadow-lg">
                <div>
                    <h2 className="text-3xl font-extrabold text-white text-center mb-4">Create your account</h2>
                    <p className="text-center text-gray-400 mb-6">
                        Already have an account? <Link href="/login" className="text-indigo-500 hover:text-indigo-400">Sign In</Link>
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
                    <span>or sign up with email</span>
                </div>
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 bg-gray-800 bg-opacity-50 border border-gray-500 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 bg-gray-800 bg-opacity-50 border border-gray-500 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 bg-gray-800 bg-opacity-50 border border-gray-500 placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                    {success && <p className="text-green-500 text-center mt-2">{success}</p>}
                    <div>
                        <button
                            type="submit"
                            className="w-full mt-6 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign Up with Email
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
