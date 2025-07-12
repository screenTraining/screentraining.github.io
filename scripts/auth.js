// Authentication module for index.html
const translations = {
    en: {
        create_account: "Create Account",
        full_name: "Full Name",
        mobile_number: "Mobile Number",
        email: "Gmail Address",
        password: "Password",
        address_optional: "Address (Optional)",
        referral_code: "Referral Code (Optional)",
        register: "Register",
        login: "Login",
        remember_me: "Remember me on this device",
        logout: "Logout",
        continue_guest: "Continue as Guest",
        verify_email: "Verify Your Email",
        verification_sent: "A verification code has been sent to your email. Please check and enter the code.",
        check_spam: "If you don't see it, check your spam folder!",
        verification_required: "Email Verification Required",
        verification_notice: "Please verify your email to start earning coins!",
        verify_now: "Verify Now",
        account_inactive: "Account Deactivated",
        inactive_notice: "Your account has been deactivated. Please contact support.",
        guest_mode_title: "Guest Mode",
        guest_mode_text: "You're browsing as a guest. Register to start earning coins!",
        invalid_credentials: "Invalid login credentials",
        email_exists: "Email already registered",
        mobile_exists: "Mobile number already registered",
        invalid_gmail: "Please use a valid Gmail address",
        invalid_mobile: "Please use a valid international mobile number format",
        registration_success: "Account created successfully! Please verify your email.",
        login_success: "Welcome back!",
        invalid_verification_code: "Invalid verification code",
        verification_resent: "Verification code resent",
        account_deactivated: "Your account has been deactivated",
        activity_completed: "Activity completed! You earned 10 coins.",
        withdraw_success: "Withdrawal request sent via WhatsApp!",
        withdraw_confirm: "Send withdrawal request for {amount} BDT?",
        insufficient_balance: "Insufficient balance for withdrawal (minimum 20 BDT)",
        time_remaining: "Time remaining:",
        seconds: "seconds",
        cheat_detected: "Cheating detected! Activity cancelled.",
        referral_bonus: "Referral bonus applied! +30 coins",
        invalid_referral: "Invalid referral code",
        share_earned: "Share bonus earned! +2 diamonds",
        guest_earning_disabled: "Please register and verify email to earn rewards!",
        insufficient_diamonds_games: "Insufficient diamonds! You need 10 diamonds for games.",
        insufficient_diamonds_videos: "Insufficient diamonds! You need 50 diamonds for videos.",
        daily_unlocked_games: "Games unlocked for today!",
        daily_unlocked_videos: "Videos unlocked for today!",
        suspicious_activity: "Suspicious activity detected!",
        activity_expired: "Activity timer expired.",
        coin_cheat_detected: "Coin cheating detected! Action blocked."
    },
    bn: {
        create_account: "কয়েন আর্নার প্রো",
        full_name: "আপনার পূর্ণ নাম",
        mobile_number: "মোবাইল নম্বর",
        email: "জিমেইল ঠিকানা",
        password: "নিরাপদ পাসওয়ার্ড",
        address_optional: "ঠিকানা (ঐচ্ছিক)",
        referral_code: "রেফারেল কোড (ঐচ্ছিক)",
        register: "নিবন্ধন",
        login: "প্রবেশ",
        remember_me: "এই ডিভাইসে আমাকে মনে রাখুন",
        logout: "বের হন",
        continue_guest: "অতিথি হিসেবে চালিয়ে যান",
        verify_email: "আপনার ইমেইল যাচাই করুন",
        verification_sent: "আপনার ইমেইলে যাচাইকরণ কোড পাঠানো হয়েছে",
        check_spam: "যদি না পান, আপনার স্প্যাম ফোল্ডার চেক করুন!",
        verification_required: "ইমেইল যাচাইকরণ প্রয়োজন",
        verification_notice: "কয়েন অর্জন শুরু করতে আপনার ইমেইল যাচাই করুন!",
        verify_now: "এখনই যাচাই করুন",
        account_inactive: "অ্যাকাউন্ট নিষ্ক্রিয়",
        inactive_notice: "আপনার অ্যাকাউন্ট নিষ্ক্রিয় করা হয়েছে। অনুগ্রহ করে সাপোর্টে যোগাযোগ করুন।",
        guest_mode_title: "অতিথি মোড",
        guest_mode_text: "আপনি অতিথি হিসেবে ব্রাউজ করছেন। নিবন্ধন করে কয়েন অর্জন শুরু করুন!",
        invalid_credentials: "ভুল লগইন তথ্য",
        email_exists: "ইমেইল ইতিমধ্যে নিবন্ধিত",
        mobile_exists: "মোবাইল নম্বর ইতিমধ্যে নিবন্ধিত",
        invalid_gmail: "অনুগ্রহ করে একটি বৈধ জিমেইল ঠিকানা ব্যবহার করুন",
        invalid_mobile: "অনুগ্রহ করে একটি বৈধ আন্তর্জাতিক মোবাইল নম্বর ফরম্যাট ব্যবহার করুন",
        registration_success: "অ্যাকাউন্ট সফলভাবে তৈরি! দয়া করে আপনার ইমেইল যাচাই করুন।",
        login_success: "আবার স্বাগতম!",
        invalid_verification_code: "ভুল যাচাইকরণ কোড",
        verification_resent: "যাচাইকরণ কোড পুনরায় পাঠানো হয়েছে",
        account_deactivated: "আপনার অ্যাকাউন্ট নিষ্ক্রিয় করা হয়েছে",
        activity_completed: "কার্যক্রম সম্পন্ন! আপনি ১০ কয়েন পেয়েছেন।",
        withdraw_success: "উত্তোলনের অনুরোধ হোয়াটস্যাপে পাঠানো হয়েছে!",
        withdraw_confirm: "{amount} টাকার উত্তোলনের অনুরোধ পাঠানো হবেন?",
        insufficient_balance: "উত্তোলনের জন্য অপর্যাপ্ত ব্যালেন্স (সর্বনিম্ন ২০ টাকা)",
        time_remaining: "সময় বাকি:",
        seconds: "সেকেন্ড",
        cheat_detected: "প্রতারণা ধরা পড়েছে! কার্যক্রম বাতিল।",
        referral_bonus: "রেফারেল বোনাস প্রযোগ! +৩০ কয়েন",
        invalid_referral: "ভুল রেফারেল কোড",
        share_earned: "শেয়ার বোনাস অর্জিত! +২ হীরা",
        guest_earning_disabled: "পুরস্কার অর্জনের জন্য নিবন্ধন করে ইমেইল যাচাই করুন!",
        insufficient_diamonds_games: "অপর্যাপ্ত হীরা! গেমের জন্য ১০ হীরা প্রয়োজন।",
        insufficient_diamonds_videos: "অপর্যাপ্ত হীরা! ভিডিওর জন্য ৫০ হীরা প্রয়োজন।",
        daily_unlocked_games: "আজকের জন্য গেম আনলক হয়েছে!",
        daily_unlocked_videos: "আজকের জন্য ভিডিও আনলক হয়েছে!",
        suspicious_activity: "সন্দেহজনক কার্যকলাপ শনাক্ত!",
        activity_expired: "কার্যক্রমের সময় শেষ।",
        coin_cheat_detected: "কয়েন প্রতারণা শনাক্ত! ক্রিয়া ব্লক করা হয়েছে।"
    }
};

// Application state
let currentUser = null;
let isGuestMode = false;
let appState = {
    currentLanguage: 'en',
    activityInProgress: false,
    activityEndTime: 0,
    activityWindow: null,
    activityType: '',
    windowCheckInterval: null,
    activityStartTime: 0,
    pendingVerification: null,
    resendTimer: null,
    resendCountdown: 60,
    lastCoinAddition: 0
};

// Audio elements for sound effects
const audioElements = {
    coinSound: document.getElementById('coinSound'),
    errorSound: document.getElementById('errorSound'),
    successSound: document.getElementById('successSound'),
    warningSound: document.getElementById('warningSound'),
    timerSound: document.getElementById('timerSound')
};

// Enhanced anti-cheat system
let securityState = {
    sessionStart: Date.now(),
    activityMonitoring: false,
    suspiciousActions: 0,
    lastActivity: Date.now(),
    pageBlurCount: 0,
    tabSwitches: 0,
    fingerprint: generateFingerprint(),
    coinIncrementAttempts: 0
};

// Enable audio on user interaction
function enableAudio() {
    if (!audioEnabled) {
        audioEnabled = true;
    }
}

// Generate fingerprint for security
function generateFingerprint() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Security fingerprint', 2, 2);
    
    return btoa(JSON.stringify({
        screen: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        platform: navigator.platform,
        canvas: canvas.toDataURL(),
        timestamp: Date.now()
    }));
}

// Play sound function
function playSound(type) {
    try {
        if (!audioEnabled) return;
        
        const sound = audioElements[type + 'Sound'];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log('Sound play failed:', e));
        }
    } catch (error) {
        console.error('Error playing sound:', error);
    }
}

// Show custom alert
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

// Show custom confirm
function showCustomConfirm(message, callback) {
    document.getElementById('confirmMessage').textContent = message;
    document.getElementById('customConfirm').classList.remove('hidden');
    window.hideCustomConfirm = function(result) {
        document.getElementById('customConfirm').classList.add('hidden');
        callback(result);
    };
}

// Handle security violations
function handleSecurityViolation(reason) {
    securityState.suspiciousActions++;
    updateSecurityStatus();
    
    if (appState.activityInProgress) {
        resetActivityState();
        showCustomAlert(translations[appState.currentLanguage].cheat_detected, 'error');
        playSound('error');
    }
    
    if (currentUser) {
        logSecurityEvent(currentUser.email, reason);
    }
}

// Update security status indicator
function updateSecurityStatus() {
    const securityStatus = document.getElementById('securityStatus');
    if (securityState.suspiciousActions === 0) {
        securityStatus.className = 'security-status security-active';
        securityStatus.innerHTML = '<i class="fas fa-shield-alt"></i><span>Security Active</span>';
    } else if (securityState.suspiciousActions < 3) {
        securityStatus.className = 'security-status security-warning';
        securityStatus.innerHTML = `<i class="fas fa-exclamation-triangle"></i><span>${securityState.suspiciousActions} Suspicious Events</span>`;
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
            fingerprint: securityState.fingerprint,
            suspiciousCount: securityState.suspiciousActions
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

// API call function
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

// Set language
function setLanguage(lang) {
    appState.currentLanguage = lang;
    document.documentElement.lang = lang;
    
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Validate registration data
function validateRegistrationData(name, mobile, email, password) {
    const errors = [];
    if (name.length < 2 || name.length > 50) {
        errors.push('Name must be 2-50 characters');
    }
    if (!/^\+?[1-9]\d{1,14}$/.test(mobile)) {
        errors.push(translations[appState.currentLanguage].invalid_mobile);
    }
    if (!email.toLowerCase().endsWith('@gmail.com') || email.length < 10) {
        errors.push(translations[appState.currentLanguage].invalid_gmail);
    }
    if (password.length < 6) {
        errors.push('Password must be at least 6 characters');
    }
    return errors;
}

// Register user
async function register(name, mobile, email, password, address, referralCode) {
    // Check if email exists
    try {
        const existingEmailUser = await loadUserData('email', email);
        if (existingEmailUser) {
            showCustomAlert(translations[appState.currentLanguage].email_exists, 'error');
            playSound('error');
            return false;
        }
    } catch (error) {
        // User doesn't exist, continue
    }
    
    // Validate and apply referral code
    let referralBonus = 0;
    if (referralCode) {
        const isValidReferral = await validateReferralCode(referralCode);
        if (isValidReferral) {
            referralBonus = 30;
            // Award referrer bonus
            await awardReferralBonus(referralCode, email);
        }
    }
    
    const verificationCode = generateVerificationCode();
    const userData = {
        name: name,
        mobile: mobile,
        email: email,
        password: password,
        address: address,
        coins: 10 + referralBonus,
        diamonds: 0,
        earnings: 0,
        activities: 0,
        referrals: 0,
        referralCode: generateReferralCode(),
        usedReferralCode: referralCode,
        joinDate: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        lastUnlockDate: null,
        dailyUnlockedGames: false,
        dailyUnlockedVideos: false,
        isEmailVerified: false,
        isActive: true,
        verificationCode: verificationCode,
        fingerprint: securityState.fingerprint
    };
    
    try {
        // Save user data first
        const result = await saveUserData(userData);
        console.log('User data saved:', result);
        // Send verification email
        await sendVerificationEmail(userData);
        console.log('Verification email sent');
        appState.pendingVerification = userData;
        hideAuthModals();
        showEmailVerification();
        showCustomAlert(translations[appState.currentLanguage].registration_success, 'success');
        playSound('success');
        return true;
    } catch (error) {
        console.error('Registration process failed:', error);
        showCustomAlert('Registration failed. Please try again.', 'error');
        playSound('error');
        return false;
    }
}

// Login user
async function login(email, password, rememberMe = false) {
    const userData = await loadUserData('email', email);
    if (!userData || userData.password !== password) {
        showCustomAlert(translations[appState.currentLanguage].invalid_credentials, 'error');
        playSound('error');
        return false;
    }
    if (!userData.isActive) {
        showCustomAlert(translations[appState.currentLanguage].account_deactivated, 'error');
        playSound('error');
        return false;
    }
    // Update login data
    userData.lastActivity = new Date().toISOString();
    
    // Migrate old data if needed
    if (userData.dailyUnlockedGames === undefined) {
        userData.dailyUnlockedGames = false;
        userData.dailyUnlockedVideos = false;
        userData.isEmailVerified = userData.isEmailVerified || false;
        userData.isActive = userData.isActive !== false;
    }
    await saveUserData(userData);
    currentUser = userData;
    isGuestMode = false;
    // Save login data if remember me is checked
    if (rememberMe) {
        localStorage.setItem('rememberedLogin', JSON.stringify({
            email: email,
            password: password,
            timestamp: Date.now()
        }));
    }
    hideAuthModals();
    showMainApp();
    showCustomAlert(translations[appState.currentLanguage].login_success, 'success');
    playSound('success');
    return true;
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

// Verify email
function verifyEmail() {
    const code = document.getElementById('verificationCode').value.trim();
    
    if (!appState.pendingVerification) {
        showCustomAlert('No pending verification', 'error');
        playSound('error');
        return;
    }
    if (!code || code.length !== 6) {
        showCustomAlert('Please enter a valid 6-digit code', 'error');
        playSound('error');
        return;
    }
    if (code === appState.pendingVerification.verificationCode) {
        appState.pendingVerification.isEmailVerified = true;
        
        try {
            saveUserData(appState.pendingVerification);
            
            currentUser = appState.pendingVerification;
            isGuestMode = false;
            appState.pendingVerification = null;
            
            hideEmailVerification();
            showMainApp();
            showCustomAlert(translations[appState.currentLanguage].verification_success, 'success');
            playSound('success');
        } catch (error) {
            console.error('Failed to save verified user data:', error);
            showCustomAlert('Verification failed. Please try again.', 'error');
            playSound('error');
        }
    } else {
        showCustomAlert(translations[appState.currentLanguage].invalid_verification_code, 'error');
        playSound('error');
    }
}

// Resend verification code
function resendVerification() {
    if (appState.resendCountdown > 0) {
        return;
    }
    const resendButton = document.getElementById('resendButton');
    resendButton.classList.add('resend-disabled');
    resendButton.innerHTML = '<div class="spinner"></div> Sending...';
    
    try {
        if (appState.pendingVerification) {
            appState.pendingVerification.verificationCode = generateVerificationCode();
            saveUserData(appState.pendingVerification);
            sendVerificationEmail(appState.pendingVerification);
            showCustomAlert(translations[appState.currentLanguage].verification_resent, 'success');
            playSound('success');
        }
    } catch (error) {
        console.error('Failed to resend verification:', error);
        showCustomAlert('Failed to resend verification code', 'error');
        playSound('error');
    } finally {
        startResendTimer();
    }
}

// Start resend timer
function startResendTimer() {
    const resendButton = document.getElementById('resendButton');
    const countdownElement = document.getElementById('resendCountdown');
    
    if (appState.resendTimer) {
        clearInterval(appState.resendTimer);
    }
    
    appState.resendCountdown = 60;
    resendButton.classList.add('resend-disabled');
    countdownElement.textContent = `(${appState.resendCountdown}s)`;
    
    appState.resendTimer = setInterval(() => {
        appState.resendCountdown--;
        countdownElement.textContent = `(${appState.resendCountdown}s)`;
        
        if (appState.resendCountdown <= 0) {
            clearInterval(appState.resendTimer);
            resendButton.classList.remove('resend-disabled');
            countdownElement.textContent = '';
        }
    }, 1000);
}

// Enter guest mode
function enterGuestMode() {
    isGuestMode = true;
    hideAuthModals();
    showMainApp();
}

// Generate verification code
function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Generate referral code
function generateReferralCode() {
    return 'REF' + Math.random().toString(36).substring(2, 8).toUpperCase() + Date.now().toString().slice(-3);
}

// Check referral code
function checkReferralCode() {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    if (refCode) {
        document.getElementById('regReferral').value = refCode;
    }
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

// Initialize dashboard
function initDashboard() {
    // This would normally load user data and initialize the dashboard
    console.log('Dashboard initialized');
}

// Load user data
async function loadUserData(field, value) {
    try {
        let filename;
        if (field === 'email') {
            filename = value.replace('@', '_at_').replace('.', '_dot_') + '.json';
        } else {
            return null;
        }
        console.log('Loading user data for:', filename);
        const response = await fetch(`https://script.google.com/macros/s/AKfycbwzeoNtCleXecmpyEpfQMiZxNHizvl84nUipSj1FxTySFVhQrT-3K9Oo_7FiidM5HPL/exec?folder=users&filename=${filename}`, {
            method: 'GET'
        });
        
        if (!response.ok) {
            console.log('User not found or network error');
            return null;
        }
        
        const text = await response.text();
        console.log('Load response:', text);
        
        if (text.includes('error') || text.includes('not found') || text.includes('Missing')) {
            return null;
        }
        
        return JSON.parse(text);
    } catch (error) {
        console.error('Load error:', error);
        return null;
    }
}

// Save user data
async function saveUserData(userData) {
    try {
        console.log('Saving user data:', userData);
        
        const result = await makeApiCall({
            folder: 'users',
            filename: userData.email.replace('@', '_at_').replace('.', '_dot_') + '.json',
            content: JSON.stringify(userData, null, 2)
        });
        
        console.log('Save result:', result);
        return { status: 'success' };
    } catch (error) {
        console.error('Save error:', error);
        throw error;
    }
}

// Send verification email
async function sendVerificationEmail(userData) {
    try {
        const emailSubject = 'Email Verification - Coin Earner Pro';
        const emailBody = `
Dear ${userData.name},
Thank you for registering with Coin Earner Pro!
Your email verification code is: ${userData.verificationCode}
Please enter this code in the app to verify your email address.
If you didn't register for this account, please ignore this email.
Best regards,
Coin Earner Pro Team
        `;
        const htmlBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #667eea;">Email Verification - Coin Earner Pro</h2>
                <p>Dear ${userData.name},</p>
                <p>Thank you for registering with Coin Earner Pro!</p>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
                    <p style="margin: 0; font-size: 16px;">Your verification code is:</p>
                    <h1 style="color: #667eea; font-size: 32px; margin: 10px 0; letter-spacing: 4px;">${userData.verificationCode}</h1>
                </div>
                <p>Please enter this code in the app to verify your email address.</p>
                <p>If you didn't register for this account, please ignore this email.</p>
                <p style="color: #666; font-size: 14px; margin-top: 20px;">If you don't see it, check your spam folder!</p>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                <p style="color: #666; font-size: 14px;">Best regards,<br>Coin Earner Pro Team</p>
            </div>
        `;
        await makeApiCall({
            folder: 'emails',
            filename: `verification_${userData.email.replace('@', '_at_').replace('.', '_dot_')}_${Date.now()}.txt`,
            content: emailBody,
            sendMail: 'true',
            to: userData.email,
            subject: emailSubject,
            body: emailBody,
            htmlBody: htmlBody
        });
        console.log('Verification email sent successfully');
    } catch (error) {
        console.error('Failed to send verification email:', error);
        throw new Error('Failed to send verification email');
    }
}

// Validate referral code
async function validateReferralCode(code) {
    try {
        // Simple validation - check format
        return code.startsWith('REF') && code.length >= 9;
    } catch (error) {
        return false;
    }
}

// Award referral bonus
async function awardReferralBonus(referralCode, newUserEmail) {
    console.log(`Awarding referral bonus for code: ${referralCode} to new user: ${newUserEmail}`);
    // In real implementation, find user with referralCode and award bonus
}

// Document ready
document.addEventListener('DOMContentLoaded', function() {
    checkStoredLogin();
    checkReferralCode();
    setLanguage('en');
});
