// URL of the Spring Boot backend that the admin panel saves to.
// Set VITE_API_URL in your website's .env file (e.g. VITE_API_URL=https://api.rangmohor.com)
export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/+$/, '')
