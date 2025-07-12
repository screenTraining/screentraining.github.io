// Dashboard functionality for dashboard.html
document.addEventListener('DOMContentLoaded', function() {
    // Load user data
    loadUserData();
    
    // Set up event listeners
    document.getElementById('gamesBtn').addEventListener('click', () => startActivity('games'));
    document.getElementById('videosBtn').addEventListener('click', () => startActivity('videos'));
    document.getElementById('productsBtn').addEventListener('click', () => startActivity('products'));
    document.getElementById('newsBtn').addEventListener('click', () => startActivity('news'));
    
    // Set language
    setLanguage('en');
});

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
