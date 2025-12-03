// navigation/DeliveryNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../panels/delivery/screens/DeliveryDashboardScreen';
import OrderRequestModal from '../panels/delivery/screens/OrderRequestModal';
import NavigateToShopScreen from '../panels/delivery/screens/NavigateToShopScreen';
import PickupVerificationScreen from '../panels/delivery/screens/PickupVerificationScreen';
import NavigateToCustomerScreen from '../panels/delivery/screens/NavigateToCustomerScreen';
import DeliveryConfirmationScreen from '../panels/delivery/screens/DeliveryConfirmationScreen';
import SuccessScreen from '../panels/delivery/screens/SuccessScreen';
import EarningsScreen from '../panels/delivery/screens/EarningsScreen';
import ProfileScreen from '../panels/delivery/screens/ProfileScreen';
import HelpScreen from '../panels/delivery/screens/HelpScreen';

const Stack = createNativeStackNavigator();

const DeliveryNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="DeliveryHome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="DeliveryHome" component={HomeScreen} />
      <Stack.Screen name="OrderRequestModal" component={OrderRequestModal} />
      <Stack.Screen name="NavigateToShop" component={NavigateToShopScreen} />
      <Stack.Screen name="PickupVerification" component={PickupVerificationScreen} />
      <Stack.Screen name="NavigateToCustomer" component={NavigateToCustomerScreen} />
      <Stack.Screen name="DeliveryConfirmation" component={DeliveryConfirmationScreen} />
      <Stack.Screen name="DeliverySuccess" component={SuccessScreen} />
      <Stack.Screen name="DeliveryEarnings" component={EarningsScreen} />
      <Stack.Screen name="DeliveryProfile" component={ProfileScreen} />
      <Stack.Screen name="DeliveryHelp" component={HelpScreen} />
    </Stack.Navigator>
  );
};

export default DeliveryNavigator;

