// Withdrawal functionality for withdraw.html
const translations = {
    en: {
        withdraw_title: "Withdraw Your Earnings",
        withdraw_subtitle: "Minimum withdrawal: 20.00 BDT",
        current_balance: "Current Balance",
        withdrawable_amount: "Withdrawable Amount",
        withdraw_success: "Withdrawal request sent via WhatsApp!",
        withdraw_confirm: "Send withdrawal request for {amount} BDT?",
        insufficient_balance: "Insufficient balance for withdrawal (minimum 20 BDT)"
    },
    bn: {
        withdraw_title: "উপার্জন উত্তোলন",
        withdraw_subtitle: "সর্বনিম্ন উত্তোলন: ২০.০০ টাকা",
        current_balance: "বর্তমান ব্যালেন্স",
        withdrawable_amount: "উপলব্ধ অঙ্ক",
        withdraw_success: "উত্তোলনের অনুরোধ হোয়াটস্যাপে পাঠানো হয়েছে!",
        withdraw_confirm: "{amount} টাকার উত্তোলনের অনুরোধ পাঠানো হবেন?",
        insufficient_balance: "উত্তোলনের জন্য অপর্যাপ্ত ব্যালেন্স (সর্বনিম্ন ২০ টাকা)"
    }
};

// Initialize withdrawal page
function initWithdrawal() {
    // Set up event listener
    document.querySelector('button[onclick="initiateWithdrawal()"]').addEventListener('click', initiateWithdrawal);
    
    // Set language
    setLanguage('en');
}

// Initiate withdrawal
function initiateWithdrawal() {
    const currentBalance = parseFloat(document.getElementById('currentBalance').textContent);
    
    if (currentBalance < 20) {
        showCustomAlert(translations[appState.currentLanguage].insufficient_balance, 'warning');
        playSound('warning');
        return;
    }
    
    const t = translations[appState.currentLanguage];
    const message = t.withdraw_confirm.replace('{amount}', formatCurrency(currentBalance));
    
    showCustomConfirm(message, (confirmed) => {
        if (confirmed) {
            const whatsappMessage = `Withdraw: ${formatCurrency(currentBalance)}\nName: John Doe\nEmail: john@example.com\nMobile: +8801XXXXXXXXX\nAddress: Dhaka, Bangladesh\nReferral Code: REF123ABC\nTotal Activities: 32`;
            const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            
            window.open(whatsappUrl, '_blank');
            
            // Reset user data after withdrawal
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
            
            showCustomAlert(t.withdraw_success, 'success');
            playSound('success');
        }
    });
}
