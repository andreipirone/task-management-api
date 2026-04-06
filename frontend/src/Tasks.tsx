import './Navbar.css'
import { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from './components/ui/button';
function Tasks() {
    const { isAuthenticated, loginWithRedirect, logout, user, getAccessTokenSilently } = useAuth0();
    const [data, setData] = useState<any | null>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchPublic = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/public');
            const text = await response.json();
            setData(text);
            console.log(text);
            setError(null);
        } catch (err) {
            setError('Failed to fetch public endpoint.');
            setData(null);
        }
    };

    const fetchPrivate = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch('http://localhost:8080/api/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 401) {
                throw new Error("401 Unauthorized");
            }
            const text = await response.json();
            setData(text);
            console.log(text);
            setError(null);
        } catch (err: any) {
            setError('Failed to fetch private endpoint. Are you authorized? Error' + err.message);
            setData(null);
        }
    };

    const fetchAdmin = async () => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch('http://localhost:8080/api/admin', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 403) {
                throw new Error("403 Forbidden");
            }
            const text = await response.text();
            setData(text);
            console.log(text);
            setError(null);
        } catch (err: any) {
            setError('Failed to fetch admin endpoint. Are you authorized? Error' + err.message);
            setData(null);
        }
    };

    const signup = () =>
        loginWithRedirect({ authorizationParams: { screen_hint: "signup" } });

    return (
        <>
            <h1>Home</h1>
            <h2>{isAuthenticated ? `Welcome, ${user?.name}!` : "You are not logged in."}</h2>
            <Button onClick={fetchPublic}>
                Fetch Public Endpoint
            </Button>
            <Button onClick={fetchPrivate}>
                Fetch Private Endpoint
            </Button>
            <Button onClick={fetchAdmin}>
                Fetch Admin Endpoint
            </Button>
            <br></br>
            <p>{data.message}</p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button onClick={signup}>
                Log In
            </Button>
            <br></br>
            <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Log Out
            </Button>
        </>
    )
}

export default Tasks
