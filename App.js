// App.js
import * as React from 'react';
import { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import WelcomeScreen from './pages/WelcomeScreen';
import SignUpScreen from './pages/SignUpScreen';
import LoginScreen from './pages/LoginScreen';
import ProductListScreen from './pages/ProductListScreen';
import ProductDetailScreen from './pages/ProductDetailScreen';
import CartScreen from './pages/CartScreen'; // Create this component

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Create CartContext
const CartContext = createContext();

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Cart') {
          iconName = 'shopping-cart';
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarStyle: {
        backgroundColor: '#00aaff',
      },
      tabBarActiveTintColor: 'lime', // Active tab color
      tabBarInactiveTintColor: 'white', // Inactive tab color
    })}
  >
    <Tab.Screen name="Home" component={ProductListScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
);

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems(prevItems => [...prevItems, { ...product, quantity: 1 }]);
    }
  };

  const removeItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const incrementQuantity = (itemId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (itemId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeItem, incrementQuantity, decrementQuantity }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ProductList" component={HomeTabs} options={{ headerShown: false }} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartContext.Provider>
  );
};

export default App;
export { CartContext }; // Export the context for use in other components
