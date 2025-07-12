// Profile functionality for profile.html
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners
    document.querySelector('button[onclick="editProfile()"]').addEventListener('click', editProfile);
    document.querySelector('button[onclick="changePassword()"]').addEventListener('click', changePassword);
    document.querySelector('button[onclick="logout()"]').addEventListener('click', logout);
    document.querySelector('button[onclick="copyReferralCode()"]').addEventListener('click', copyReferralCode);
    
    // Set language
    setLanguage('en');
});

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

function editProfile() {
    showCustomAlert('Profile editing feature coming soon!', 'info');
}

function changePassword() {
    showCustomAlert('Password change feature coming soon!', 'info');
}
