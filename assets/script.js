/**
 * Coin Earner Pro - Complete JavaScript Functions
 * Advanced Anti-Cheat System with Comprehensive Security
 * Version: 2.0.0
 */

// ===== GLOBAL CONFIGURATION =====
const CONFIG = {
    apiEndpoint: 'https://script.google.com/macros/s/AKfycbwzeoNtCleXecmpyEpfQMiZxNHizvl84nUipSj1FxTySFVhQrT-3K9Oo_7FiidM5HPL/exec',
    whatsappNumber: '8801700000000',
    appVersion: '2.0.0',
    minWithdrawal: 20.00,
    coinToTaka: 1000, // 1000 coins = 1 BDT
    activityDuration: 60, // 1 minute in seconds
    cooldownDuration: 3600, // 1 hour in seconds
    securityThreshold: 5,
    maxSuspiciousActions: 10
};

// ===== GLOBAL STATE MANAGEMENT =====
const AppState = {
    // User Management
    currentUser: null,
    isGuestMode: false,
    isAuthenticated: false,
    
    // Security System
    security: {
        violations: 0,
        lastViolation: 0,
        fingerprint: null,
        sessionStart: Date.now(),
        suspiciousActions: 0,
        patterns: {
            rapidClicks: 0,
            tabSwitches: 0,
            consoleAttempts: 0,
            devToolsOpen: false,
            windowFocusLost: 0
        }
    },
    
    // Activity Management
    activities: {
        inProgress: false,
        currentType: null,
        startTime: 0,
        endTime: 0,
        timer: null,
        window: null,
        windowCheckInterval: null
    },
    
    // Cooldown Management
    cooldowns: {},
    
    // UI State
    theme: 'light',
    audioEnabled: false,
    notifications: [],
    modals: [],
    
    // Statistics
    sessionStats: {
        coinsEarned: 0,
        activitiesCompleted: 0,
        timeSpent: 0,
        violations: 0
    }
};

// ===== SECURITY SYSTEM =====
class SecurityManager {
    constructor() {
        this.violations = 0;
        this.patterns = {
            rapidClicks: 0,
            tabSwitches: 0,
            consoleAttempts: 0,
            devToolsOpen: false,
            windowFocusLost: 0,
            suspiciousTimings: []
        };
        this.init();
    }
    
    init() {
        this.generateFingerprint();
        this.setupEventListeners();
        this.startMonitoring();
        console.log('🔒 Security Manager initialized');
    }
    
    generateFingerprint() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('Security Check', 2, 2);
        
        const fingerprint = {
            screen: `${screen.width}x${screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            language: navigator.language,
            platform: navigator.platform,
            userAgent: navigator.userAgent.substring(0, 100),
            canvas: canvas.toDataURL(),
            timestamp: Date.now(),
            cookieEnabled: navigator.cookieEnabled,
            onlineStatus: navigator.onLine
        };
        
        AppState.security.fingerprint = btoa(JSON.stringify(fingerprint));
    }
    
    setupEventListeners() {
        // Prevent right-click
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.reportViolation('right_click_attempt');
        });
        
        // Prevent key combinations
        document.addEventListener('keydown', (e) => {
            const forbidden = [
                (e.ctrlKey && e.shiftKey && e.key === 'I'), // DevTools
                (e.ctrlKey && e.shiftKey && e.key === 'J'), // Console
                (e.ctrlKey && e.key === 'U'), // View Source
                (e.key === 'F12'), // DevTools
                (e.ctrlKey && e.key === 'S'), // Save
                (e.ctrlKey && e.key === 'A'), // Select All
                (e.ctrlKey && e.key === 'P'), // Print
                (e.ctrlKey && e.key === 'C'), // Copy (in some contexts)
            ];
            
            if (forbidden.some(condition => condition)) {
                e.preventDefault();
                this.patterns.consoleAttempts++;
                this.reportViolation('forbidden_key_combination');
            }
        });
        
        // Monitor tab switching
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && AppState.activities.inProgress) {
                this.patterns.tabSwitches++;
                if (this.patterns.tabSwitches > 2) {
                    this.reportViolation('excessive_tab_switching');
                }
            }
        });
        
        // Monitor window focus
        window.addEventListener('blur', () => {
            if (AppState.activities.inProgress) {
                this.patterns.windowFocusLost++;
                if (this.patterns.windowFocusLost > 3) {
                    this.reportViolation('window_focus_lost');
                }
            }
        });
        
        // Monitor mouse behavior
        let clickCount = 0;
        let lastClickTime = 0;
        
        document.addEventListener('click', (e) => {
            const now = Date.now();
            if (now - lastClickTime < 100) {
                clickCount++;
                if (clickCount > 5) {
                    this.reportViolation('rapid_clicking');
                }
            } else {
                clickCount = 0;
            }
            lastClickTime = now;
        });
    }
    
    startMonitoring() {
        // Check for developer tools
        setInterval(() => {
            this.checkDevTools();
            this.validateSystemIntegrity();
        }, 1000);
        
        // Monitor performance for automation
        setInterval(() => {
            this.checkAutomation();
        }, 5000);
    }
    
    checkDevTools() {
        const threshold = 160;
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        
        if (widthThreshold || heightThreshold) {
            if (!this.patterns.devToolsOpen) {
                this.patterns.devToolsOpen = true;
                this.reportViolation('dev_tools_detected');
            }
        } else {
            this.patterns.devToolsOpen = false;
        }
    }
    
    validateSystemIntegrity() {
        // Check if critical functions have been tampered with
        const criticalFunctions = [
            'addEventListener',
            'querySelector',
            'fetch',
            'localStorage',
            'sessionStorage'
        ];
        
        for (const func of criticalFunctions) {
            if (typeof window[func] !== 'function' && typeof document[func] !== 'function') {
                this.reportViolation('function_tampering');
                break;
            }
        }
    }
    
    checkAutomation() {
        // Check for automated behavior patterns
        const now = performance.now();
        const timings = this.patterns.suspiciousTimings;
        
        if (timings.length > 10) {
            const intervals = [];
            for (let i = 1; i < timings.length; i++) {
                intervals.push(timings[i] - timings[i-1]);
            }
            
            const avgInterval = intervals.reduce((a, b) => a + b) / intervals.length;
            const variance = intervals.reduce((acc, val) => acc + Math.pow(val - avgInterval, 2), 0) / intervals.length;
            
            // If intervals are too regular, likely automated
            if (variance < 100 && avgInterval < 5000) {
                this.reportViolation('automation_detected');
            }
        }
    }
    
    reportViolation(type, severity = 'medium') {
        this.violations++;
        this.patterns.suspiciousActions++;
        AppState.security.violations++;
        AppState.sessionStats.violations++;
        
        const violation = {
            type,
            severity,
            timestamp: Date.now(),
            fingerprint: AppState.security.fingerprint,
            sessionId: AppState.security.sessionStart,
            userAgent: navigator.userAgent
        };
        
        console.warn(`🚨 Security Violation [${severity.toUpperCase()}]:`, type, violation);
        
        // Store violation
        this.storeViolation(violation);
        
        // Take action based on severity and count
        this.handleViolation(type, severity);
        
        // Update security status
        this.updateSecurityStatus();
    }
    
    storeViolation(violation) {
        try {
            const violations = JSON.parse(localStorage.getItem('securityViolations') || '[]');
            violations.push(violation);
            
            // Keep only last 100 violations
            if (violations.length > 100) {
                violations.splice(0, violations.length - 100);
            }
            
            localStorage.setItem('securityViolations', JSON.stringify(violations));
        } catch (error) {
            console.error('Failed to store violation:', error);
        }
    }
    
    handleViolation(type, severity) {
        const actionMap = {
            low: () => this.showWarning(type),
            medium: () => {
                if (this.violations > 3) {
                    this.lockAccount();
                } else {
                    this.showWarning(type);
                }
            },
            high: () => this.lockAccount(),
            critical: () => this.lockAccountPermanent()
        };
        
        (actionMap[severity] || actionMap.medium)();
        
        // Cancel ongoing activities
        if (AppState.activities.inProgress && severity !== 'low') {
            ActivityManager.cancelActivity('security_violation');
        }
    }
    
    showWarning(type) {
        const messages = {
            dev_tools_detected: 'Developer tools detected. Please close them to continue.',
            excessive_tab_switching: 'Please stay on the page during activities.',
            rapid_clicking: 'Please wait between activities to avoid spam detection.',
            forbidden_key_combination: 'Restricted key combination detected.',
            automation_detected: 'Automated behavior detected. Please use manual interaction.',
            window_focus_lost: 'Please keep the window focused during activities.',
            right_click_attempt: 'Right-click is disabled for security reasons.',
            function_tampering: 'System tampering detected.'
        };
        
        NotificationManager.show('warning', 'Security Warning', messages[type] || 'Security violation detected.');
        AudioManager.play('warning');
    }
    
    lockAccount() {
        NotificationManager.show('error', 'Account Locked', 'Too many security violations. Account temporarily locked.');
        AudioManager.play('error');
        
        // Disable earning buttons
        document.querySelectorAll('.earning-button').forEach(btn => {
            btn.classList.add('disabled');
        });
        
        // Set temporary lock (5 minutes)
        setTimeout(() => {
            this.unlockAccount();
        }, 5 * 60 * 1000);
    }
    
    lockAccountPermanent() {
        NotificationManager.show('error', 'Account Suspended', 'Serious security violations detected. Account suspended.');
        AudioManager.play('error');
        
        // Disable all functionality
        document.body.style.pointerEvents = 'none';
        
        // Redirect to security page after delay
        setTimeout(() => {
            window.location.href = 'https://mustakimridoymr.github.io/MR-Bot/';
        }, 3000);
    }
    
    unlockAccount() {
        NotificationManager.show('success', 'Account Unlocked', 'Account has been unlocked. Please follow security guidelines.');
        
        // Re-enable earning buttons
        document.querySelectorAll('.earning-button').forEach(btn => {
            btn.classList.remove('disabled');
        });
    }
    
    updateSecurityStatus() {
        const indicator = document.getElementById('securityIndicator');
        const text = document.getElementById('securityText');
        
        if (!indicator || !text) return;
        
        if (this.violations === 0) {
            indicator.className = 'security-indicator security-safe';
            text.textContent = 'System Secure';
        } else if (this.violations < 3) {
            indicator.className = 'security-indicator security-warning';
            text.textContent = `${this.violations} Warning${this.violations > 1 ? 's' : ''}`;
        } else {
            indicator.className = 'security-indicator security-danger';
            text.textContent = 'High Risk';
        }
    }
    
    isSecure() {
        return this.violations < CONFIG.securityThreshold;
    }
    
    reset() {
        this.violations = 0;
        this.patterns = {
            rapidClicks: 0,
            tabSwitches: 0,
            consoleAttempts: 0,
            devToolsOpen: false,
            windowFocusLost: 0,
            suspiciousTimings: []
        };
        this.updateSecurityStatus();
    }
}

// ===== ACTIVITY MANAGEMENT SYSTEM =====
class ActivityManager {
    static activityConfigs = {
        games: {
            name: 'Play Games',
            icon: 'fas fa-gamepad',
            color: 'purple',
            coins: 10,
            duration: CONFIG.activityDuration,
            cooldown: CONFIG.cooldownDuration,
            url: 'https://mustakimridoymr.github.io/Games.html',
            description: 'Play exciting games and earn coins!'
        },
        videos: {
            name: 'Watch Videos',
            icon: 'fas fa-video',
            color: 'red',
            coins: 15,
            duration: CONFIG.activityDuration,
            cooldown: CONFIG.cooldownDuration,
            url: 'https://mustakimridoymr.github.io/Resources.html',
            description: 'Watch educational videos and earn more coins!'
        },
        survey: {
            name: 'Take Surveys',
            icon: 'fas fa-clipboard-list',
            color: 'orange',
            coins: 25,
            duration: CONFIG.activityDuration,
            cooldown: CONFIG.cooldownDuration,
            url: 'https://mustakimridoymr.github.io/affiliate.html',
            description: 'Complete surveys for premium coin rewards!'
        },
        shopping: {
            name: 'Online Shopping',
            icon: 'fas fa-shopping-bag',
            color: 'pink',
            coins: 20,
            duration: CONFIG.activityDuration,
            cooldown: CONFIG.cooldownDuration,
            url: 'https://mustakimridoymr.github.io/newsApp.html',
            description: 'Browse shopping deals and earn coins!'
        },
        news: {
            name: 'Read News',
            icon: 'fas fa-newspaper',
            color: 'blue',
            coins: 12,
            duration: CONFIG.activityDuration,
            cooldown: CONFIG.cooldownDuration,
            url: 'https://mustakimridoymr.github.io/newsApp.html',
            description: 'Stay informed with latest news!'
        },
        social: {
            name: 'Social Media',
            icon: 'fas fa-share-alt',
            color: 'green',
            coins: 8,
            duration: CONFIG.activityDuration,
            cooldown: CONFIG.cooldownDuration,
            url: 'https://mustakimridoymr.github.io/',
            description: 'Engage with social content!'
        }
    };
    
    static startActivity(activityType) {
        console.log(`🎯 Starting activity: ${activityType}`);
        
        // Security checks
        if (!SecurityManager.prototype.isSecure()) {
            NotificationManager.show('error', 'Security Issue', 'Cannot start activity due to security violations.');
            return false;
        }
        
        // Guest mode check
        if (AppState.isGuestMode) {
            NotificationManager.show('warning', 'Registration Required', 'Please register to start earning coins!');
            return false;
        }
        
        // Activity in progress check
        if (AppState.activities.inProgress) {
            NotificationManager.show('warning', 'Activity in Progress', 'Please wait for the current activity to complete!');
            return false;
        }
        
        // Cooldown check
        if (CooldownManager.isInCooldown(activityType)) {
            const remaining = CooldownManager.getRemainingTime(activityType);
            NotificationManager.show('warning', 'Cooldown Active', `Please wait ${this.formatTime(remaining)} before starting this activity again!`);
            return false;
        }
        
        const config = this.activityConfigs[activityType];
        if (!config) {
            console.error('Invalid activity type:', activityType);
            return false;
        }
        
        // Show confirmation modal
        this.showConfirmationModal(activityType, config);
        return true;
    }
    
    static showConfirmationModal(activityType, config) {
        const modalHtml = `
            <div class="modal-overlay show" id="activityModal">
                <div class="modal-content text-center">
                    <i class="${config.icon} text-6xl text-${config.color}-400 mb-4"></i>
                    <h2 class="text-2xl font-bold text-white mb-2">${config.name}</h2>
                    <p class="text-white/80 mb-4">${config.description}</p>
                    <div class="bg-white/10 p-4 rounded-lg mb-6">
                        <p class="text-white font-semibold">Reward: ${config.coins} coins</p>
                        <p class="text-white/70 text-sm">Duration: ${config.duration} seconds</p>
                        <p class="text-white/70 text-sm">Stay on the page to earn your reward!</p>
                    </div>
                    <div class="flex space-x-4 justify-center">
                        <button onclick="ActivityManager.hideModal()" class="btn btn-secondary">
                            <i class="fas fa-times mr-2"></i>Cancel
                        </button>
                        <button onclick="ActivityManager.executeActivity('${activityType}')" class="btn btn-primary">
                            <i class="fas fa-play mr-2"></i>Start Activity
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
    
    static hideModal() {
        const modal = document.getElementById('activityModal');
        if (modal) {
            modal.remove();
        }
    }
    
    static executeActivity(activityType) {
        this.hideModal();
        
        const config = this.activityConfigs[activityType];
        
        // Update app state
        AppState.activities.inProgress = true;
        AppState.activities.currentType = activityType;
        AppState.activities.startTime = Date.now();
        AppState.activities.endTime = Date.now() + (config.duration * 1000);
        
        // Update button state
        const button = document.getElementById(activityType + 'Button');
        if (button) {
            button.classList.add('processing');
        }
        
        // Show activity timer
        this.showActivityTimer(config);
        
        // Open activity URL
        try {
            AppState.activities.window = window.open(config.url, '_blank', 'noopener,noreferrer');
            
            // Monitor window
            AppState.activities.windowCheckInterval = setInterval(() => {
                if (AppState.activities.window && AppState.activities.window.closed && AppState.activities.inProgress) {
                    SecurityManager.prototype.reportViolation('window_closed_early', 'medium');
                    this.cancelActivity('window_closed');
                    return;
                }
            }, 1000);
        } catch (error) {
            console.error('Failed to open activity window:', error);
            this.cancelActivity('window_error');
            return;
        }
        
        // Start countdown timer
        this.startCountdown(config);
        
        NotificationManager.show('info', 'Activity Started', `${config.name} activity started! Stay on the page to earn ${config.coins} coins.`);
        AudioManager.play('success');
    }
    
    static showActivityTimer(config) {
        const timer = document.getElementById('activityTimer');
        if (!timer) return;
        
        const typeElement = document.getElementById('activityType');
        if (typeElement) {
            typeElement.textContent = config.name;
        }
        
        timer.classList.remove('hidden');
    }
    
    static startCountdown(config) {
        let timeLeft = config.duration;
        const progressBar = document.getElementById('timerProgress');
        const timerText = document.getElementById('timerText');
        
        AppState.activities.timer = setInterval(() => {
            timeLeft--;
            
            // Update progress bar
            if (progressBar) {
                const progressPercent = (timeLeft / config.duration) * 100;
                progressBar.style.width = `${progressPercent}%`;
            }
            
            // Update timer text
            if (timerText) {
                timerText.textContent = `Time remaining: ${timeLeft} seconds`;
            }
            
            // Security checks
            if (AppState.activities.window && AppState.activities.window.closed) {
                SecurityManager.prototype.reportViolation('window_closed_during_activity', 'medium');
                this.cancelActivity('window_closed');
                return;
            }
            
            // Check for excessive violations
            if (AppState.security.violations > CONFIG.maxSuspiciousActions) {
                SecurityManager.prototype.reportViolation('too_many_violations', 'high');
                this.cancelActivity('security_violation');
                return;
            }
            
            // Activity completed
            if (timeLeft <= 0) {
                this.completeActivity(config);
            }
        }, 1000);
    }
    
    static completeActivity(config) {
        console.log(`✅ Activity completed: ${config.name}`);
        
        const timeSpent = Date.now() - AppState.activities.startTime;
        const minTimeRequired = (config.duration - 5) * 1000; // Allow 5 seconds tolerance
        
        // Clear intervals
        this.clearTimers();
        
        // Validate completion
        const isValidCompletion = timeSpent >= minTimeRequired && AppState.security.violations < CONFIG.securityThreshold;
        
        // Reset activity state
        this.resetActivityState();
        
        if (isValidCompletion) {
            // Award coins
            UserManager.awardCoins(config.coins);
            
            // Update statistics
            AppState.sessionStats.coinsEarned += config.coins;
            AppState.sessionStats.activitiesCompleted++;
            
            // Start cooldown
            CooldownManager.startCooldown(AppState.activities.currentType, config.cooldown);
            
            // Add to activity history
            UserManager.addActivityHistory(config.name, config.coins);
            
            // Update displays
            UserManager.updateUserDisplay();
            
            // Show success notification
            NotificationManager.show('success', 'Activity Completed!', `You earned ${config.coins} coins!`);
            AudioManager.play('coin');
            
            // Create floating reward animation
            this.createFloatingReward(config.coins);
        } else {
            NotificationManager.show('error', 'Activity Failed', 'Activity did not meet completion requirements.');
            AudioManager.play('error');
        }
        
        // Close activity window if still open
        if (AppState.activities.window && !AppState.activities.window.closed) {
            AppState.activities.window.close();
        }
    }
    
    static cancelActivity(reason) {
        console.log(`❌ Activity cancelled: ${reason}`);
        
        this.clearTimers();
        this.resetActivityState();
        
        // Close activity window
        if (AppState.activities.window && !AppState.activities.window.closed) {
            AppState.activities.window.close();
        }
        
        NotificationManager.show('error', 'Activity Cancelled', `Activity was cancelled due to: ${reason}`);
        AudioManager.play('error');
    }
    
    static clearTimers() {
        if (AppState.activities.timer) {
            clearInterval(AppState.activities.timer);
            AppState.activities.timer = null;
        }
        
        if (AppState.activities.windowCheckInterval) {
            clearInterval(AppState.activities.windowCheckInterval);
            AppState.activities.windowCheckInterval = null;
        }
    }
    
    static resetActivityState() {
        AppState.activities.inProgress = false;
        AppState.activities.currentType = null;
        AppState.activities.startTime = 0;
        AppState.activities.endTime = 0;
        AppState.activities.window = null;
        
        // Hide activity timer
        const timer = document.getElementById('activityTimer');
        if (timer) {
            timer.classList.add('hidden');
        }
        
        // Reset button states
        document.querySelectorAll('.earning-button').forEach(btn => {
            btn.classList.remove('processing', 'active');
        });
    }
    
    static createFloatingReward(amount) {
        const coinTypes = ['💰', '🪙', '💎', '🌟'];
        const numCoins = Math.min(Math.floor(amount / 2), 8);
        
        for (let i = 0; i < numCoins; i++) {
            setTimeout(() => {
                const coin = document.createElement('div');
                coin.className = 'floating-reward';
                coin.innerHTML = coinTypes[Math.floor(Math.random() * coinTypes.length)];
                coin.style.left = Math.random() * window.innerWidth + 'px';
                coin.style.top = window.innerHeight * 0.7 + 'px';
                coin.style.color = '#fbbf24';
                coin.style.zIndex = '1000';
                
                document.body.appendChild(coin);
                
                setTimeout(() => {
                    if (document.body.contains(coin)) {
                        document.body.removeChild(coin);
                    }
                }, 3000);
            }, i * 200);
        }
    }
    
    static formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else if (minutes > 0) {
            return `${minutes}m ${secs}s`;
        } else {
            return `${secs}s`;
        }
    }
    
    // Method to easily add new activities
    static addActivity(key, config) {
        this.activityConfigs[key] = {
            name: config.name,
            icon: config.icon || 'fas fa-star',
            color: config.color || 'blue',
            coins: config.coins || 10,
            duration: config.duration || CONFIG.activityDuration,
            cooldown: config.cooldown || CONFIG.cooldownDuration,
            url: config.url,
            description: config.description || 'Complete this activity to earn coins!'
        };
        
        console.log(`✨ New activity added: ${config.name}`);
    }
}

// ===== COOLDOWN MANAGEMENT SYSTEM =====
class CooldownManager {
    static startCooldown(activityType, duration) {
        const endTime = Date.now() + (duration * 1000);
        AppState.cooldowns[activityType] = endTime;
        
        // Store in localStorage for persistence
        this.saveCooldowns();
        
        // Update button state
        this.updateButtonState(activityType, true);
        
        // Start countdown display
        this.startCountdownDisplay(activityType, endTime);
        
        console.log(`⏰ Cooldown started for ${activityType}: ${duration} seconds`);
    }
    
    static isInCooldown(activityType) {
        const endTime = AppState.cooldowns[activityType];
        return endTime && Date.now() < endTime;
    }
    
    static getRemainingTime(activityType) {
        const endTime = AppState.cooldowns[activityType];
        if (!endTime) return 0;
        
        const remaining = endTime - Date.now();
        return Math.max(0, Math.floor(remaining / 1000));
    }
    
    static updateButtonState(activityType, inCooldown) {
        const button = document.getElementById(activityType + 'Button');
        const cooldownDiv = document.getElementById(activityType + 'Cooldown');
        
        if (!button) return;
        
        if (inCooldown) {
            button.classList.add('cooldown');
            if (cooldownDiv) {
                cooldownDiv.classList.remove('hidden');
            }
        } else {
            button.classList.remove('cooldown');
            if (cooldownDiv) {
                cooldownDiv.classList.add('hidden');
            }
        }
    }
    
    static startCountdownDisplay(activityType, endTime) {
        const timer = document.getElementById(activityType + 'Timer');
        if (!timer) return;
        
        const countdown = setInterval(() => {
            const remaining = endTime - Date.now();
            
            if (remaining <= 0) {
                clearInterval(countdown);
                this.endCooldown(activityType);
            } else {
                const minutes = Math.floor(remaining / 60000);
                const seconds = Math.floor((remaining % 60000) / 1000);
                timer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }
    
    static endCooldown(activityType) {
        delete AppState.cooldowns[activityType];
        this.saveCooldowns();
        this.updateButtonState(activityType, false);
        
        const activityName = ActivityManager.activityConfigs[activityType]?.name || activityType;
        NotificationManager.show('success', 'Ready!', `${activityName} is ready again!`);
        AudioManager.play('success');
        
        console.log(`✅ Cooldown ended for ${activityType}`);
    }
    
    static saveCooldowns() {
        try {
            localStorage.setItem('cooldowns', JSON.stringify(AppState.cooldowns));
        } catch (error) {
            console.error('Failed to save cooldowns:', error);
        }
    }
    
    static loadCooldowns() {
        try {
            const stored = localStorage.getItem('cooldowns');
            if (stored) {
                AppState.cooldowns = JSON.parse(stored);
                
                // Validate and restore active cooldowns
                Object.keys(AppState.cooldowns).forEach(activityType => {
                    if (this.isInCooldown(activityType)) {
                        const remaining = this.getRemainingTime(activityType);
                        this.updateButtonState(activityType, true);
                        this.startCountdownDisplay(activityType, AppState.cooldowns[activityType]);
                    } else {
                        delete AppState.cooldowns[activityType];
                    }
                });
                
                this.saveCooldowns();
            }
        } catch (error) {
            console.error('Failed to load cooldowns:', error);
        }
    }
    
    static clearAllCooldowns() {
        Object.keys(AppState.cooldowns).forEach(activityType => {
            this.endCooldown(activityType);
        });
        AppState.cooldowns = {};
        this.saveCooldowns();
    }
}

// ===== USER MANAGEMENT SYSTEM =====
class UserManager {
    static async saveUserData(userData) {
        try {
            console.log('💾 Saving user data:', userData.email);
            
            // Validate user data
            if (!this.validateUserData(userData)) {
                throw new Error('Invalid user data');
            }
            
            // Add metadata
            userData.lastSaved = new Date().toISOString();
            userData.appVersion = CONFIG.appVersion;
            
            // Save to localStorage
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Save to backend (Google Apps Script)
            const result = await this.makeApiCall({
                action: 'saveUser',
                folder: 'users',
                filename: userData.email.replace('@', '_at_').replace('.', '_dot_') + '.json',
                content: JSON.stringify(userData, null, 2)
            });
            
            console.log('✅ User data saved successfully');
            return result;
        } catch (error) {
            console.error('❌ Failed to save user data:', error);
            throw error;
        }
    }
    
    static async loadUserData(email) {
        try {
            console.log('📥 Loading user data for:', email);
            
            const filename = email.replace('@', '_at_').replace('.', '_dot_') + '.json';
            
            const result = await this.makeApiCall({
                action: 'loadUser',
                folder: 'users',
                filename: filename
            });
            
            if (result && result.status === 'success' && result.data) {
                const userData = JSON.parse(result.data);
                
                // Validate and migrate data if needed
                const migratedData = this.migrateUserData(userData);
                
                console.log('✅ User data loaded successfully');
                return migratedData;
            }
            
            return null;
        } catch (error) {
            console.error('❌ Failed to load user data:', error);
            return null;
        }
    }
    
    static validateUserData(userData) {
        const required = ['name', 'email', 'coins', 'earnings', 'level'];
        return required.every(field => userData.hasOwnProperty(field));
    }
    
    static migrateUserData(userData) {
        // Ensure all required fields exist with default values
        const defaults = {
            coins: 0,
            diamonds: 0,
            earnings: 0,
            level: 1,
            activities: 0,
            referrals: 0,
            isActive: true,
            isEmailVerified: false,
            joinDate: new Date().toISOString(),
            lastActivity: new Date().toISOString(),
            achievements: [],
            referralCode: this.generateReferralCode(),
            activityHistory: [],
            securityLog: []
        };
        
        // Merge with defaults
        const migratedData = { ...defaults, ...userData };
        
        // Convert earnings to proper format
        if (migratedData.earnings < 1 && migratedData.coins >= CONFIG.coinToTaka) {
            const newEarnings = Math.floor(migratedData.coins / CONFIG.coinToTaka);
            migratedData.earnings += newEarnings;
            migratedData.coins = migratedData.coins % CONFIG.coinToTaka;
        }
        
        return migratedData;
    }
    
    static awardCoins(amount) {
        if (!AppState.currentUser) {
            console.warn('No user to award coins to');
            return;
        }
        
        console.log(`🪙 Awarding ${amount} coins to ${AppState.currentUser.email}`);
        
        AppState.currentUser.coins += amount;
        AppState.currentUser.lastActivity = new Date().toISOString();
        
        // Convert coins to earnings (1000 coins = 1 BDT)
        while (AppState.currentUser.coins >= CONFIG.coinToTaka) {
            AppState.currentUser.earnings += 1;
            AppState.currentUser.coins -= CONFIG.coinToTaka;
        }
        
        // Check for level up
        this.checkLevelUp();
        
        // Save data
        this.saveUserData(AppState.currentUser);
        
        // Update display
        this.updateUserDisplay();
    }
    
    static checkLevelUp() {
        const user = AppState.currentUser;
        const currentLevel = user.level;
        const totalCoinsEarned = (user.earnings * CONFIG.coinToTaka) + user.coins;
        
        // Calculate level based on total coins earned
        const newLevel = Math.floor(totalCoinsEarned / 500) + 1;
        
        if (newLevel > currentLevel) {
            user.level = newLevel;
            
            // Award level up bonus
            const levelBonus = newLevel * 5;
            user.coins += levelBonus;
            
            NotificationManager.show('success', 'Level Up!', `Congratulations! You reached Level ${newLevel}! Bonus: ${levelBonus} coins`);
            AudioManager.play('success');
            
            console.log(`🎊 User leveled up to Level ${newLevel}`);
        }
    }
    
    static addActivityHistory(activityName, coinsEarned) {
        if (!AppState.currentUser) return;
        
        const historyEntry = {
            activity: activityName,
            coins: coinsEarned,
            timestamp: new Date().toISOString(),
            sessionId: AppState.security.sessionStart
        };
        
        if (!AppState.currentUser.activityHistory) {
            AppState.currentUser.activityHistory = [];
        }
        
        AppState.currentUser.activityHistory.unshift(historyEntry);
        
        // Keep only last 50 activities
        if (AppState.currentUser.activityHistory.length > 50) {
            AppState.currentUser.activityHistory.splice(50);
        }
        
        // Update recent activities display
        this.updateRecentActivitiesDisplay();
    }
    
    static updateRecentActivitiesDisplay() {
        const container = document.getElementById('recentActivities');
        if (!container || !AppState.currentUser?.activityHistory) return;
        
        container.innerHTML = '';
        
        AppState.currentUser.activityHistory.slice(0, 5).forEach(activity => {
            const timeAgo = this.getTimeAgo(new Date(activity.timestamp));
            
            const activityElement = document.createElement('div');
            activityElement.className = 'flex items-center justify-between p-3 bg-white/5 rounded-lg mb-2';
            activityElement.innerHTML = `
                <div class="flex items-center">
                    <i class="fas fa-coins text-yellow-400 mr-3"></i>
                    <div>
                        <p class="text-white text-sm font-medium">${activity.activity} completed</p>
                        <p class="text-white/60 text-xs">${timeAgo}</p>
                    </div>
                </div>
                <span class="text-green-400 font-semibold">+${activity.coins} coins</span>
            `;
            
            container.appendChild(activityElement);
        });
    }
    
    static updateUserDisplay() {
        if (!AppState.currentUser) return;
        
        const user = AppState.currentUser;
        
        // Update main stats
        this.updateElement('totalCoins', user.coins?.toLocaleString() || '0');
        this.updateElement('totalDiamonds', user.diamonds?.toLocaleString() || '0');
        this.updateElement('totalEarnings', `${(user.earnings || 0).toFixed(2)} BDT`);
        this.updateElement('totalAchievements', user.achievements?.length || '0');
        
        // Update user info
        this.updateElement('userName', user.name);
        this.updateElement('userEmail', user.email);
        this.updateElement('userLevel', `Level ${user.level || 1}`);
        
        // Update avatar
        const avatar = document.getElementById('userAvatar') || document.getElementById('profileAvatar');
        if (avatar && user.name) {
            avatar.textContent = user.name.charAt(0).toUpperCase();
        }
        
        // Update level progress
        this.updateLevelProgress();
        
        // Update referral code
        this.updateElement('userReferralCode', user.referralCode);
        this.updateElement('referralCode', user.referralCode);
        
        console.log('🔄 User display updated');
    }
    
    static updateElement(id, value) {
        const element = document.getElementById(id);
        if (element && value !== undefined) {
            element.textContent = value;
        }
    }
    
    static updateLevelProgress() {
        const user = AppState.currentUser;
        if (!user) return;
        
        const currentLevelCoins = (user.level - 1) * 500;
        const nextLevelCoins = user.level * 500;
        const totalCoinsEarned = (user.earnings * CONFIG.coinToTaka) + user.coins;
        const progress = ((totalCoinsEarned - currentLevelCoins) / (nextLevelCoins - currentLevelCoins)) * 100;
        
        const progressFill = document.getElementById('levelProgressFill');
        const progressText = document.getElementById('levelProgressText');
        const nextLevelInfo = document.getElementById('nextLevelInfo');
        
        if (progressFill) {
            progressFill.style.width = `${Math.min(progress, 100)}%`;
        }
        
        if (progressText) {
            progressText.textContent = `${totalCoinsEarned - currentLevelCoins}/${nextLevelCoins - currentLevelCoins} coins earned`;
        }
        
        if (nextLevelInfo) {
            nextLevelInfo.textContent = `Level ${user.level + 1} - ${Math.max(0, nextLevelCoins - totalCoinsEarned)} coins needed`;
        }
    }
    
    static generateReferralCode() {
        return 'REF' + Math.random().toString(36).substr(2, 6).toUpperCase() + Date.now().toString().slice(-3);
    }
    
    static getTimeAgo(date) {
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        return `${Math.floor(diffInSeconds / 86400)} days ago`;
    }
    
    static async makeApiCall(data) {
        try {
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            });
            
            console.log('🌐 Making API call:', data.action);
            
            const response = await fetch(CONFIG.apiEndpoint, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const responseText = await response.text();
            
            try {
                return JSON.parse(responseText);
            } catch {
                if (responseText.includes('error') || responseText.includes('Error')) {
                    throw new Error(responseText);
                }
                return { status: 'success', message: responseText };
            }
        } catch (error) {
            console.error('❌ API call failed:', error);
            throw error;
        }
    }
}

// ===== NOTIFICATION MANAGEMENT SYSTEM =====
class NotificationManager {
    static notifications = [];
    static maxNotifications = 5;
    
    static show(type, title, message, duration = 5000) {
        const notification = {
            id: Date.now(),
            type,
            title,
            message,
            duration,
            timestamp: new Date()
        };
        
        this.notifications.unshift(notification);
        
        // Remove old notifications
        if (this.notifications.length > this.maxNotifications) {
            this.notifications.splice(this.maxNotifications);
        }
        
        this.renderNotification(notification);
        
        // Auto remove
        setTimeout(() => {
            this.removeNotification(notification.id);
        }, duration);
        
        console.log(`📢 Notification [${type.toUpperCase()}]: ${title} - ${message}`);
    }
    
    static renderNotification(notification) {
        const toastHtml = `
            <div class="notification-toast ${notification.type} show" id="notification-${notification.id}">
                <div class="flex items-start">
                    <i class="${this.getIcon(notification.type)} text-2xl mr-3 mt-1"></i>
                    <div class="flex-1">
                        <h4 class="text-white font-semibold mb-1">${notification.title}</h4>
                        <p class="text-white/80 text-sm">${notification.message}</p>
                    </div>
                    <button onclick="NotificationManager.removeNotification(${notification.id})" 
                            class="text-white/60 hover:text-white ml-2">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', toastHtml);
    }
    
    static removeNotification(id) {
        const notification = document.getElementById(`notification-${id}`);
        if (notification) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
        
        this.notifications = this.notifications.filter(n => n.id !== id);
    }
    
    static getIcon(type) {
        const icons = {
            success: 'fas fa-check-circle text-green-400',
            error: 'fas fa-exclamation-circle text-red-400',
            warning: 'fas fa-exclamation-triangle text-yellow-400',
            info: 'fas fa-info-circle text-blue-400'
        };
        
        return icons[type] || icons.info;
    }
    
    static clearAll() {
        this.notifications.forEach(notification => {
            this.removeNotification(notification.id);
        });
        this.notifications = [];
    }
}

// ===== AUDIO MANAGEMENT SYSTEM =====
class AudioManager {
    static audioEnabled = false;
    static sounds = {};
    
    static init() {
        // Enable audio on first user interaction
        document.addEventListener('click', this.enableAudio.bind(this), { once: true });
        document.addEventListener('touchstart', this.enableAudio.bind(this), { once: true });
        
        // Preload sounds
        this.preloadSounds();
    }
    
    static enableAudio() {
        this.audioEnabled = true;
        console.log('🔊 Audio enabled');
    }
    
    static preloadSounds() {
        const soundConfigs = {
            coin: 'https://assets.mixkit.co/sfx/preview/mixkit-coin-win-notification-1992.mp3',
            success: 'https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.mp3',
            error: 'https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3',
            warning: 'https://assets.mixkit.co/sfx/preview/mixkit-sci-fi-alarm-990.mp3',
            timer: 'https://assets.mixkit.co/sfx/preview/mixkit-game-show-clock-bleeps-888.mp3'
        };
        
        Object.keys(soundConfigs).forEach(key => {
            const audio = new Audio(soundConfigs[key]);
            audio.preload = 'auto';
            audio.volume = 0.3;
            this.sounds[key] = audio;
        });
    }
    
    static play(soundType) {
        if (!this.audioEnabled) return;
        
        const sound = this.sounds[soundType];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log('Sound play failed:', e));
        }
    }
    
    static setVolume(volume) {
        Object.values(this.sounds).forEach(sound => {
            sound.volume = Math.max(0, Math.min(1, volume));
        });
    }
    
    static mute() {
        this.audioEnabled = false;
    }
    
    static unmute() {
        this.audioEnabled = true;
    }
}

// ===== THEME MANAGEMENT SYSTEM =====
class ThemeManager {
    static currentTheme = 'light';
    
    static init() {
        // Detect system preference
        this.detectSystemTheme();
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (this.currentTheme === 'auto') {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
        
        // Load saved theme
        this.loadSavedTheme();
    }
    
    static detectSystemTheme() {
        const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.currentTheme = isDark ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
    }
    
    static loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.currentTheme = savedTheme;
            this.applyTheme(savedTheme);
        }
    }
    
    static toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
    
    static setTheme(theme) {
        this.currentTheme = theme;
        this.applyTheme(theme);
        this.saveTheme(theme);
        
        console.log(`🎨 Theme changed to: ${theme}`);
    }
    
    static applyTheme(theme) {
        const html = document.documentElement;
        const themeIcon = document.getElementById('themeIcon');
        
        if (theme === 'dark') {
            html.classList.add('dark');
            if (themeIcon) themeIcon.className = 'fas fa-sun';
        } else {
            html.classList.remove('dark');
            if (themeIcon) themeIcon.className = 'fas fa-moon';
        }
    }
    
    static saveTheme(theme) {
        localStorage.setItem('theme', theme);
    }
    
    static getCurrentTheme() {
        return this.currentTheme;
    }
}

// ===== UTILITY FUNCTIONS =====
class Utils {
    static formatCurrency(amount) {
        return `${amount.toFixed(2)} BDT`;
    }
    
    static formatNumber(num) {
        return num.toLocaleString();
    }
    
    static formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        } else if (minutes > 0) {
            return `${minutes}m ${secs}s`;
        } else {
            return `${secs}s`;
        }
    }
    
    static validateEmail(email) {
        return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email.toLowerCase());
    }
    
    static validateMobile(mobile) {
        return /^\+?[1-9]\d{1,14}$/.test(mobile);
    }
    
    static generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
    
    static copyToClipboard(text) {
        if (navigator.clipboard) {
            return navigator.clipboard.writeText(text);
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return Promise.resolve();
        }
    }
    
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// ===== MAIN APPLICATION CONTROLLER =====
class CoinEarnerApp {
    constructor() {
        this.version = CONFIG.appVersion;
        this.initialized = false;
    }
    
    async init() {
        if (this.initialized) return;
        
        console.log(`🚀 Initializing Coin Earner Pro v${this.version}`);
        
        try {
            // Initialize core systems
            this.securityManager = new SecurityManager();
            ThemeManager.init();
            AudioManager.init();
            
            // Load cooldowns
            CooldownManager.loadCooldowns();
            
            // Check authentication
            await this.checkAuthentication();
            
            // Setup global event listeners
            this.setupGlobalListeners();
            
            // Mark as initialized
            this.initialized = true;
            
            console.log('✅ Application initialized successfully');
            
        } catch (error) {
            console.error('❌ Failed to initialize application:', error);
            NotificationManager.show('error', 'Initialization Error', 'Failed to start the application properly.');
        }
    }
    
    async checkAuthentication() {
        // Check session storage for auth mode
        const authMode = sessionStorage.getItem('authMode');
        
        if (authMode === 'guest') {
            this.setGuestMode();
        } else {
            // Try to load user data
            const userData = localStorage.getItem('userData');
            if (userData) {
                try {
                    AppState.currentUser = JSON.parse(userData);
                    AppState.isAuthenticated = true;
                    UserManager.updateUserDisplay();
                } catch (error) {
                    console.error('Failed to parse user data:', error);
                    localStorage.removeItem('userData');
                }
            }
        }
    }
    
    setGuestMode() {
        AppState.isGuestMode = true;
        AppState.isAuthenticated = false;
        AppState.currentUser = null;
        
        // Show guest notice if element exists
        const guestNotice = document.getElementById('userStatusNotice');
        if (guestNotice) {
            guestNotice.classList.remove('hidden');
        }
    }
    
    setupGlobalListeners() {
        // Prevent page unload during activities
        window.addEventListener('beforeunload', (e) => {
            if (AppState.activities.inProgress) {
                e.preventDefault();
                e.returnValue = 'Activity in progress. Leaving will cancel it.';
                return 'Activity in progress. Leaving will cancel it.';
            }
        });
        
        // Handle page visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                AppState.sessionStats.timeSpent += Math.floor((Date.now() - AppState.security.sessionStart) / 1000);
            } else {
                AppState.security.sessionStart = Date.now();
            }
        });
        
        // Global error handler
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            NotificationManager.show('error', 'Application Error', 'An unexpected error occurred.');
        });
        
        // Global unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            NotificationManager.show('error', 'Network Error', 'A network or system error occurred.');
        });
    }
    
    // Global functions that need to be exposed
    static toggleTheme() {
        ThemeManager.toggleTheme();
    }
    
    static logout() {
        // Clear all data
        AppState.currentUser = null;
        AppState.isAuthenticated = false;
        AppState.isGuestMode = false;
        
        // Clear storage
        localStorage.removeItem('userData');
        sessionStorage.clear();
        
        // Redirect to auth page
        window.location.href = 'index.html';
    }
    
    static async registerUser(userData) {
        // This would be implemented in the auth page
        console.log('User registration:', userData);
    }
    
    static async loginUser(email, password) {
        // This would be implemented in the auth page
        console.log('User login:', email);
    }
    
    static async verifyEmail(code) {
        // This would be implemented in the auth page
        console.log('Email verification:', code);
    }
    
    static async sendVerificationEmail(userData) {
        // This would be implemented in the auth page
        console.log('Sending verification email to:', userData.email);
    }
}

// ===== GLOBAL FUNCTIONS FOR HTML ONCLICK HANDLERS =====
window.toggleTheme = () => CoinEarnerApp.toggleTheme();
window.logout = () => CoinEarnerApp.logout();
window.startEarningActivity = (type) => ActivityManager.startActivity(type);
window.ActivityManager = ActivityManager;
window.NotificationManager = NotificationManager;
window.hideModal = () => ActivityManager.hideModal();
window.copyReferralCode = () => {
    const code = document.getElementById('userReferralCode')?.textContent || 
                  document.getElementById('referralCode')?.textContent;
    if (code) {
        Utils.copyToClipboard(code).then(() => {
            NotificationManager.show('success', 'Copied!', 'Referral code copied to clipboard!');
        });
    }
};

// ===== AUTO-INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    window.coinEarnerApp = new CoinEarnerApp();
    window.coinEarnerApp.init();
});

// ===== ANTI-TAMPERING PROTECTION =====
(function() {
    'use strict';
    
    // Protect critical objects
    Object.freeze(CONFIG);
    Object.freeze(ActivityManager.activityConfigs);
    
    // Detect and prevent tampering
    const originalConsoleLog = console.log;
    const originalConsoleWarn = console.warn;
    const originalConsoleError = console.error;
    
    // Monitor console overrides
    Object.defineProperty(console, 'log', {
        get: () => originalConsoleLog,
        set: () => {
            SecurityManager.prototype.reportViolation('console_tampering', 'high');
        }
    });
    
    // Prevent direct access to critical functions
    const protectedFunctions = [
        'ActivityManager',
        'UserManager',
        'SecurityManager',
        'CooldownManager'
    ];
    
    protectedFunctions.forEach(funcName => {
        if (window[funcName]) {
            Object.freeze(window[funcName]);
        }
    });
    
    console.log('🔒 Anti-tampering protection active');
})();

// Export for module systems if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CoinEarnerApp,
        ActivityManager,
        UserManager,
        SecurityManager,
        CooldownManager,
        NotificationManager,
        AudioManager,
        ThemeManager,
        Utils
    };
}
