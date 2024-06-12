import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function CartScreen({ route, navigation }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (route.params?.product) {
      addProductToCart(route.params.product);
    }
  }, [route.params?.product]);

  const addProductToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeProductFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
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
      <FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
            <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
            <View style={styles.quantityContainer}>
              <Button title="+" onPress={() => addProductToCart(item)} />
              <Button title="-" onPress={() => removeProductFromCart(item.id)} />
            </View>
          </View>
        )}
      />
      <Text style={styles.totalPrice}>Total: ${getTotalPrice()}</Text>
      <Button title="Checkout" onPress={() => alert('Proceed to Checkout')} />
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
  product: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flexDirection: 'column',
    alignItems: 'center'
  },
  productImage: {
    width: 150,
    height: 150,
    marginBottom: 10
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center'
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
    marginBottom: 10
  },
  productQuantity: {
    fontSize: 14,
    marginBottom: 10
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%'
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10
  }
});
