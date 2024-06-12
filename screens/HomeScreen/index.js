import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = () => {
    const url = category === 'all' ? 'https://fakestoreapi.com/products' : `https://fakestoreapi.com/products/category/${category}`;
    axios.get(url).then(response => {
      setProducts(response.data);
    }).catch(error => {
      console.error(error);
    });
  };

  const categories = ['all', 'electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing'];

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        {categories.map(cat => (
          <TouchableOpacity key={cat} onPress={() => setCategory(cat)}>
            <Text style={styles.navItem}>{cat}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.navItem}>Logout</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Text>{item.title}</Text>
            <Button title="Add to Cart" onPress={() => addToCart(item)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  navbar: { flexDirection: 'row', justifyContent: 'space-around' },
  navItem: { fontSize: 16, padding: 10 },
  product: { marginVertical: 10, padding: 10, borderWidth: 1, borderColor: '#ccc' }
});
