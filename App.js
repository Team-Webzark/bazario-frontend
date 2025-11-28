import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// --- AUTH & ONBOARDING ---
import SplashScreen from './panels/customer/screens/SplashScreen';
import OnboardingCarouselScreen from './panels/customer/screens/OnboardingCarouselScreen';

// --- UNIVERSAL LOGIN ---
import RoleSelectionScreen from './panels/universalLogins/screens/RoleSelectionScreen';
import MobileNumberInputScreen from './panels/universalLogins/screens/MobileNumberInputScreen';
import OtpVerificationScreen from './panels/universalLogins/screens/OtpVerificationScreen';
import PasswordLoginScreen from './panels/universalLogins/screens/PasswordLoginScreen';
import SelectOrSwitchRoleScreen from './panels/universalLogins/screens/SelectOrSwitchRoleScreen';
import AccountBlockedScreen from './panels/universalLogins/screens/AccountBlockedScreen';

// --- NAVIGATORS ---
import CustomerNavigator from './navigation/CustomerNavigator';
// import DeliveryNavigator from './navigation/DeliveryNavigator'; // Future
// import AdminNavigator from './navigation/AdminNavigator'; // Future

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        
        {/* 1. Startup Flow */}
        <RootStack.Screen name="Splash" component={SplashScreen} />
        <RootStack.Screen name="OnboardingCarousel" component={OnboardingCarouselScreen} />

        {/* 2. Auth Flow */}
        <RootStack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        <RootStack.Screen name="MobileNumberInput" component={MobileNumberInputScreen} />
        <RootStack.Screen name="OtpVerification" component={OtpVerificationScreen} />
        <RootStack.Screen name="PasswordLogin" component={PasswordLoginScreen} />
        <RootStack.Screen name="SelectOrSwitchRole" component={SelectOrSwitchRoleScreen} />
        <RootStack.Screen name="AccountBlocked" component={AccountBlockedScreen} />

        {/* 3. Main App Flows */}
        <RootStack.Screen name="CustomerApp" component={CustomerNavigator} />
        
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
