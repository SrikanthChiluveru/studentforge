// Configuration for API endpoints
const config = {
    // Development environment
    development: {
        apiUrl: 'http://localhost:3000',
        razorpayKeyId: 'your_test_key_id'
    },
    
    // Production environment
    production: {
        apiUrl: 'https://sf-backend-axrt.onrender.com', // Render backend URL
        razorpayKeyId: 'your_live_key_id'
    }
};

// Determine which environment to use
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const currentConfig = isDevelopment ? config.development : config.production;

// Export the configuration
export default currentConfig;
