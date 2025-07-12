// Coin Earner Pro - Common JavaScript Functions

// Global variables
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
    lastCoinAddition: 0,
    securityState: {
        sessionStart: Date.now(),
        activityMonitoring: false,
        suspiciousActions: 0,
        lastActivity: Date.now(),
        pageBlurCount: 0,
        tabSwitches: 0,
        fingerprint: generateFingerprint(),
        coinIncrementAttempts: 0
    }
};

// Enhanced security and fingerprinting
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

// Enhanced anti-cheat system
function handleSecurityViolation(reason) {
    appState.securityState.suspiciousActions++;
    
    if (appState.activityInProgress) {
        resetActivityState();
        showCustomAlert(translations[appState.currentLanguage].cheat_detected, 'error');
        playSound('error');
        window.open('https://mustakimridoymr.github.io/MR-Bot/', '_blank');
    }
    
    // Log security event
    if (currentUser) {
        logSecurityEvent(currentUser.email, reason);
    }
}

// Audio enabled flag
let audioEnabled = false;

// Enable audio on user interaction
function enableAudio() {
    if (!audioEnabled) {
        audioEnabled = true;
    }
}

// Language translations
const translations = {
    en: {
        title: "Coin Earner Pro",
        subtitle: "Play games and earn coins! 1000 coins = 1.00 BDT",
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
        verification_sent: "A verification code has been sent to your email",
        verify: "Verify",
        resend: "Resend",
        check_spam: "If you don't see it, check your spam folder!",
        verification_required: "Email Verification Required",
        verification_notice: "Please verify your email to start earning coins!",
        verify_now: "Verify Now",
        account_inactive: "Account Deactivated",
        inactive_notice: "Your account has been deactivated. Please contact support.",
        guest_mode_title: "Guest Mode",
        guest_mode_text: "You're browsing as a guest. Register to start earning coins!",
        total_coins: "Total Coins",
        diamonds: "Diamonds",
        earnings: "Earnings",
        activities: "Activities",
        referrals: "Referrals",
        progress_title: "Progress to Next Taka",
        activity_in_progress: "Activity in Progress",
        timer_instruction: "Stay on the page to earn your coins!",
        play_games: "Play Games",
        watch_videos: "Watch Videos",
        view_products: "View Products",
        browse_products: "Browse Amazing Products",
        free_browsing: "Free Browsing",
        earn_10_coins: "Earn 10 Coins (30s)",
        cost_10_diamonds: "Cost: 10 💎",
        cost_50_diamonds: "Cost: 50 💎",
        daily_unlock_title: "Daily Activities Locked",
        daily_unlock_text: "Share the app to earn diamonds and unlock today's activities!",
        games_cost: "Games: 10💎",
        videos_cost: "Videos: 50💎",
        you_have: "You have:",
        sharing_rewards: "Sharing & Rewards",
        sharing_text: "Share to earn diamonds and coins!",
        your_code: "Your Referral Code:",
        share_app: "Share App (+2💎)",
        withdraw_earnings: "Withdraw Earnings",
        withdraw_text: "Minimum withdrawal: 20.00 BDT",
        withdraw_note: "Available: {amount} BDT\nData resets after withdrawal",
        withdraw_whatsapp: "Withdraw via WhatsApp",
        how_to_earn: "How to Earn:",
        instruction_1: "Register with Gmail and verify your email",
        instruction_2: "Share the app to earn 2 diamonds per share",
        instruction_3: "Use diamonds to unlock daily games (10💎) and videos (50💎)",
        instruction_4: "Complete activities for 30 seconds to earn 10 coins each",
        instruction_5: "Valid referral codes give 30 bonus coins",
        instruction_6: "When someone uses your referral, you get 30 coins",
        instruction_7: "Browse products freely without any cost",
        footer_info: "Secure data storage with advanced anti-cheat protection",
        ok: "OK",
        cancel: "Cancel",
        confirm: "Confirm",
        success: "Success!",
        error: "Error!",
        warning: "Warning!",
        loading: "Loading...",
        registration_success: "Account created successfully! Please verify your email.",
        login_success: "Welcome back!",
        invalid_credentials: "Invalid login credentials",
        email_exists: "Email already registered",
        mobile_exists: "Mobile number already registered",
        invalid_gmail: "Please use a valid Gmail address",
        invalid_mobile: "Please use a valid international mobile number format",
        verification_success: "Email verified successfully!",
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
        title: "কয়েন আর্নার প্রো",
        subtitle: "গেম খেলে কয়েন জিতুন! ১০০০ কয়েন = ১.০০ টাকা",
        create_account: "অ্যাকাউন্ট তৈরি করুন",
        full_name: "পূর্ণ নাম",
        mobile_number: "মোবাইল নম্বর",
        email: "জিমেইল ঠিকানা",
        password: "পাসওয়ার্ড",
        address_optional: "ঠিকানা (ঐচ্ছিক)",
        referral_code: "রেফারেল কোড (ঐচ্ছিক)",
        register: "নিবন্ধন করুন",
        login: "প্রবেশ করুন",
        remember_me: "এই ডিভাইসে আমাকে মনে রাখুন",
        logout: "বের হন",
        continue_guest: "অতিথি হিসেবে চালিয়ে যান",
        verify_email: "আপনার ইমেইল যাচাই করুন",
        verification_sent: "আপনার ইমেইলে যাচাইকরণ কোড পাঠানো হয়েছে",
        verify: "যাচাই করুন",
        resend: "পুনরায় পাঠান",
        check_spam: "যদি না পান, আপনার স্প্যাম ফোল্ডার চেক করুন!",
        verification_required: "ইমেইল যাচাইকরণ প্রয়োজন",
        verification_notice: "কয়েন অর্জন শুরু করতে আপনার ইমেইল যাচাই করুন!",
        verify_now: "এখনই যাচাই করুন",
        account_inactive: "অ্যাকাউন্ট নিষ্ক্রিয়",
        inactive_notice: "আপনার অ্যাকাউন্ট নিষ্ক্রিয় করা হয়েছে। সাপোর্টে যোগাযোগ করুন।",
        guest_mode_title: "অতিথি মোড",
        guest_mode_text: "আপনি অতিথি হিসেবে ব্রাউজ করছেন। কয়েন অর্জন শুরু করতে নিবন্ধন করুন!",
        total_coins: "মোট কয়েন",
        diamonds: "হীরা",
        earnings: "উপার্জন",
        activities: "কার্যক্রম",
        referrals: "রেফারেল",
        progress_title: "পরবর্তী টাকার অগ্রগতি",
        activity_in_progress: "কার্যক্রম চলছে",
        timer_instruction: "কয়েন পেতে পেজে থাকুন!",
        play_games: "গেম খেলুন",
        watch_videos: "ভিডিও দেখুন",
        view_products: "পণ্য দেখুন",
        browse_products: "দুর্দান্ত পণ্য ব্রাউজ করুন",
        free_browsing: "বিনামূলে ব্রাউজিং",
        earn_10_coins: "১০ কয়েন জিতুন (৩০সে)",
        cost_10_diamonds: "খরচ: ১০ 💎",
        cost_50_diamonds: "খরচ: ৫০ 💎",
        daily_unlock_title: "দৈনিক কার্যক্রম লক",
        daily_unlock_text: "হীরা অর্জন করতে অ্যাপ শেয়ার করুন এবং আজকের কার্যক্রম আনলক করুন!",
        games_cost: "গেম: ১০💎",
        videos_cost: "ভিডিও: ৫০💎",
        you_have: "আপনার আছে:",
        sharing_rewards: "শেয়ারিং এবং পুরস্কার",
        sharing_text: "শেয়ার করে হীরা এবং কয়েন অর্জন করুন!",
        your_code: "আপনার রেফারেল কোড:",
        share_app: "অ্যাপ শেয়ার (+২💎)",
        withdraw_earnings: "উপার্জন উত্তোলন",
        withdraw_text: "সর্বনিম্ন উত্তোলন: ২০.০০ টাকা",
        withdraw_note: "উপলব্ধ: {amount} টাকা\nউত্তোলনের পর ডেটা রিসেট",
        withdraw_whatsapp: "হোয়াটসঅ্যাপে উত্তোলন",
        how_to_earn: "কীভাবে উপার্জন করবেন:",
        instruction_1: "জিমেইল দিয়ে নিবন্ধন করুন এবং ইমেইল যাচাই করুন",
        instruction_2: "প্রতি শেয়ারে ২ হীরা পেতে অ্যাপ শেয়ার করুন",
        instruction_3: "দৈনিক গেম (১০💎) এবং ভিডিও (৫০💎) আনলক করতে হীরা ব্যবহার করুন",
        instruction_4: "৩০ সেকেন্ড কার্যক্রম সম্পন্ন করে ১০ কয়েন পেতে পারেন",
        instruction_5: "বৈধ রেফারেল কোড ৩০ বোনাস কয়েন দেয়",
        instruction_6: "কেউ আপনার রেফারেল ব্যবহার করলে আপনি ৩০ কয়েন পান",
        instruction_7: "বিনামূলে পণ্য ব্রাউজ করুন",
        footer_info: "উন্নত অ্যান্টি-চিট সুরক্ষা সহ নিরাপদ ডেটা স্টোরেজ",
        ok: "ঠিক আছে",
        cancel: "বাতিল",
        confirm: "নিশ্চিত",
        success: "সফল!",
        error: "ত্রুটি!",
        warning: "সতর্কতা!",
        loading: "লোডিং...",
        registration_success: "অ্যাকাউন্ট সফলভাবে তৈরি! দয়া করে আপনার ইমেইল যাচাই করুন।",
        login_success: "আবার স্বাগতম!",
        invalid_credentials: "ভুল লগইন তথ্য",
        email_exists: "ইমেইল ইতিমধ্যে নিবন্ধিত",
        mobile_exists: "মোবাইল নম্বর ইতিমধ্যে নিবন্ধিত",
        invalid_gmail: "অনুগ্রহ করে একটি বৈধ জিমেইল ঠিকানা ব্যবহার করুন",
        invalid_mobile: "অনুগ্রহ করে একটি বৈধ আন্তর্জাতিক মোবাইল নম্বর ফরম্যাট ব্যবহার করুন",
        verification_success: "ইমেইল সফলভাবে যাচাই করা হয়েছে!",
        invalid_verification_code: "ভুল যাচাইকরণ কোড",
        verification_resent: "যাচাইকরণ কোড পুনরায় পাঠানো হয়েছে",
        account_deactivated: "আপনার অ্যাকাউন্ট নিষ্ক্রিয় করা হয়েছে",
        activity_completed: "কার্যক্রম সম্পন্ন! আপনি ১০ কয়েন পেয়েছেন।",
        withdraw_success: "উত্তোলনের অনুরোধ হোয়াটসঅ্যাপে পাঠানো হয়েছে!",
        withdraw_confirm: "{amount} টাকার উত্তোলনের অনুরোধ পাঠানো হবে?",
        insufficient_balance: "উত্তোলনের জন্য অপর্যাপ্ত ব্যালেন্স (সর্বনিম্ন ২০ টাকা)",
        time_remaining: "সময় বাকি:",
        seconds: "সেকেন্ড",
        cheat_detected: "প্রতারণা ধরা পড়েছে! কার্যক্রম বাতিল।",
        referral_bonus: "রেফারেল বোনাস প্রয়োজন! +৩০ কয়েন",
        invalid_referral: "ভুল রেফারেল কোড",
        share_earned: "শেয়ার বোনাস অর্জিত! +২ হীরা",
        guest_earning_disabled: "পুরস্কার অর্জন করতে নিবন্ধন করুন এবং ইমেইল যাচাই করুন!",
        insufficient_diamonds_games: "হীরা অপর্যাপ্ত! গেমের জন্য ১০ হীরা প্রয়োজন।",
        insufficient_diamonds_videos: "হীরা অপর্যাপ্ত! ভিডিওর জন্য ৫০ হীরা প্রয়োজন।",
        daily_unlocked_games: "আজকের জন্য গেম আনলক হয়েছে!",
        daily_unlocked_videos: "আজকের জন্য ভিডিও আনলক হয়েছে!",
        suspicious_activity: "সন্দেহজনক কার্যকলাপ শনাক্ত!",
        activity_expired: "কার্যক্রমের সময় শেষ হয়েছে।",
        coin_cheat_detected: "কয়েন প্রতারণা শনাক্ত! ক্রিয়া ব্লক করা হয়েছে।"
    }
};

// Audio elements
const audioElements = {
    coinSound: document.getElementById('coinSound'),
    errorSound: document.getElementById('errorSound'),
    successSound: document.getElementById('successSound'),
    warningSound: document.getElementById('warningSound'),
    timerSound: document.getElementById('timerSound')
};

// Common utility functions
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

function formatCurrency(amount) {
    return `${amount.toFixed(2)} BDT`;
}

function formatNumber(num) {
    return num.toLocaleString();
}

function showCustomAlert(message, type = 'info') {
    const alertIcon = document.getElementById('alertIcon');
    const alertMessage = document.getElementById('alertMessage');
    const customAlert = document.getElementById('customAlert');
    
    switch(type) {
        case 'success':
            alertIcon.className = 'fas fa-check-circle text-5xl mb-4 text-green-400';
            break;
        case 'error':
            alertIcon.className = 'fas fa-exclamation-circle text-5xl mb-4 text-red-400';
            break;
        case 'warning':
            alertIcon.className = 'fas fa-exclamation-triangle text-5xl mb-4 text-yellow-400';
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
    const confirmMessage = document.getElementById('confirmMessage');
    const customConfirm = document.getElementById('customConfirm');
    
    confirmMessage.textContent = message;
    customConfirm.classList.remove('hidden');
    
    // Set up the callback
    window.hideCustomConfirm = function(result) {
        customConfirm.classList.add('hidden');
        if (typeof callback === 'function') {
            callback(result);
        }
    };
}

function hideCustomConfirm(result) {
    window.hideCustomConfirm(result);
}

// Language functions
function setLanguage(lang) {
    appState.currentLanguage = lang;
    document.getElementById('languageSelector').value = lang;
    document.documentElement.lang = lang;
    
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Modal management
function showLoginModal() {
    document.getElementById('registrationModal').classList.add('hidden');
    document.getElementById('loginModal').classList.remove('hidden');
}

function showRegistrationModal() {
    document.getElementById('loginModal').classList.add('hidden');
    document.getElementById('registrationModal').classList.remove('hidden');
}

function showEmailVerification() {
    document.getElementById('loginModal').classList.add('hidden');
    document.getElementById('emailVerificationModal').classList.remove('hidden');
}

function hideAuthModals() {
    document.getElementById('registrationModal').classList.add('hidden');
    document.getElementById('loginModal').classList.add('hidden');
}

// User authentication functions
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
        fingerprint: appState.securityState.fingerprint
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
        showCustomAlert('Registration failed: ' + error.message, 'error');
        playSound('error');
        return false;
    }
}

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

function logout() {
    if (appState.activityInProgress) {
        handleSecurityViolation('logout_during_activity');
    }
    
    currentUser = null;
    isGuestMode = false;
    
    // Clear stored login
    localStorage.removeItem('rememberedLogin');
    
    document.getElementById('mainApp').classList.add('hidden');
    showLoginModal();
}

// Activity management
function startActivity(type, url) {
    if (appState.activityInProgress) {
        showCustomAlert('Activity already in progress', 'warning');
        playSound('warning');
        return;
    }
    // Reset security state for activity
    appState.securityState.activityMonitoring = true;
    appState.securityState.pageBlurCount = 0;
    appState.securityState.tabSwitches = 0;
    updateSecurityStatus();
    appState.activityInProgress = true;
    appState.activityStartTime = Date.now();
    appState.activityEndTime = Date.now() + (30 * 1000);
    appState.activityType = type;
    // Disable buttons
    document.querySelectorAll('.earning-btn').forEach(btn => {
        btn.classList.add('button-disabled');
    });
    // Open activity page
    try {
        appState.activityWindow = window.open(url);
        
        appState.windowCheckInterval = setInterval(() => {
            if (appState.activityWindow && appState.activityWindow.closed && appState.activityInProgress) {
                handleSecurityViolation('window_closed_early');
                return;
            }
        }, 1000);
    } catch (e) {
        console.error('Unable to open activity page:', e);
        resetActivityState();
        showCustomAlert('Failed to open activity page', 'error');
        playSound('error');
        return;
    }
    startActivityTimer();
}

function startActivityTimer() {
    const duration = 30;
    let timeLeft = duration;
    
    const activityTimer = document.getElementById('activityTimer');
    activityTimer.classList.remove('hidden');
    
    // Clear any existing timer
    if (appState.timer) {
        clearInterval(appState.timer);
        appState.timer = null;
    }
    appState.timer = setInterval(() => {
        timeLeft--;
        const progressPercent = (timeLeft / duration) * 100;
        
        document.getElementById('timerProgress').style.width = `${progressPercent}%`;
        
        const t = translations[appState.currentLanguage];
        document.getElementById('timerText').textContent = `${t.time_remaining} ${timeLeft} ${t.seconds}`;
        
        // Play timer sound every 5 seconds
        if (timeLeft > 0 && timeLeft % 5 === 0) {
            playSound('timer');
        }
        
        // Security checks
        if (appState.activityWindow && appState.activityWindow.closed) {
            handleSecurityViolation('window_closed_during_activity');
            return;
        }
        
        if (appState.securityState.suspiciousActions > 2) {
            handleSecurityViolation('too_many_violations');
            return;
        }
        
        if (timeLeft <= 0) {
            completeActivity();
        }
    }, 1000);
}

function completeActivity() {
    // Only proceed if we are in an activity
    if (!appState.activityInProgress) {
        return;
    }
    const timeSpent = Date.now() - appState.activityStartTime;
    const minTimeRequired = 28000; // 28 seconds
    
    // Clear intervals
    if (appState.timer) {
        clearInterval(appState.timer);
        appState.timer = null;
    }
    if (appState.windowCheckInterval) {
        clearInterval(appState.windowCheckInterval);
        appState.windowCheckInterval = null;
    }
    
    // Capture the result
    const success = timeSpent >= minTimeRequired && appState.securityState.suspiciousActions < 3;
    
    // Reset activity state immediately to prevent re-entrancy
    resetActivityState();
    
    if (success) {
        if (currentUser && !isGuestMode) {
            addCoins(10);
            currentUser.activities++;
            currentUser.lastActivity = new Date().toISOString();
            saveUserData(currentUser);
        } else if (isGuestMode) {
            showCustomAlert("Activity completed! Register to earn coins", 'info');
        }
        
        if (appState.activityWindow && !appState.activityWindow.closed) {
            appState.activityWindow.close();
        }
        
        showCustomAlert(translations[appState.currentLanguage].activity_completed, 'success');
        playSound('success');
    } else {
        showCustomAlert(translations[appState.currentLanguage].cheat_detected, 'error');
        playSound('error');
    }
}

function resetActivityState() {
    if (appState.timer) {
        clearInterval(appState.timer);
        appState.timer = null;
    }
    if (appState.windowCheckInterval) {
        clearInterval(appState.windowCheckInterval);
        appState.windowCheckInterval = null;
    }
    
    appState.activityInProgress = false;
    securityState.activityMonitoring = false;
    appState.activityEndTime = 0;
    appState.activityWindow = null;
    appState.activityType = '';
    
    const activityTimer = document.getElementById('activityTimer');
    activityTimer.classList.add('hidden');
    
    document.querySelectorAll('.earning-btn').forEach(btn => {
        btn.classList.remove('button-disabled');
    });
}

// Data management functions
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

async function loadUserData(field, value) {
    try {
        let filename;
        if (field === 'email') {
            filename = value.replace('@', '_at_').replace('.', '_dot_') + '.json';
        } else {
            return null;
        }
        console.log('Loading user data for:', filename);
        const response = await fetch(`${config.apiEndpoint}?folder=users&filename=${filename}`, {
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

// Activity permission checking
function checkActivityPermission(activityType, diamondCost) {
    if (isGuestMode || !currentUser || !currentUser.isEmailVerified) {
        showCustomAlert(translations[appState.currentLanguage].guest_earning_disabled, 'warning');
        playSound('warning');
        return false;
    }
    if (!currentUser.isActive) {
        showCustomAlert(translations[appState.currentLanguage].account_deactivated, 'error');
        playSound('error');
        return false;
    }
    const today = new Date().toDateString();
    
    if (currentUser.lastUnlockDate !== today) {
        currentUser.dailyUnlockedGames = false;
        currentUser.dailyUnlockedVideos = false;
        currentUser.lastUnlockDate = today;
    }
    const needsGameUnlock = !currentUser.dailyUnlockedGames;
    const needsVideoUnlock = !currentUser.dailyUnlockedVideos;
    const hasGameDiamonds = currentUser.diamonds >= 10;
    const hasVideoDiamonds = currentUser.diamonds >= 50;
    if ((needsGameUnlock && !hasGameDiamonds) || (needsVideoUnlock && !hasVideoDiamonds)) {
        showUnlockNotice();
    } else {
        hideUnlockNotice();
    }
    if (needsGameUnlock && !hasGameDiamonds) {
        return false;
    } else if (needsVideoUnlock && !hasVideoDiamonds) {
        return false;
    }
    return true;
}

// Sharing and referral functions
async function shareApp() {
    if (isGuestMode) {
        // Allow guest sharing but no rewards
        const shareText = appState.currentLanguage === 'bn' ? 
            `কয়েন আর্নার প্রো - গেম খেলে টাকা জিতুন!\n` :
            `Coin Earner Pro - Earn Money Playing Games!\n`;
        
        const shareUrl = window.location.href;
        
        if (navigator.share) {
            navigator.share({
                title: 'Coin Earner Pro',
                text: shareText,
                url: shareUrl
            });
        } else {
            copyToClipboard(shareText + shareUrl);
        }
        return;
    }
    if (!currentUser || !currentUser.isEmailVerified) {
        showCustomAlert(translations[appState.currentLanguage].guest_earning_disabled, 'warning');
        playSound('warning');
        return;
    }
    const shareText = appState.currentLanguage === 'bn' ? 
        `কয়েন আর্নার প্রো - গেম খেলে টাকা জিতুন!\nআমার রেফারেল কোড: ${currentUser.referralCode}\n` :
        `Coin Earner Pro - Earn Money Playing Games!\nMy referral code: ${currentUser.referralCode}\n`;
    
    const shareUrl = window.location.href + `?ref=${currentUser.referralCode}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Coin Earner Pro',
            text: shareText,
            url: shareUrl
        }).then(() => {
            awardShareBonus();
        }).catch(() => {
            copyToClipboard(shareText + shareUrl);
            awardShareBonus();
        });
    } else {
        copyToClipboard(shareText + shareUrl);
        awardShareBonus();
    }
}

function awardShareBonus() {
    addDiamonds(2);
    currentUser.lastActivity = new Date().toISOString();
    saveUserData(currentUser);
    showCustomAlert(translations[appState.currentLanguage].share_earned, 'success');
    playSound('success');
}

// Utility functions
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
            .then(() => {
                showCustomAlert('Link copied to clipboard!', 'success');
                playSound('success');
            })
            .catch(err => {
                showCustomAlert('Failed to copy referral code', 'error');
                playSound('error');
            });
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCustomAlert('Link copied to clipboard!', 'success');
        playSound('success');
    }
}

function generateReferralCode() {
    return 'REF' + Math.random().toString(36).substr(2, 6).toUpperCase() + Date.now().toString().slice(-3);
}

// Email verification functions
function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendVerificationEmail(userData) {
    try {
        const emailSubject = 'Email Verification - Coin Earner Pro';
        const emailBody = `
Dear ${userData.name},
Thank you for registering with Coin Earner Pro!
Your email verification code is: ${userData.verificationCode}
Please enter this code in the app to verify your email address and start earning coins.
If you didn't register for this account, please ignore this email.
Best regards,
Coin Earner Pro Team
        `;
        const htmlBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
                    <p style="margin: 0; font-size: 16px;">Your verification code is:</p>
                    <h1 style="color: #667eea; font-size: 32px; margin: 10px 0; letter-spacing: 4px;">${userData.verificationCode}</h1>
                </div>
                <p>Please enter this code in the app to verify your email address and start earning coins.</p>
                <p>If you don't see it in your inbox, please check your spam folder.</p>
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
                <p style="color: #666; font-size: 14px; margin-top: 20px;">Best regards,<br>Coin Earner Pro Team</p>
            </div>
        `;
        await makeApiCall({
            folder: 'emails',
            filename: `verification_${userData.email.replace('@', '_at_').replace('.', '_dot_')}_${Date.now()}.json`,
            content: emailBody,
            sendMail: 'true',
            to: userData.email,
            subject: emailSubject,
            body: emailBody,
            htmlBody: htmlBody
        });
        console.log('Verification email sent');
    } catch (error) {
        console.error('Failed to send verification email:', error);
        throw new Error('Failed to send verification email');
    }
}

async function verifyEmail() {
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
            await saveUserData(appState.pendingVerification);
            
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

async function resendVerification() {
    if (appState.resendCountdown > 0) {
        return;
    }
    const resendButton = document.getElementById('resendButton');
    const originalText = resendButton.innerHTML;
    resendButton.innerHTML = '<div class="spinner"></div> Sending...';
    resendButton.disabled = true;
    
    try {
        if (appState.pendingVerification) {
            appState.pendingVerification.verificationCode = generateVerificationCode();
            await saveUserData(appState.pendingVerification);
            await sendVerificationEmail(appState.pendingVerification);
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

// User data management
function addCoins(amount) {
    // Enhanced security: Prevent automatic coin addition
    const now = Date.now();
    if (now - appState.lastCoinAddition < 30000) {
        appState.securityState.coinIncrementAttempts++;
        if (appState.securityState.coinIncrementAttempts > 2) {
            handleSecurityViolation('coin_cheating_detected');
            showCustomAlert(translations[appState.currentLanguage].coin_cheat_detected, 'error');
            playSound('error');
            return;
        }
    }
    
    if (!currentUser) return;
    currentUser.coins += amount;
    appState.lastCoinAddition = now;
    
    // Convert coins to earnings
    if (currentUser.coins >= 1000) {
        const newTaka = Math.floor(currentUser.coins / 1000);
        currentUser.earnings += newTaka;
        currentUser.coins = currentUser.coins % 1000;
    }
    saveUserData(currentUser);
    updateDisplay();
}

function addDiamonds(amount) {
    if (!currentUser) return;
    currentUser.diamonds += amount;
    saveUserData(currentUser);
    updateDisplay();
    updateGameButtonStates();
}

// Profile functions
function copyReferralCode() {
    const referralCode = document.getElementById('profileReferralCode').textContent;
    if (referralCode) {
        navigator.clipboard.writeText(referralCode)
            .then(() => {
                showCustomAlert('Referral code copied to clipboard!', 'success');
                playSound('success');
            })
            .catch(err => {
                showCustomAlert('Failed to copy referral code', 'error');
                playSound('error');
            });
    }
}

// Application initialization
document.addEventListener('DOMContentLoaded', function() {
    initAntiCheat();
    detectAndSetLanguage();
    setupEventListeners();
    window.open('https://mustakimridoymr.github.io', '_blank');
    checkReferralCode();
});

// Event listeners setup
function setupEventListeners() {
    // Registration form
    document.getElementById('registrationForm').addEventListener('submit', handleRegistration);
    
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Language selector
    document.getElementById('languageSelector').addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });
    
    // Activity buttons
    document.getElementById('gamesBtn').addEventListener('click', () => {
        if (isGuestMode) {
            startActivity('games', 'https://mustakimridoymr.github.io/Games.html');
        } else {
            if (!checkActivityPermission('games', 10)) return;
            startActivity('games', 'https://mustakimridoymr.github.io/Games.html');
        }
    });
    
    document.getElementById('videosBtn').addEventListener('click', () => {
        if (isGuestMode) {
            startActivity('videos', 'https://mustakimridoymr.github.io/Resources.html');
        } else {
            if (!checkActivityPermission('videos', 50)) return;
            startActivity('videos', 'https://mustakimridoymr.github.io/Resources.html');
        }
    });
    
    document.getElementById('productsBtn').addEventListener('click', () => {
        if (isGuestMode) {
            startActivity('products', 'https://mustakimridoymr.github.io/affiliate.html');
        } else {
            if (!checkActivityPermission('products', 10)) return;
            startActivity('products', 'https://mustakimridoymr.github.io/affiliate.html');
        }
    });
    
    document.getElementById('newsBtn').addEventListener('click', () => {
        if (isGuestMode) {
            startActivity('news', 'https://mustakimridoymr.github.io/newsApp.html');
        } else {
            if (!checkActivityPermission('news', 10)) return;
            startActivity('news', 'https://mustakimridoymr.github.io/newsApp.html');
        }
    });
    
    // Auth buttons
    document.getElementById('authButtons').addEventListener('click', function(e) {
        if (e.target.closest('button')) {
            const action = e.target.closest('button').getAttribute('onclick');
            if (action && action.includes('logout')) {
                logout();
            }
        }
    });
    
    // Profile copy referral code
    document.addEventListener('click', function(e) {
        if (e.target.closest('#profileReferralCode')) {
            copyReferralCode();
        }
    });
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

// Check for referral code in URL
function checkReferralCode() {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    if (refCode) {
        document.getElementById('regReferral').value = refCode;
        document.getElementById('registrationModal').classList.remove('hidden');
    }
}

// Enhanced anti-cheat initialization
function initAntiCheat() {
    // Enhanced monitoring
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && appState.activityInProgress) {
            appState.securityState.tabSwitches++;
            if (appState.securityState.tabSwitches > 1) {
                handleSecurityViolation('excessive_tab_switching');
            }
        }
    });
    window.addEventListener('blur', () => {
        appState.securityState.pageBlurCount++;
        if (appState.activityInProgress && appState.securityState.pageBlurCount > 2) {
            handleSecurityViolation('page_focus_lost');
        }
    });
    // Monitor suspicious console activity
    let devtools = {open: false, orientation: null};
    setInterval(() => {
        if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
            if (!devtools.open) {
                devtools.open = true;
                appState.securityState.suspiciousActions++;
                updateSecurityStatus();
            }
        }
    }, 500);
}

// Update security status indicator
function updateSecurityStatus() {
    const securityStatus = document.getElementById('securityStatus');
    if (appState.securityState.suspiciousActions === 0) {
        securityStatus.className = 'security-status security-active';
        securityStatus.innerHTML = '<i class="fas fa-shield-alt"></i> Security Active';
    } else if (appState.securityState.suspiciousActions < 3) {
        securityStatus.className = 'security-status security-warning';
        securityStatus.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${appState.securityState.suspiciousActions} Suspicious Events`;
    } else {
        securityStatus.className = 'security-status security-alert';
        securityStatus.innerHTML = '<i class="fas fa-skull-crossbones"></i> Security Alert!';
    }
}

// Log security event
async function logSecurityEvent(userEmail, reason) {
    try {
        const logData = {
            email: userEmail,
            event: reason,
            timestamp: new Date().toISOString(),
            fingerprint: appState.securityState.fingerprint,
            suspiciousCount: appState.securityState.suspiciousActions
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
    try {
        console.log(`Awarding referral bonus for code: ${referralCode} to new user: ${newUserEmail}`);
        // In real implementation, find user with referralCode and award bonus
    } catch (error) {
        console.error('Failed to award referral bonus:', error);
    }
}

// Main app initialization
function showMainApp() {
    document.getElementById('mainApp').classList.remove('hidden');
    updateDisplay();
    updateGameButtonStates();
}

// Update display elements
function updateDisplay() {
    const elements = {
        coinCount: document.getElementById('coinCount'),
        diamondCount: document.getElementById('diamondCount'),
        earnings: document.getElementById('earnings'),
        activitiesCount: document.getElementById('activitiesCount'),
        referralCount: document.getElementById('referralCount'),
        progressBar: document.getElementById('progressBar'),
        progressText: document.getElementById('progressText'),
        withdrawableAmount: document.getElementById('withdrawableAmount'),
        currentDiamonds: document.getElementById('currentDiamonds')
    };
    if (currentUser) {
        elements.coinCount.textContent = formatNumber(currentUser.coins);
        elements.diamondCount.textContent = formatNumber(currentUser.diamonds);
        elements.earnings.textContent = formatCurrency(currentUser.earnings);
        elements.activitiesCount.textContent = formatNumber(currentUser.activities);
        elements.referralCount.textContent = formatNumber(currentUser.referrals);
        const coinsToNextTaka = currentUser.coins % 1000;
        const progressPercent = (coinsToNextTaka / 1000) * 100;
        elements.progressBar.style.width = `${progressPercent}%`;
        elements.progressText.textContent = `${coinsToNextTaka}/1000 coins`;
        elements.withdrawableAmount.textContent = formatCurrency(currentUser.earnings);
        if (elements.currentDiamonds) {
            elements.currentDiamonds.textContent = currentUser.diamonds;
        }
    } else {
        // Guest mode - show zeros
        Object.values(elements).forEach(el => {
            if (el && (el.id === 'earnings' || el.id === 'withdrawableAmount')) {
                el.textContent = formatCurrency(0);
            } else if (el && el.id === 'progressText') {
                el.textContent = '0/1000 coins';
            } else if (el) {
                el.textContent = '0';
            }
        });
    }
}

// Update game button states
function updateGameButtonStates() {
    const gamesBtn = document.getElementById('gamesBtn');
    const videosBtn = document.getElementById('videosBtn');
    const unlockNotice = document.getElementById('unlockNotice');
    if (isGuestMode || !currentUser || !currentUser.isEmailVerified) {
        unlockNotice.classList.add('hidden');
        gamesBtn.classList.remove('button-locked');
        videosBtn.classList.remove('button-locked');
        return;
    }
    const today = new Date().toDateString();
    
    if (currentUser.lastUnlockDate !== today) {
        currentUser.dailyUnlockedGames = false;
        currentUser.dailyUnlockedVideos = false;
        currentUser.lastUnlockDate = today;
    }
    const needsGameUnlock = !currentUser.dailyUnlockedGames;
    const needsVideoUnlock = !currentUser.dailyUnlockedVideos;
    const hasGameDiamonds = currentUser.diamonds >= 10;
    const hasVideoDiamonds = currentUser.diamonds >= 50;
    if ((needsGameUnlock && !hasGameDiamonds) || (needsVideoUnlock && !hasVideoDiamonds)) {
        unlockNotice.classList.remove('hidden');
    } else {
        unlockNotice.classList.add('hidden');
    }
    if (needsGameUnlock && !hasGameDiamonds) {
        gamesBtn.classList.add('button-locked');
    } else {
        gamesBtn.classList.remove('button-locked');
    }
    if (needsVideoUnlock && !hasVideoDiamonds) {
        videosBtn.classList.add('button-locked');
    } else {
        videosBtn.classList.remove('button-locked');
    }
}

// Initialize language detection
function detectAndSetLanguage() {
    const userLanguage = navigator.language || navigator.userLanguage;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    if (timezone.includes('Dhaka') || userLanguage.includes('bn')) {
        appState.currentLanguage = 'bn';
    } else {
        appState.currentLanguage = 'en';
    }
    
    setLanguage(appState.currentLanguage);
}

// Modal management functions
function showLoginModal() {
    document.getElementById('registrationModal').classList.add('hidden');
    document.getElementById('loginModal').classList.remove('hidden');
}

function showRegistrationModal() {
    document.getElementById('loginModal').classList.add('hidden');
    document.getElementById('registrationModal').classList.remove('hidden');
}

function hideAuthModals() {
    document.getElementById('registrationModal').classList.add('hidden');
    document.getElementById('loginModal').classList.add('hidden');
}

function showEmailVerification() {
    document.getElementById('loginModal').classList.add('hidden');
    document.getElementById('emailVerificationModal').classList.remove('hidden');
}

// Withdrawal function
async function requestWithdrawal() {
    const btn = document.getElementById('confirmWithdrawBtn');
    const originalContent = btn.innerHTML;
    
    // Show loading state
    btn.innerHTML = '<div class="spinner"></div> Processing...';
    btn.disabled = true;
    
    // Simulate API call with timeout
    setTimeout(() => {
        // Create WhatsApp message
        const whatsappMessage = `Withdrawal Request:\n\nName: ${currentUser.name}\nEmail: ${currentUser.email}\nMobile: ${currentUser.mobile}\nTotal Earnings: ${formatCurrency(currentUser.earnings)}\nReferral Code: ${currentUser.referralCode}\n\nPlease process my withdrawal request.`;
        
        const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
        
        // Reset user data
        currentUser.coins = 0;
        currentUser.diamonds = 0;
        currentUser.earnings = 0;
        currentUser.activities = 0;
        currentUser.dailyUnlockedGames = false;
        currentUser.dailyUnlockedVideos = false;
        currentUser.lastActivity = new Date().toISOString();
        saveUserData(currentUser);
        updateDisplay();
        updateGameButtonStates();
        
        showCustomAlert('Withdrawal request sent! Our team will contact you via WhatsApp.', 'success');
        playSound('success');
        
        // Reset button
        btn.innerHTML = originalContent;
        btn.disabled = false;
        
        // Close modal after delay
        setTimeout(() => {
            document.getElementById('withdrawModal').classList.add('hidden');
        }, 3000);
    }, 1500);
}
</script>
</body>
</html>
