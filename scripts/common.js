// Shared utilities and common functions

// Audio functions
function playSound(type) {
    try {
        const sound = document.getElementById(`${type}Sound`);
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log('Sound play failed:', e));
        }
    } catch (error) {
        console.error('Error playing sound:', error);
    }
}

// Modal functions
function showCustomAlert(message, type = 'info') {
    const alertIcon = document.getElementById('alertIcon');
    const alertMessage = document.getElementById('alertMessage');
    const customAlert = document.getElementById('customAlert');
    
    switch(type) {
        case 'success':
            alertIcon.className = 'fas fa-check-circle text-5xl mb-4 text-green-400';
            playSound('success');
            break;
        case 'error':
            alertIcon.className = 'fas fa-exclamation-circle text-5xl mb-4 text-red-400';
            playSound('error');
            break;
        case 'warning':
            alertIcon.className = 'fas fa-exclamation-triangle text-5xl mb-4 text-yellow-400';
            playSound('warning');
            break;
        default:
            alertIcon.className = 'fas fa-info-circle text-5xl mb-4 text-blue-400';
    }
    
    alertMessage.textContent = message;
    customAlert.classList.remove('hidden');
}

function hideCustomAlert() {
    document.getElementById('customAlert').classList.add('hidden');
}

function showCustomConfirm(message, callback) {
    document.getElementById('confirmMessage').textContent = message;
    document.getElementById('customConfirm').classList.remove('hidden');
    window.hideCustomConfirm = function(result) {
        document.getElementById('customConfirm').classList.add('hidden');
        callback(result);
    };
}

// Language functions
function setLanguage(lang) {
    window.appState.currentLanguage = lang;
    document.documentElement.lang = lang;
    
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Format currency
function formatCurrency(amount) {
    return amount.toFixed(2);
}

// Format number
function formatNumber(num) {
    return num.toString();
}

// Logout function
function logout() {
    if (window.appState.activityInProgress) {
        handleSecurityViolation('logout_during_activity');
    }
    
    currentUser = null;
    isGuestMode = false;
    
    // Clear stored login
    localStorage.removeItem('rememberedLogin');
    
    document.getElementById('mainApp').classList.add('hidden');
    showLoginModal();
}

// Enter guest mode
function enterGuestMode() {
    isGuestMode = true;
    currentUser = null;
    hideAuthModals();
    showMainApp();
}

// Show main app
function showMainApp() {
    document.getElementById('mainApp').classList.remove('hidden');
    
    const userGreeting = document.getElementById('userGreeting');
    const authButtons = document.getElementById('authButtons');
    
    if (isGuestMode) {
        userGreeting.textContent = translations[appState.currentLanguage].guest_mode_title;
        authButtons.innerHTML = `
            <button onclick="showLoginModal()" class="glass text-white px-4 py-2 rounded-xl hover:bg-white/20 transition-all">
                <span data-translate="login">Login</span>
            </button>
        `;
    } else if (currentUser) {
        userGreeting.textContent = `Welcome, ${currentUser.name}`;
        authButtons.innerHTML = `
            <button onclick="logout()" class="glass text-white px-4 py-2 rounded-xl hover:bg-white/20 transition-all">
                <span data-translate="logout">Logout</span>
            </button>
        `;
    }
    
    // Initialize dashboard
    initDashboard();
}

// Show registration modal
function showRegistrationModal() {
    document.getElementById('registrationModal').classList.remove('hidden');
    document.getElementById('loginModal').classList.add('hidden');
}

// Show login modal
function showLoginModal() {
    document.getElementById('loginModal').classList.remove('hidden');
    document.getElementById('registrationModal').classList.add('hidden');
}

// Hide auth modals
function hideAuthModals() {
    document.getElementById('registrationModal').classList.add('hidden');
    document.getElementById('loginModal').classList.add('hidden');
}

// Show email verification modal
function showEmailVerification() {
    document.getElementById('emailVerificationModal').classList.remove('hidden');
    startResendTimer();
}

// Hide email verification modal
function hideEmailVerification() {
    document.getElementById('emailVerificationModal').classList.add('hidden');
    if (window.appState.resendTimer) {
        clearInterval(window.appState.resendTimer);
        window.appState.resendTimer = null;
    }
}

// Start resend timer
function startResendTimer() {
    const resendButton = document.getElementById('resendButton');
    const countdownElement = document.getElementById('resendCountdown');
    
    if (window.appState.resendTimer) {
        clearInterval(window.appState.resendTimer);
    }
    
    window.appState.resendCountdown = 60;
    resendButton.classList.add('resend-disabled');
    countdownElement.textContent = `(${window.appState.resendCountdown}s)`;
    
    window.appState.resendTimer = setInterval(() => {
        window.appState.resendCountdown--;
        countdownElement.textContent = `(${window.appState.resendCountdown}s)`;
        
        if (window.appState.resendCountdown <= 0) {
            clearInterval(window.appState.resendTimer);
            resendButton.classList.remove('resend-disabled');
            countdownElement.textContent = '';
        }
    }, 1000);
}

// Check referral code
function checkReferralCode() {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    if (refCode) {
        document.getElementById('regReferral').value = refCode;
    }
}

// Update display
function updateDisplay() {
    // This would update UI elements with user data
    console.log('Display updated');
}

// Handle security violations
function handleSecurityViolation(reason) {
    window.appState.suspiciousActions++;
    updateSecurityStatus();
    
    if (window.appState.activityInProgress) {
        resetActivityState();
        showCustomAlert(translations[window.appState.currentLanguage].cheat_detected, 'error');
        playSound('error');
    }
    
    if (currentUser) {
        logSecurityEvent(currentUser.email, reason);
    }
}

// Update security status indicator
function updateSecurityStatus() {
    const securityStatus = document.getElementById('securityStatus');
    if (window.appState.suspiciousActions === 0) {
        securityStatus.className = 'security-status security-active';
        securityStatus.innerHTML = '<i class="fas fa-shield-alt"></i><span>Security Active</span>';
    } else if (window.appState.suspiciousActions < 3) {
        securityStatus.className = 'security-status security-warning';
        securityStatus.innerHTML = `<i class="fas fa-exclamation-triangle"></i><span>${window.appState.suspiciousActions} Suspicious Events</span>`;
    } else {
        securityStatus.className = 'security-status security-alert';
        securityStatus.innerHTML = '<i class="fas fa-skull-crossbones"></i><span>Security Alert!</span>';
    }
}

// Log security events
async function logSecurityEvent(userEmail, reason) {
    try {
        const logData = {
            email: userEmail,
            event: reason,
            timestamp: new Date().toISOString(),
            fingerprint: window.appState.fingerprint,
            suspiciousCount: window.appState.suspiciousActions
        };
        await makeApiCall({
            folder: 'security_logs',
            filename: `${userEmail.replace('@', '_at_').replace('.', '_dot_')}_${Date.now()}.json`,
            content: JSON.stringify(logData)
        });
    } catch (error) {
        console.error('Failed to log security event:', error);
    }
}

// Make API call
async function makeApiCall(data) {
    try {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
        console.log('Making API call with data:', data);
        const response = await fetch('https://script.google.com/macros/s/AKfycbwzeoNtCleXecmpyEpfQMiZxNHizvl84nUipSj1FxTySFVhQrT-3K9Oo_7FiidM5HPL/exec', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const text = await response.text();
        console.log('API Response:', text);
        
        try {
            const jsonResponse = JSON.parse(text);
            return jsonResponse;
        } catch {
            if (text.includes('error') || text.includes('Error')) {
                throw new Error(text);
            }
            return { status: 'success', message: text };
        }
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

// Check for stored login
function checkStoredLogin() {
    const stored = localStorage.getItem('rememberedLogin');
    if (!stored) return false;
    
    try {
        const loginData = JSON.parse(stored);
        // Check if stored login is not older than 30 days
        if (Date.now() - loginData.timestamp > 30 * 24 * 60 * 60 * 1000) {
            localStorage.removeItem('rememberedLogin');
            return false;
        }
        
        // Auto-fill login form
        document.getElementById('loginEmail').value = loginData.email;
        document.getElementById('loginPassword').value = loginData.password;
        document.getElementById('rememberMe').checked = true;
        
        // Auto-login
        login(loginData.email, loginData.password, true);
        return true;
    } catch (error) {
        localStorage.removeItem('rememberedLogin');
        return false;
    }
}

// Document ready
document.addEventListener('DOMContentLoaded', function() {
    checkStoredLogin();
    checkReferralCode();
    setLanguage('en');
});
