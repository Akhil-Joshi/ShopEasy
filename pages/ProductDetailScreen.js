// ProductDetailScreen.js

import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          <Text style={styles.productCategory}>Category: {product.category}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={24} color="#FFD700" />
            <Text style={styles.productRating}>{product.rating}</Text>
          </View>
          <Text style={styles.productDescription}>{product.description}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#00aaff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40, 
    paddingHorizontal: 20,
    backgroundColor: '#00aaff',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  productImage: {
    width: 220,
    height: 220, 
    borderRadius: 10,
    resizeMode: 'contain', // Maintain aspect ratio and fit within container
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  productName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  productPrice: {
    fontSize: 20,
    color: '#00aaff',
    marginBottom: 10,
    textAlign: 'center',
  },
  productCategory: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  productRating: {
    marginLeft: 8,
    fontSize: 20,
    color: '#FFD700',
  },
  productDescription: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 24,
  },
});

export default ProductDetailScreen;
