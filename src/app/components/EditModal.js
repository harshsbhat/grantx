import { useState, useEffect } from 'react';

const Modal = ({ show, onClose, onSubmit, initialData = {} }) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [rateLimitEnabled, setRateLimitEnabled] = useState(false);
    const [rateLimit, setRateLimit] = useState(100); // Default rate limit
    const [windowDuration, setWindowDuration] = useState(15 * 60 * 1000); // Default window duration in ms (15 minutes)

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
            setRole(initialData.role || '');
            setRateLimitEnabled(!!initialData.rateLimit);
            setRateLimit(initialData.rateLimit || 100);
            setWindowDuration(initialData.requestWindowMs || 15 * 60 * 1000);
        }
    }, [initialData]);

    if (!show) {
        return null;
    }

    const handleSubmit = () => {
        onSubmit({
            name: name || null,
            role: role || null,
            rateLimit: rateLimitEnabled ? rateLimit : null,
            requestWindowMs: rateLimitEnabled ? windowDuration : null,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="border border-zinc-600 bg-black rounded-lg p-4 w-96 text-white">
                <h2 className="text-2xl font-bold mb-4">{initialData ? 'Edit API Key' : 'Create New API Key'}</h2>
                <label className="block mb-2">
                    Name (optional but recommended):
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="outline-none block w-full mt-1 p-2 border rounded bg-gray-700 border-gray-600 text-white"
                    />
                </label>
                <label className="block mb-2">
                    Role (optional):
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="outline-none block w-full mt-1 p-2 border rounded bg-gray-700 border-gray-600 text-white"
                    />
                </label>
                <div className="flex items-center mb-4">
                    <label className="block mr-2">
                        Enable Rate Limiting:
                    </label>
                    <input
                        type="checkbox"
                        checked={rateLimitEnabled}
                        onChange={(e) => setRateLimitEnabled(e.target.checked)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                </div>
                {rateLimitEnabled && (
                    <>
                        <label className="block mb-2">
                            Rate Limit:
                            <input
                                type="number"
                                value={rateLimit}
                                onChange={(e) => setRateLimit(e.target.value)}
                                className="outline-none bg-gray-700 block w-full mt-1 p-2 border rounded bg-gray-700 border-gray-600 text-white"
                            />
                        </label>
                        <label className="block mb-2">
                            Window Duration (ms):
                            <input
                                type="number"
                                value={windowDuration}
                                onChange={(e) => setWindowDuration(e.target.value)}
                                className="outline-none bg-gray-700 block w-full mt-1 p-2 border rounded bg-gray-700 border-gray-600 text-white"
                            />
                        </label>
                    </>
                )}
                <div className="flex justify-start mt-4">
                    <button
                        className="mr-2 p-2 bg-zinc-700 text-white rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="p-2 font-semibold bg-white text-black rounded"
                        onClick={handleSubmit}
                    >
                        {initialData ? 'Save Changes' : 'Create'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
