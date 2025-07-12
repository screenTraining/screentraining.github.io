// Authentication logic for index.html
document.addEventListener('DOMContentLoaded', function() {
    // Form submissions
    document.getElementById('registrationForm').addEventListener('submit', handleRegistration);
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Check for stored login
    checkStoredLogin();
    
    // Set language
    setLanguage('en');
});

async function handleRegistration(e) {
    e.preventDefault();
    
    const name = document.getElementById('regName').value.trim();
    const mobile = document.getElementById('regMobile').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const password = document.getElementById('regPassword').value;
    const address = document.getElementById('regAddress').value.trim();
    const referralCode = document.getElementById('regReferral').value.trim();
    
    const errors = validateRegistrationData(name, mobile, email, password);
    if (errors.length > 0) {
        showCustomAlert(errors.join('\n'), 'error');
        return;
    }
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="spinner"></div>Processing...';
    submitBtn.disabled = true;
    
    try {
        await register(name, mobile, email, password, address, referralCode);
    } catch (error) {
        console.error('Registration error:', error);
        showCustomAlert('Registration failed. Please try again.', 'error');
        playSound('error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="spinner"></div>Logging in...';
    submitBtn.disabled = true;
    
    try {
        await login(email, password, rememberMe);
    } catch (error) {
        console.error('Login error:', error);
        showCustomAlert('Login failed. Please try again.', 'error');
        playSound('error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

function validateRegistrationData(name, mobile, email, password) {
    const errors = [];
    if (name.length < 2 || name.length > 50) {
        errors.push('Name must be 2-50 characters');
    }
    if (!/^\+?[1-9]\d{1,14}$/.test(mobile)) {
        errors.push('Please use a valid international mobile number format');
    }
    if (!email.toLowerCase().endsWith('@gmail.com') || email.length < 10) {
        errors.push('Please use a valid Gmail address');
    }
    if (password.length < 6) {
        errors.push('Password must be at least 6 characters');
    }
    return errors;
}

// ... rest of the authentication functions
