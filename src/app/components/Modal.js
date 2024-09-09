import { useState } from 'react';

const Modal = ({ show, onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [rateLimitEnabled, setRateLimitEnabled] = useState(false);
    const [rateLimit, setRateLimit] = useState(100); // Default rate limit
    const [windowDuration, setWindowDuration] = useState(15 * 60 * 1000); // Default window duration in ms (15 minutes)
    const [whitelistEnabled, setWhitelistEnabled] = useState(false);
    const [whitelistedIP, setWhitelistedIP] = useState('');
    const [whitelistedIPs, setWhitelistedIPs] = useState([]);

    if (!show) {
        return null;
    }

    const handleSubmit = () => {
        onSubmit({
            name: name || null,
            role: role || null,
            rateLimit: rateLimitEnabled ? Number(rateLimit) : null,
            requestWindowMs: rateLimitEnabled ? Number(windowDuration) : null,
            whitelistedIPs: whitelistEnabled ? whitelistedIPs : null,
        });
        onClose();
    };

    const handleAddIP = () => {
        if (whitelistedIP && !whitelistedIPs.includes(whitelistedIP)) {
            setWhitelistedIPs([...whitelistedIPs, whitelistedIP]);
            setWhitelistedIP(''); // Clear the input field after adding
        }
    };

    const handleRemoveIP = (ipToRemove) => {
        setWhitelistedIPs(whitelistedIPs.filter((ip) => ip !== ipToRemove));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="border border-zinc-600 bg-black rounded-lg p-4 w-96 text-white">
                <h2 className="text-2xl font-bold mb-4">Create New API Key</h2>
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
                <div className="flex items-center mb-4">
                    <label className="block mr-2">
                        Enable Whitelisted IPs:
                    </label>
                    <input
                        type="checkbox"
                        checked={whitelistEnabled}
                        onChange={(e) => setWhitelistEnabled(e.target.checked)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                </div>
                {whitelistEnabled && (
                    <>
                        <label className="block mb-2">
                            Add Whitelisted IP:
                            <div className="flex">
                                <input
                                    type="text"
                                    value={whitelistedIP}
                                    onChange={(e) => setWhitelistedIP(e.target.value)}
                                    placeholder="Enter IP address"
                                    className="outline-none bg-gray-700 block w-full mt-1 p-2 border rounded bg-gray-700 border-gray-600 text-white"
                                />
                                <button
                                    onClick={handleAddIP}
                                    className="ml-2 bg-white text-black p-2 rounded"
                                >
                                    Add
                                </button>
                            </div>
                        </label>
                        <ul className="mb-4">
                            {whitelistedIPs.map((ip, index) => (
                                <li key={index} className="flex justify-between items-center">
                                    <span>{ip}</span>
                                    <button
                                        onClick={() => handleRemoveIP(ip)}
                                        className="bg-red-500 text-white p-1 rounded"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
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
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
