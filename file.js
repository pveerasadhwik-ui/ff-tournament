// ===== UTILITY FUNCTIONS =====

// Show Toast Notification
function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Toggle Password Visibility
document.addEventListener('click', function(e) {
    if (e.target.closest('.toggle-password')) {
        const btn = e.target.closest('.toggle-password');
        const input = btn.parentElement.querySelector('input');
        const icon = btn.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
});

// Mobile number validation
document.addEventListener('input', function(e) {
    if (e.target.id === 'mobile') {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
    }
});

// Check authentication status
function checkAuth() {
    const protectedPages = ['dashboard.html', 'my-matches.html', 'results.html', 'room-details.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage) && !localStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html';
    }
}

// Run auth check on page load
document.addEventListener('DOMContentLoaded', checkAuth);

// ===== PAYMENT INTEGRATION (DEMO) =====
// In production, integrate with Razorpay, Paytm, or other payment gateways

function initiatePayment(amount, orderId, callback) {
    // Demo payment - simulates successful payment
    console.log(`Processing payment of ₹${amount} for order ${orderId}`);
    
    // Simulate payment processing
    setTimeout(() => {
        // In production, this would be the actual payment gateway response
        const paymentResult = {
            success: true,
            transactionId: 'TXN' + Date.now(),
            amount: amount
        };
        
        callback(paymentResult);
    }, 1500);
}

// ===== RAZORPAY INTEGRATION (Production) =====
/*
function initiateRazorpayPayment(amount, orderId, callback) {
    const options = {
        key: 'YOUR_RAZORPAY_KEY_ID',
        amount: amount * 100, // Razorpay accepts amount in paisa
        currency: 'INR',
        name: 'FF Tournaments',
        description: 'Tournament Entry Fee',
        order_id: orderId,
        handler: function(response) {
            callback({
                success: true,
                transactionId: response.razorpay_payment_id,
                amount: amount
            });
        },
        prefill: {
            contact: JSON.parse(localStorage.getItem('ffUser')).mobile
        },
        theme: {
            color: '#ff4655'
        }
    };
    
    const rzp = new Razorpay(options);
    rzp.open();
}
*/

// ===== SERVICE WORKER REGISTRATION (Optional - for PWA) =====
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered:', registration);
            })
            .catch(error => {
                console.log('SW registration failed:', error);
            });
    });
}
*/
