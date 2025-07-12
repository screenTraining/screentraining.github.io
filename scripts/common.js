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

// Activity tracking
function startActivity(type, url) {
    // Activity logic would go here
    console.log('Starting activity:', type, 'URL:', url);
}

// User authentication
function logout() {
    window.location.href = 'index.html';
}

// ... other common functions
