import config from './config.js';

// Initialize Razorpay payment
async function initPayment(amount) {
    try {
        // Create order on backend
        const response = await fetch(`${config.apiUrl}/create_order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount })
        });

        const orderData = await response.json();
        if (!orderData.id) {
            throw new Error('Could not create order');
        }

        // Initialize Razorpay
        const options = {
            key: config.razorpayKeyId,
            amount: orderData.amount,
            currency: "INR",
            name: "Student Forge",
            description: "Course Payment",
            image: "assets/temp_logo.png",
            order_id: orderData.id,
            handler: function (response) {
                verifyPayment(response);
            },
            prefill: {
                name: "",
                email: "",
                contact: ""
            },
            notes: {
                address: "Student Forge Office"
            },
            theme: {
                color: "#003153"
            }
        };

        const rzp = new Razorpay(options);
        rzp.open();

        rzp.on('payment.failed', function (response) {
            alert('Payment failed. Please try again. \nError: ' + response.error.description);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Could not initiate payment. Please try again.');
    }
}

// Verify payment with backend
async function verifyPayment(response) {
    try {
        const verifyResponse = await fetch(`${config.apiUrl}/verify_payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature
            })
        });

        const data = await verifyResponse.json();
        if (data.valid) {
            alert('Payment successful!');
            // Add success handling here (e.g., redirect to success page)
        } else {
            alert('Payment verification failed. Please contact support.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Could not verify payment. Please contact support.');
    }
}

export { initPayment, verifyPayment };
