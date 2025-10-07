// Configuration for API endpoints
const config = {
    // Development environment
    development: {
        apiUrl: 'https://sf-backend-c4so.onrender.com',
        razorpayKeyId: 'rzp_test_RQUvSCLKCFnWZH'
    },
    
    // Production environment
    production: {
        apiUrl: 'https://sf-backend-c4so.onrender.com', // Render backend URL
        razorpayKeyId: 'your_live_key_id'
    }
};

// Determine which environment to use
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const currentConfig = isDevelopment ? config.development : config.production;

// Export the configuration
export default currentConfig;
