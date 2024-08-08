import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Handle successful logout (e.g., redirect to login page or show a message)
                router.push('/login'); // Redirect to login page
            } else {
                // Handle logout failure
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('An error occurred during logout:', error);
        }
    };

    return (
        <div className="bg-black border-r border-gray-300 h-full w-64 fixed left-0 top-0 overflow-y-auto flex flex-col justify-between">
            <div className="px-4 py-4">
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">GrantX</h1>
            </div>
            <nav className="flex-1">
                <ul className="space-y-2">
                    <NavItem href="/applications" label="APIs" />
                    <NavItem href="/auditlog" label="Audit Log" />
                    <NavItem href="/rootkey" label="Root Key" />
                    <NavItem href="/docs" label="Docs" />
                    <div onClick={handleLogout}><NavItem onClick={handleLogout} label="Logout" href="login"/></div>
                    
                </ul>
            </nav>
        </div>
    );
};

// Navigation item component
const NavItem = ({ href, label }) => {
    return (
        <li className="text-gray-300 hover:bg-gray-700 hover:text-white flex items-center py-2 px-4 rounded-lg cursor-pointer transition duration-300 ease-in-out">
            <Link href={href} className="flex items-center space-x-2">
                <span className="text-sm">{label}</span>
            </Link>
        </li>
    );
};

export default Navbar;
