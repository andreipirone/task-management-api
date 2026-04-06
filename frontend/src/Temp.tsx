

function Temp() {

    //  const { isAuthenticated, loginWithRedirect, logout, user, getAccessTokenSilently } = useAuth0();
    // const [data, setData] = useState<any | null>([]);
    // const [error, setError] = useState<string | null>(null);

    // const fetchPublic = async () => {
    //     try {
    //         const response = await fetch('http://localhost:8080/api/public');
    //         const text = await response.json();
    //         setData(text);
    //         console.log(text);
    //         setError(null);
    //     } catch (err) {
    //         setError('Failed to fetch public endpoint.');
    //         setData(null);
    //     }
    // };

    // const fetchPrivate = async () => {
    //     try {
    //         const token = await getAccessTokenSilently();
    //         const response = await fetch('http://localhost:8080/api/profile', {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         if (response.status === 401) {
    //             throw new Error("401 Unauthorized");
    //         }
    //         const text = await response.json();
    //         setData(text);
    //         console.log(text);
    //         setError(null);
    //     } catch (err: any) {
    //         setError('Failed to fetch private endpoint. Are you authorized? Error' + err.message);
    //         setData(null);
    //     }
    // };

    return (
        <>
            {/* <div className="px-6 py-3 md:px-12 md:py-6">
                <h1>{isAuthenticated ? `Welcome, ${user?.name}!` : "You are not logged in."}</h1>
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
            </div> */}
        </>
    );
}
