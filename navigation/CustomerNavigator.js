import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// --- IMPORT YOUR REAL FILES ---
// Tabs
import HomeScreen from '../panels/customer/screens/HomeScreen';
import OrdersTabScreen from '../panels/customer/screens/OrdersTabScreen';
import RecipeHomeScreen from '../panels/customer/screens/RecipeHomeScreen';
import AccountScreen from '../panels/customer/screens/AccountScreen';

// Full Screens (Shopping)
import CartScreen from '../panels/customer/screens/CartScreen';
import SearchScreen from '../panels/customer/screens/SearchScreen';
import SearchResultsScreen from '../panels/customer/screens/SearchResultsScreen';
import CategoryListingScreen from '../panels/customer/screens/CategoryListingScreen';
import ProductDetailScreen from '../panels/customer/screens/ProductDetailScreen';

// Full Screens (Checkout & Orders)
import AddressSelectionScreen from '../panels/customer/screens/AddressSelectionScreen';
import TimeSlotSelectionScreen from '../panels/customer/screens/TimeSlotSelectionScreen';
import PaymentScreen from '../panels/customer/screens/PaymentScreen';
import OrderConfirmationScreen from '../panels/customer/screens/OrderConfirmationScreen';
import OrderDetailsScreen from '../panels/customer/screens/OrderDetailsScreen';
import OrderTrackingScreen from '../panels/customer/screens/OrderTrackingScreen';
import OrderRatingScreen from '../panels/customer/screens/OrderRatingScreen';
import DeliveryArrivalScreen from '../panels/customer/screens/DeliveryArrivalScreen';

// Full Screens (Onboarding)
import HouseholdProfileStep1 from '../panels/customer/screens/HouseholdProfileStep1';
import HouseholdProfileStep2 from '../panels/customer/screens/HouseholdProfileStep2';
import LocationCaptureScreen from '../panels/customer/screens/LocationCaptureScreen';

// Full Screens (Recipes)
import RecipeDetailScreen from '../panels/customer/screens/RecipeDetailScreen';

// Full Screens (Account Management)
import SavedAddressesScreen from '../panels/customer/screens/SavedAddressesScreen';
import PaymentMethodsScreen from '../panels/customer/screens/PaymentMethodsScreen';
import NotificationsSettingsScreen from '../panels/customer/screens/NotificationsSettingsScreen';
import IssueReportingScreen from '../panels/customer/screens/IssueReportingScreen';
import PreferencesEditScreen from '../panels/customer/screens/PreferencesEditScreen'; // New Import

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 1. Bottom Tabs Configuration
function CustomerTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#12783D', // Brand Green
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { height: 60, paddingBottom: 8, paddingTop: 8 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'HomeTab') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'OrdersTab') iconName = focused ? 'receipt' : 'receipt-outline';
          else if (route.name === 'RecipesTab') iconName = focused ? 'restaurant' : 'restaurant-outline';
          else if (route.name === 'AccountTab') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="OrdersTab" component={OrdersTabScreen} options={{ title: 'Orders' }} />
      <Tab.Screen name="RecipesTab" component={RecipeHomeScreen} options={{ title: 'Recipes' }} />
      <Tab.Screen name="AccountTab" component={AccountScreen} options={{ title: 'Account' }} />
    </Tab.Navigator>
  );
}

// 2. Main Stack Configuration
export default function CustomerNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      {/* Main Entry: Tabs */}
      <Stack.Screen name="CustomerTabs" component={CustomerTabNavigator} />

      {/* Onboarding / Profile Setup */}
      <Stack.Screen name="HouseholdProfileStep1" component={HouseholdProfileStep1} />
      <Stack.Screen name="HouseholdProfileStep2" component={HouseholdProfileStep2} />
      <Stack.Screen name="LocationCapture" component={LocationCaptureScreen} />

      {/* Shopping Flow */}
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
      <Stack.Screen name="CategoryListing" component={CategoryListingScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />

      {/* Recipes Flow */}
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />

      {/* Checkout Flow */}
      <Stack.Screen name="AddressSelection" component={AddressSelectionScreen} />
      <Stack.Screen name="TimeSlotSelection" component={TimeSlotSelectionScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />

      {/* Order Management */}
      <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
      <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
      <Stack.Screen 
        name="OrderRating" 
        component={OrderRatingScreen} 
        options={{ presentation: 'modal' }} 
      />
      <Stack.Screen name="DeliveryArrival" component={DeliveryArrivalScreen} />

      {/* Account Management */}
      <Stack.Screen name="SavedAddresses" component={SavedAddressesScreen} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
      <Stack.Screen name="NotificationsSettings" component={NotificationsSettingsScreen} />
      <Stack.Screen name="IssueReporting" component={IssueReportingScreen} />
      <Stack.Screen name="PreferencesEdit" component={PreferencesEditScreen} />
      
    </Stack.Navigator>
  );
}
