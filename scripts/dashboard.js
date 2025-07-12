// Dashboard functionality for dashboard.html
const translations = {
    en: {
        title: "Coin Earner Pro",
        subtitle: "Play games and earn coins! 1000 coins = 1.00 BDT",
        play_games: "Play Games",
        watch_videos: "Watch Videos",
        view_products: "View Products",
        browse_products: "Browse Amazing Products",
        earn_10_coins: "Earn 10 Coins (30s)",
        cost_10_diamonds: "Cost: 10 💎",
        cost_50_diamonds: "Cost: 50 💎",
        free_browsing: "Free Browsing",
        total_coins: "Total Coins",
        diamonds: "Diamonds",
        earnings: "Earnings",
        activities: "Activities",
        referrals: "Referrals",
        progress_title: "Progress to Next Taka",
        activity_in_progress: "Activity in Progress",
        timer_instruction: "Stay on the page to earn your coins!",
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
        footer_info: "Secure data storage with advanced anti-cheat protection"
    },
    bn: {
        title: "কয়েন আর্নার প্রো",
        subtitle: "গেম খেলে কয়েন জিতুন! ১০০০ কয়েন = ১.০০ টাকা",
        play_games: "গেম খেলুন",
        watch_videos: "ভিডিও দেখুন",
        view_products: "পণ্য দেখুন",
        browse_products: "দুর্দান্ত পণ্য ব্রাউজ করুন",
        earn_10_coins: "১০ কয়েন জিতুন (৩০সে)",
        cost_10_diamonds: "খরচ: ১০ 💎",
        cost_50_diamonds: "খরচ: ৫০ 💎",
        free_browsing: "বিনামূল্যে ব্রাউজিং",
        total_coins: "মোট কয়েন",
        diamonds: "হীরা",
        earnings: "উপার্জন",
        activities: "কার্যক্রম",
        referrals: "রেফারেল",
        progress_title: "পরবর্তী টাকার অগ্রতি",
        activity_in_progress: "কার্যক্রম চলছে",
        timer_instruction: "কয়েন পেতে পেজে থাকুন!",
        sharing_rewards: "শেয়ারিং এবং পুরস্কার",
        sharing_text: "শেয়ার করে হীরা ও কয়েন অর্জন করুন!",
        your_code: "আপনার রেফারেল কোড:",
        share_app: "অ্যাপ শেয়ার (+২💎)",
        withdraw_earnings: "উপার্জন উত্তোলন",
        withdraw_text: "সর্বনিম্ন উত্তোলন: ২০.০০ টাকা",
        withdraw_note: "উপলব্ধ: {amount} টাকা\nউত্তোলনের পর ডেটা রিসেট",
        withdraw_whatsapp: "হোয়াটসঅ্যাপে উত্তোলন",
        how_to_earn: "কীভাবে উপার্জন করবেন:",
        instruction_1: "জিমেইল দিয়ে নিবন্ধন করুন এবং ইমেইল যাচাই করুন",
        instruction_2: "প্রতি শেয়ারে ২ হীরা পেতে অ্যাপ শেয়ার করুন",
        instruction_3: "দৈনিক গেম (১০💎) এবং ভিডিও (৫০💎) আনলক করতে হীরা ব্যবহার করুন",
        instruction_4: "প্রতিটি ১০ কয়েন পেতে ৩০ সেকেন্ড কার্যক্রম সম্পন্ন করুন",
        instruction_5: "বৈধ রেফারেল কোড ৩০ বোনাস কয়েন দেয়",
        instruction_6: "কেউ আপনার রেফারেল ব্যবহার করলে আপনি ৩০ কয়েন পায়",
        instruction_7: "পণ্য বিনামূল্যে ব্রাউজ করুন",
        footer_info: "উন্নত অ্যান্টি-চিট সুরক্ষা সহ নিরাপদ ডেটা স্টোরেজ"
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

// Activity tracking
function startActivity(type, url) {
    // Activity logic would go here
    console.log('Starting activity:', type, 'URL:', url);
}

// Initialize dashboard
function initDashboard() {
    // This would normally load user data and initialize the dashboard
    console.log('Dashboard initialized');
}

// Document ready
document.addEventListener('DOMContentLoaded', function() {
    // Load user data
    loadUserData();
    
    // Set up event listeners
    document.getElementById('gamesBtn').addEventListener('click', () => startActivity('games', 'https://mustakimridoymr.github.io/Games.html'));
    document.getElementById('videosBtn').addEventListener('click', () => startActivity('videos', 'https://mustakimridoymr.github.io/Resources.html'));
    document.getElementById('productsBtn').addEventListener('click', () => startActivity('products', 'https://mustakimridoymr.github.io/affiliate.html'));
    document.getElementById('newsBtn').addEventListener('click', () => startActivity('news', 'https://mustakimridoymr.github.io/newsApp.html'));
    
    // Set language
    setLanguage('en');
});

// Load user data
function loadUserData() {
    // This would normally fetch user data from a backend
    // For demo purposes, we'll simulate it
    const userData = {
        name: "John Doe",
        email: "john@example.com",
        coins: 1250,
        diamonds: 45,
        earnings: 5.25,
        activities: 32,
        referrals: 3,
        referralCode: "REF123ABC",
        isEmailVerified: true,
        isActive: true,
        dailyUnlockedGames: false,
        dailyUnlockedVideos: true
    };
    
    // Update UI with user data
    document.getElementById('userGreeting').textContent = `Welcome, ${userData.name}`;
    document.getElementById('coinCount').textContent = userData.coins;
    document.getElementById('diamondCount').textContent = userData.diamonds;
    document.getElementById('earnings').textContent = `${userData.earnings.toFixed(2)} BDT`;
    document.getElementById('activitiesCount').textContent = userData.activities;
    document.getElementById('referralCount').textContent = userData.referrals;
    document.getElementById('referralCode').textContent = userData.referralCode;
    
    // Update withdrawal info
    document.getElementById('currentBalance').textContent = `${userData.earnings.toFixed(2)} BDT`;
    document.getElementById('withdrawableAmount').textContent = `${userData.earnings.toFixed(2)} BDT`;
    
    // Update profile info
    document.getElementById('profileName').textContent = userData.name;
    document.getElementById('profileEmail').textContent = userData.email;
    document.getElementById('profileCoins').textContent = userData.coins;
    document.getElementById('profileDiamonds').textContent = userData.diamonds;
    document.getElementById('profileEarnings').textContent = `${userData.earnings.toFixed(2)} BDT`;
    document.getElementById('profileReferrals').textContent = userData.referrals;
    document.getElementById('profileReferralCode').textContent = userData.referralCode;
    
    // Check account status
    if (!userData.isEmailVerified) {
        document.getElementById('verificationNotice').classList.remove('hidden');
    }
    
    if (!userData.isActive) {
        document.getElementById('inactiveNotice').classList.remove('hidden');
    }
    
    // Check daily unlocks
    updateGameButtonStates();
}

// Update game button states
function updateGameButtonStates() {
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
        document.getElementById('unlockNotice').classList.remove('hidden');
    } else {
        document.getElementById('unlockNotice').classList.add('hidden');
    }
    if (needsGameUnlock && !hasGameDiamonds) {
        document.getElementById('gamesBtn').classList.add('button-locked');
    } else {
        document.getElementById('gamesBtn').classList.remove('button-locked');
    }
    if (needsVideoUnlock && !hasVideoDiamonds) {
        document.getElementById('videosBtn').classList.add('button-locked');
    } else {
        document.getElementById('videosBtn').classList.remove('button-locked');
    }
}
