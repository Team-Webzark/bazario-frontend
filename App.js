// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// --- STARTUP & AUTH ---
import SplashScreen from './panels/customer/screens/SplashScreen';
import UniversalSignInScreen from './panels/universalLogins/screens/UniversalSignInScreen';
import OtpVerificationScreen from './panels/universalLogins/screens/OtpVerificationScreen';

// --- CUSTOMER REGISTRATION FLOW ---
import CustomerRegistrationScreen from './panels/customer/screens/CustomerRegistrationScreen';
import HouseholdProfileStep1 from './panels/customer/screens/HouseholdProfileStep1';
import HouseholdProfileStep2 from './panels/customer/screens/HouseholdProfileStep2';
import LocationCaptureScreen from './panels/customer/screens/LocationCaptureScreen';

// --- NAVIGATORS ---
import CustomerNavigator from './navigation/CustomerNavigator';

// --- PLACEHOLDER DASHBOARDS (Temporary until full navigators are built) ---
import AdminDashboardScreen from './panels/admin/screens/AdminDashboardScreen';
import DeliveryDashboardScreen from './panels/delivery/screens/DeliveryDashboardScreen';

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        
        {/* 1. Startup Flow */}
        <RootStack.Screen name="Splash" component={SplashScreen} />

        {/* 2. Authentication Flow */}
        <RootStack.Screen name="UniversalSignIn" component={UniversalSignInScreen} />
        <RootStack.Screen name="OtpVerification" component={OtpVerificationScreen} />

        {/* 3. Customer Registration Flow */}
        <RootStack.Screen name="CustomerRegistration" component={CustomerRegistrationScreen} />
        <RootStack.Screen name="HouseholdProfileStep1" component={HouseholdProfileStep1} />
        <RootStack.Screen name="HouseholdProfileStep2" component={HouseholdProfileStep2} />
        <RootStack.Screen name="LocationCapture" component={LocationCaptureScreen} />

        {/* 4. Main App Flows (Role-based Dashboards) */}
        <RootStack.Screen name="CustomerApp" component={CustomerNavigator} />
        <RootStack.Screen name="AdminApp" component={AdminDashboardScreen} />
        <RootStack.Screen name="DeliveryApp" component={DeliveryDashboardScreen} />
        
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
