# New Universal Login Flow

## Overview
A single, unified login system that automatically detects user roles based on email addresses and routes users to their respective dashboards.

## Flow Structure

### 1. **Splash Screen** (Loading)
- Beautiful animated logo screen
- Shows for 2.5 seconds
- Navigates to Universal Sign In

### 2. **Universal Sign In Screen**
- User enters email address
- Two sign-in options:
  - **Sign in with Email**: Sends OTP to email
  - **Sign in with Google**: Google OAuth (coming soon)
- **"Don't have an account?"** option:
  - If clicked, still verifies email with OTP first
  - Then routes to customer registration if email is new

### 3. **OTP Verification Screen**
- User enters 4-digit OTP code
- **Auto-detects user role** based on email:
  - If email is in predefined admin list → Routes to **Admin Dashboard**
  - If email is in predefined delivery list → Routes to **Delivery Partner Dashboard**
  - If email is new/not predefined → Routes to **Customer Registration**

### 4. **Role-Based Routing**
After successful OTP verification:
- **Admin** → `AdminApp` (Admin Dashboard)
- **Delivery Partner** → `DeliveryApp` (Delivery Dashboard)
- **New Customer** → `CustomerRegistration` (Account creation flow)

## Predefined Users Configuration

### Location: `config/userRoles.js`

**Admin Emails:**
- admin@bazario.com
- admin1@bazario.com
- administrator@bazario.com

**Delivery Partner Emails:**
- delivery@bazario.com
- delivery1@bazario.com
- driver@bazario.com
- deliverypartner@bazario.com

### Adding New Predefined Users
Edit `config/userRoles.js` and add emails to the respective arrays.

## Features

✅ **Automatic Role Detection**: No need for users to select their role
✅ **Single Sign-In Screen**: Unified login for all user types
✅ **Email Verification**: OTP verification for security
✅ **Smart Routing**: Automatically routes to correct dashboard
✅ **New Customer Detection**: Automatically detects and routes new customers to registration

## Testing

### Test Admin Login:
1. Enter: `admin@bazario.com`
2. Enter OTP: `1234`
3. Should route to Admin Dashboard

### Test Delivery Login:
1. Enter: `delivery@bazario.com`
2. Enter OTP: `1234`
3. Should route to Delivery Dashboard

### Test New Customer:
1. Enter any email NOT in predefined list (e.g., `newuser@example.com`)
2. Click "Don't have an account?" or just sign in
3. Enter OTP: `1234`
4. Should route to Customer Registration

## Next Steps

The customer registration flow will be implemented next. The `CustomerRegistrationScreen` is currently a placeholder waiting for the registration steps to be defined.

