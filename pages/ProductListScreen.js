import React, { useContext, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';
import { CartContext } from '../App';

// Dummy data for products and categories
const products = [
  { id: '1', name: 'Product 1', price: 10.0, rating: 4.5, image: 'https://via.placeholder.com/100', category: 'Electronics', description: 'Product 1 Description' },
  { id: '2', name: 'Product 2', price: 20.0, rating: 4.0, image: 'https://via.placeholder.com/100', category: 'Clothing', description: 'Product 2 Description' },
  { id: '3', name: 'Product 3', price: 30.0, rating: 3.5, image: 'https://via.placeholder.com/100', category: 'Books', description: 'Product 3 Description' },
  { id: '4', name: 'Product 4', price: 40.0, rating: 4.8, image: 'https://via.placeholder.com/100', category: 'Beauty', description: 'Product 4 Description' },
  { id: '5', name: 'Product 5', price: 50.0, rating: 5.0, image: 'https://via.placeholder.com/100', category: 'Home', description: 'Product 5 Description' },
  { id: '6', name: 'Product 6', price: 60.0, rating: 4.2, image: 'https://via.placeholder.com/100', category: 'Sports', description: 'Product 6 Description' },
  { id: '7', name: 'Product 7', price: 70.0, rating: 3.8, image: 'https://via.placeholder.com/100', category: 'Toys', description: 'Product 7 Description' },
  { id: '8', name: 'Product 8', price: 80.0, rating: 4.7, image: 'https://via.placeholder.com/100', category: 'Automotive', description: 'Product 8 Description' },
  { id: '9', name: 'Product 9', price: 90.0, rating: 4.3, image: 'https://via.placeholder.com/100', category: 'Garden', description: 'Product 9 Description' },
  { id: '10', name: 'Product 10', price: 100.0, rating: 4.1, image: 'https://via.placeholder.com/100', category: 'Kitchen', description: 'Product 10 Description' },
  { id: '11', name: 'Product 11', price: 110.0, rating: 4.6, image: 'https://via.placeholder.com/100', category: 'Kitchen', description: 'Product 11 Description' },
];

const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Beauty', 'Home', 'Sports', 'Toys', 'Automotive', 'Garden', 'Kitchen'];
const numColumns = 2;
const screenWidth = Dimensions.get('window').width;
const itemWidth = (screenWidth - 48) / numColumns; // 16 padding on each side and 16 margin between items

const ProductListScreen = ({ navigation }) => {
  const { addToCart } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = products.filter(product =>
    (selectedCategory === 'All' || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === 'name') return a.name.localeCompare(b.name);
    if (sortOption === 'price') return a.price - b.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    return 0;
  });

  const navigateToProductDetail = (product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const renderItem = ({ item }) => (
    <View style={[styles.productContainer, { width: itemWidth }]}>
      <TouchableOpacity onPress={() => navigateToProductDetail(item)}>
        <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="cover" />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#ffd700" />
            <Text style={styles.productRating}>{item.rating}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item)}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.searchContainer}>
            <Icon name="search" size={20} color="#aaa" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search products"
              placeholderTextColor="#aaa"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Welcome')} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sortFilterContainer}>
          <View style={styles.dropdownContainer}>
            <RNPickerSelect
              onValueChange={(value) => setSortOption(value)}
              items={[
                { label: 'Default Sorting', value: 'default' },
                { label: 'Sort by Name', value: 'name' },
                { label: 'Sort by Price', value: 'price' },
                { label: 'Sort by Rating', value: 'rating' },
              ]}
              placeholder={{
                label: 'Sort',
                value: null,
              }}
              style={pickerSelectStyles}
            />
          </View>
          <View style={styles.dropdownContainer}>
            <RNPickerSelect
              onValueChange={(value) => setSelectedCategory(value)}
              items={categories.map(category => ({ label: category, value: category }))}
              placeholder={{
                label: 'Category',
                value: null,
              }}
              style={pickerSelectStyles}
            />
          </View>
        </View>
        <FlatList
          data={sortedProducts}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          numColumns={numColumns}
          key={numColumns} // Change key to force re-render
        />
      </View>
    </SafeAreaView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 18,
    color: '#000',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#fff',
    borderRadius: 18,
    color: '#000',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
});

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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 10,
    flex: 1,
    marginRight: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 18,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sortFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dropdownContainer: {
    width: '48%',
    height: 55,
    borderRadius: 18,
    overflow: 'hidden', // Ensures the border radius is applied to the children
    backgroundColor: '#fff', // Background color to see the border radius effect
  },
  productContainer: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  productDetails: {
    padding: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  productRating: {
    marginLeft: 5,
    fontSize: 14,
  },
  addToCartButton: {
    backgroundColor: '#00cc44',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});


export default ProductListScreen;
