import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './Navbar';
import Tasks from './Tasks';
import Welcome from './Welcome';

function App() {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                <p className="mt-4 text-gray-400">Loading...</p>
            </div>
        );
    }

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={isAuthenticated ? <Navigate to="/tasks" /> : <Welcome />}
                />
                <Route
                    path="/tasks"
                    element={
                        isAuthenticated ? (
                            <>
                                <Navbar />
                                <Tasks />
                            </>
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
