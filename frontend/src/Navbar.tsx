import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import './Navbar.css';

function Navbar() {
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

    return (
        <header className="sticky top-0 z-[1000] bg-[#101113] min-h-[55px] flex items-center justify-between px-6 md:px-12 shadow-sm">
            <div className="flex items-center gap-4 sm:gap-8">
                <Link to="/" className="text-white no-underline font-semibold text-lg tracking-wide shrink-0">
                    Task Management App
                </Link>
                <div className="flex gap-2">
                    <Link to="/tasks" className="text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md px-3 py-2 transition-colors no-underline font-light text-sm">Tasks</Link>
                </div>
            </div>
            <div className="flex items-center gap-3">
                {isAuthenticated ? (
                    <>
                        <span className="text-gray-300 text-sm hidden sm:inline-block max-w-[150px] truncate">
                            {user?.name || user?.email}
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
