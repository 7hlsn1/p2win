import React, { useState, useEffect } from 'react';
import { Api } from '../../skds/api';
import styles from './Cart.module.scss';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa6';
const api = new Api('open')
const Cart: React.FC = () => {

  const [total, setTotal] = useState<number>(0);
  const [cart, setCart] = useState<any>([]);


  const removeFromCart = (productId: number) => {
    const newCart = api.removeFromCart(productId)
    setCart(newCart)
    calculateTotal(newCart)
  };

  const calculateTotal = (cart_: any) => {
    let newTotal = 0
    const prices = cart_.map((item: any) => parseFloat(item.price))
    newTotal = prices.reduce((a: number, c: number) => (a + c), newTotal)
    setTotal(newTotal)

  };
  const handleOrder = () => {
    const orderApi = new Api('closed')
    orderApi.createOrder(cart).then((data: any) => {
      console.log(data)
    })
  }



  useEffect(() => {
    const currentCart = api.getCart()
    setCart(currentCart)
    calculateTotal(currentCart);

  }, []);

  return (
    <div className={styles.cartPage}>
      <h2>Seu Carrinho</h2>
      <br />
      <Link to='/' className='link'>Voltar</Link>
      <br />
      <div className={styles.cartItems}>
        {cart.length === 0 ? (
          <p>Seu carrinho está vazio</p>
        ) : (
          cart.map((product: any) => (
            <div key={product.id} className={styles.cartItem}>
              <img src={import.meta.env.VITE_API_URL + product.banner} alt={product.title} className={styles.banner} />
              <div>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p>R$ {product.price}</p>
                <Link to={`/usuarios/${product.user.id}`} className='link'>
                  {product.user.username}
                </Link>
              </div>
              <button onClick={() => removeFromCart(product.id)} style={{ backgroundColor: 'rgb(221, 76, 76)', color: 'white', position: 'absolute', right: 10, bottom: 10 }}><FaTrash /> Remover</button>
            </div>
          ))
        )}
      </div>
      <div className={styles.total}>
        <h5>Total: R${parseFloat(total.toString()).toFixed(2)}</h5>
      </div>
      {cart.length > 0 && <button className={styles.checkoutBtn} onClick={handleOrder}>Finalizar Compra</button>}
    </div>
  );
};

export default Cart;
