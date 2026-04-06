import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';

function Welcome() {
    const { loginWithRedirect } = useAuth0();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-center mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                    Task Management App
                </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 text-center max-w-2xl">
                The ultimate productivity tool for managing your daily workflow. Log in or sign up to get started.
            </p>
            <Button 
                onClick={() => loginWithRedirect()} 
                className="font-semibold bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 shadow-lg shadow-purple-500/30 transition-all duration-300"
            >
                Start using App
            </Button>
        </div>
    );
}

export default Welcome;
