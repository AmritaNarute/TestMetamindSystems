import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = () => {
    const url = category === 'all' ? 'https://fakestoreapi.com/products' : `https://fakestoreapi.com/products/category/${category}`;
    axios.get(url).then(response => {
      console.log("Product:", response.data);
      setProducts(response.data);
    }).catch(error => {
      console.error(error);
    });
  };

  const categories = ['all', 'electronics', 'jewelery', "men's clothing", "women's clothing"];

  const addToCart = (product) => {
    navigation.navigate('Cart', { product });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerIcon}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={35}
            color={"black"}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Home</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.navbar}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            onPress={() => setCategory(cat)}
            style={[
              styles.navItem,
              category === cat && styles.selectedNavItem,
            ]}
          >
            <Text
              style={[
                styles.navItemText,
                category === cat && styles.selectedNavItemText,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.logoutclass}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
            <Button title="Add to Cart" onPress={() => addToCart(item)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: {
    marginTop: '10%',
    marginHorizontal: 12,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  headerIcon: {
    position: "absolute",
    left: 0,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700'
  },
  navbar: {
    flexDirection: 'row',
    marginVertical: 10,
    // paddingVertical: 5,
  },
  navItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  navItemText: {
    fontSize: 12,
  },
  selectedNavItem: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  selectedNavItemText: {
    color: '#fff',
  },
  logoutclass: {
    padding: 6,
    marginBottom: 10
  },
  logoutText: {
    fontSize: 16,
    color: 'red',

  },
  product: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
    marginBottom: 10,
  },
});
