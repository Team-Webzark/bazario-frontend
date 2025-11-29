# Unused Screens Report

## Summary
This report identifies screens that exist in the project but are **not registered** in any navigator.

---

## 🚫 Unused Universal Login Screens (5 screens)

### 1. `panels/universalLogins/screens/ForgotPasswordScreen.js`
- **Status**: ❌ Not imported or registered in any navigator
- **Suggested Action**: Add to `App.js` if forgot password flow is needed

### 2. `panels/universalLogins/screens/GoogleSignInScreen.js`
- **Status**: ❌ Not imported or registered in any navigator
- **Suggested Action**: Add to `App.js` if Google Sign-In is needed

### 3. `panels/universalLogins/screens/LoginLoadingScreen.js`
- **Status**: ❌ Not imported or registered in any navigator
- **Suggested Action**: Add to `App.js` if loading state screen is needed

### 4. `panels/universalLogins/screens/RoleNotAllowedScreen.js`
- **Status**: ❌ Not imported or registered in any navigator
- **Suggested Action**: Add to `App.js` if role restriction error handling is needed

### 5. `panels/universalLogins/screens/TermsPrivacyScreen.js`
- **Status**: ❌ Not imported or registered in any navigator
- **Suggested Action**: Add to `App.js` if Terms & Privacy display is needed

---

## 🚫 Unused Customer Screens (3 screens)

### 1. `panels/customer/screens/LoginScreen.js`
- **Status**: ❌ Not imported or registered in any navigator
- **Reason**: Duplicate - Using universal login flow instead
- **Suggested Action**: Remove if not needed, or integrate if customer-specific login is required

### 2. `panels/customer/screens/OtpVerificationScreen.js`
- **Status**: ❌ Not imported or registered in any navigator
- **Reason**: Duplicate - Using `panels/universalLogins/screens/OtpVerificationScreen.js` instead
- **Suggested Action**: Remove if duplicate, or use this one if customer-specific OTP flow is needed

### 3. `panels/customer/screens/PantryManagementScreen.js`
- **Status**: ❌ Not imported in `CustomerNavigator.js` (even though screen exists)
- **Suggested Action**: Add to `CustomerNavigator.js` if pantry management feature is needed

---

## ✅ Currently Used Screens

### Universal Login (6 screens)
- ✅ RoleSelectionScreen
- ✅ MobileNumberInputScreen
- ✅ OtpVerificationScreen (universalLogins version)
- ✅ PasswordLoginScreen
- ✅ SelectOrSwitchRoleScreen
- ✅ AccountBlockedScreen

### Customer Screens (28 screens)
All other customer screens are properly registered and in use.

---

## 📝 Recommendations

1. **Decide on duplicate screens**: 
   - Choose between customer `LoginScreen` vs universal login flow
   - Choose between customer `OtpVerificationScreen` vs universal one

2. **Add missing screens if needed**:
   - PantryManagementScreen - likely needed for account management
   - ForgotPasswordScreen - common authentication feature
   - TermsPrivacyScreen - legal requirement

3. **Remove unused screens** if they're truly not needed to reduce codebase clutter

