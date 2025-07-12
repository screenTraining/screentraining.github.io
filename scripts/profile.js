// Profile functionality for profile.html
const translations = {
    en: {
        profile_title: "User Profile",
        verification_status: "Verification Status",
        edit_profile: "Edit Profile",
        change_password: "Change Password",
        copy_code: "Copy Code",
        activity_history: "Activity History",
        date: "Date",
        activity: "Activity",
        coins_earned: "Coins Earned"
    },
    bn: {
        profile_title: "ব্যবহারক প্রোফাইল",
        verification_status: "যাচাই অবস্থান",
        edit_profile: "প্রোফাইল সম্পাদন",
        change_password: "পাসওয়ার্ড পরিবর্তন",
        copy_code: "কোড কপি করুন",
        activity_history: "কার্যক্রমের ইতিহাস",
        date: "তারিখ",
        activity: "কার্যক্রম",
        coins_earned: "কয়েন অর্জিত"
    }
};

// Initialize profile page
function initProfile() {
    // Set up event listeners
    document.querySelector('button[onclick="editProfile()"]').addEventListener('click', editProfile);
    document.querySelector('button[onclick="changePassword()"]').addEventListener('click', changePassword);
    document.querySelector('button[onclick="copyReferralCode()"]').addEventListener('click', copyReferralCode);
    
    // Set language
    setLanguage('en');
}

// Copy referral code
function copyReferralCode() {
    const referralCode = document.getElementById('profileReferralCode').textContent;
    navigator.clipboard.writeText(referralCode).then(() => {
        showCustomAlert('Referral code copied to clipboard!', 'success');
        playSound('success');
    }).catch(() => {
        showCustomAlert('Failed to copy referral code', 'error');
        playSound('error');
    });
}

// Edit profile
function editProfile() {
    showCustomAlert('Profile editing feature coming soon!', 'info');
}

// Change password
function changePassword() {
    showCustomAlert('Password change feature coming soon!', 'info');
}
