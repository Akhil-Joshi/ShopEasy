import React, { useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CartContext } from '../App';

const CartScreen = () => {
  const { cartItems, removeItem, incrementQuantity, decrementQuantity } = useContext(CartContext);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const handlecheckout = ()=>{
    alert('Checkout Clicked\n Handle it yourself ')
  }

  const renderItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Image source={{ uri: item.image }} style={styles.cartItemImage} resizeMode="cover" />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => decrementQuantity(item.id)}>
            <Icon name="minus" size={20} color="#888" style={styles.quantityButton} />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => incrementQuantity(item.id)}>
            <Icon name="plus" size={20} color="#888" style={styles.quantityButton} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeItem(item.id)}>
        <Icon name="trash" size={20} color="#ff4444" style={styles.removeIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.cartList}
        />
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ${getTotalPrice().toFixed(2)}</Text>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText} onPress={handlecheckout}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#00aaff',
    paddingTop: 25,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#00aaff',
  },
  cartList: {
    paddingBottom: 20,
  },
  cartItemContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
  },
  cartItemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  cartItemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    paddingHorizontal: 10,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  removeIcon: {
    // paddingHorizontal: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 15,
    marginTop: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#00cc44',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CartScreen;
