import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Auth0Provider } from '@auth0/auth0-react';

console.log("Domain Check:", import.meta.env.VITE_AUTH0_DOMAIN);
console.log("Client ID Check:", import.meta.env.VITE_AUTH0_CLIENT_ID);
console.log("Audience Check:", import.meta.env.VITE_AUTH0_AUDIENCE);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <link href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap" rel="stylesheet"></link>
      <Auth0Provider
          domain={import.meta.env.VITE_AUTH0_DOMAIN}
          clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
          authorizationParams={{
              redirect_uri: window.location.origin,
              audience: "http://localhost:8080"
      }}>
          <App />
      </Auth0Provider>
  </StrictMode>,
)
