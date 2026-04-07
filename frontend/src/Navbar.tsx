import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import './Navbar.css';

function Navbar() {
    const { isAuthenticated, loginWithRedirect, logout, user, getAccessTokenSilently } = useAuth0();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdmin = async () => {
            if (isAuthenticated) {
                const roles = user?.['http://localhost:8080/roles'] || user?.['roles'] || user?.['permissions'] || [];
                if (roles.includes('admin') || roles.includes('Admin')) {
                    setIsAdmin(true);
                    return;
                }

                try {
                    const token = await getAccessTokenSilently();
                    const payloadBase64 = token.split('.')[1];
                    const decodedJson = atob(payloadBase64);
                    const decoded = JSON.parse(decodedJson);
                    const permissions = decoded.permissions || [];
                    if (permissions.includes('admin') || permissions.includes('Admin')) {
                        setIsAdmin(true);
                    }
                } catch (e) {
                    console.error("Error checking admin status", e);
                }
            } else {
                setIsAdmin(false);
            }
        };
        checkAdmin();
    }, [isAuthenticated, getAccessTokenSilently, user]);

    return (
        <header className="sticky top-0 z-[1000] bg-[#101113] min-h-[55px] flex items-center justify-between px-6 md:px-12 shadow-sm">
            <div className="flex items-center gap-4 sm:gap-8">
                <Link to="/" className="text-white no-underline font-semibold text-lg tracking-wide shrink-0">
                    Task Management App
                </Link>
                <div className="flex gap-2">
                    <Link to="/tasks" className="text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md px-3 py-2 transition-colors no-underline font-light text-sm">Tasks</Link>
                    {isAdmin && (
                        <Link to="/projects" className="text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md px-3 py-2 transition-colors no-underline font-light text-sm">Projects</Link>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-3">
                {isAuthenticated ? (
                    <>
                        <span className="text-gray-300 text-sm hidden sm:inline-block max-w-[200px] truncate">
                            {user?.name || user?.email} {isAdmin && <span className="text-purple-400 font-semibold ml-1">(Admin)</span>}
                        </span>
                        <Button
                            variant="secondary"
                            size="sm"
                            className="bg-gray-800 text-white hover:bg-gray-700 border border-gray-700"
                            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                        >
                            Log Out
                        </Button>
                    </>
                ) : (
                    <Button
                        variant="default"
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20"
                        onClick={() => loginWithRedirect()}
                    >
                        Log In
                    </Button>
                )}
            </div>
        </header>
    );
}

export default Navbar;
