// Withdrawal functionality for withdraw.html
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listener
    document.querySelector('button[onclick="initiateWithdrawal()"]').addEventListener('click', initiateWithdrawal);
    
    // Set language
    setLanguage('en');
});

function initiateWithdrawal() {
    const currentBalance = parseFloat(document.getElementById('currentBalance').textContent);
    
    if (currentBalance < 20) {
        showCustomAlert('Insufficient balance for withdrawal (minimum 20.00 BDT)', 'warning');
        playSound('warning');
        return;
    }
    
    const t = translations['en'];
    const message = t.withdraw_confirm.replace('{amount}', formatCurrency(currentBalance));
    
    showCustomConfirm(message, (confirmed) => {
        if (confirmed) {
            window.open(`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(`Withdraw: ${formatCurrency(currentBalance)}\nName: John Doe\nEmail: john@example.com\nMobile: +8801XXXXXXXXX\nAddress: Dhaka, Bangladesh\nReferral Code: REF123ABC\nTotal Activities: 32`)}`, '_blank');
            
            showCustomAlert(t.withdraw_success, 'success');
            playSound('success');
        }
    });
}
