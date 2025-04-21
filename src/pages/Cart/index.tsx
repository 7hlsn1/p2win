import React, { useState, useEffect } from 'react';
import { Api, Product } from '../../skds/api'; 
import styles from './Cart.module.scss';

const Cart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Função para remover do carrinho
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  const calculateTotal = () => {
    const totalAmount = cart.reduce((acc, product) => acc + product.price, 0);
    setTotal(totalAmount);
  };

  useEffect(() => {
    const api = new Api();
    api.getProducts().then((products: Product[]) => {
      console.log(products); 
    });
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  return (
    <div className={styles.cartPage}>
      <h2>Seu Carrinho</h2>
      <div className={styles.cartItems}>
        {cart.length === 0 ? (
          <p>Seu carrinho está vazio</p>
        ) : (
          cart.map((product) => (
            <div key={product.id} className={styles.cartItem}>
              <img src={product.banner} alt={product.title} />
              <div>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p>R${product.price.toFixed(2)}</p>
              </div>
              <button onClick={() => removeFromCart(product.id)}>Remover</button>
            </div>
          ))
        )}
      </div>
      <div className={styles.total}>
        <h3>Total: R${total.toFixed(2)}</h3>
      </div>
      {cart.length > 0 && <button className={styles.checkoutBtn}>Finalizar Compra</button>}
    </div>
  );
};

export default Cart;
