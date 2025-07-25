import React, { useState, useEffect } from 'react';
import { Api, TLoader } from '../../skds/api';
import styles from './Cart.module.scss';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { OrderModal } from '../../components/OrderModal';

const api = new Api('open')

const orderApi = new Api('closed')
const Cart: React.FC = () => {


  const [total, setTotal] = useState<number>(0);
  const [cart, setCart] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [order_, setOrder] = useState<any>({})
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
  const parseCart = async () => {

    let customer: any
    const cart = JSON.parse(localStorage.getItem('cart') ?? '[]')
    await api.getLoggedUser().then((user: any) => {
      customer = user
    }

    )
    cart.map(async (item: any) => {
      console.log('customer')
      console.log(customer)
    //  alert(1)
      item.customer = customer

    })
    localStorage.setItem('cart', JSON.stringify(cart))
    console.log(cart)
  }

  const handleOrder = () => {

    TLoader.tLoader(1, 'Carregando pedido')
    orderApi.getLoggedUser().then(user => {
      parseCart()
      if (!user) {
        document.location.href = '/login';
      } else {
        orderApi.createOrder(cart, 'wallet').then(({ data }: any) => {
          console.log('data:')
          console.log(data)
          TLoader.tLoader(0)

          if (data.error) {
            Swal.fire({
              icon: 'error',
              text: data.error
            })
          } else {
            localStorage.setItem('cart', '[]')
            document.location.href = '/minha-conta/pedidos/' + data.order.id
            setOrder(data.order)

          }
        })
      }
    })

  }



  useEffect(() => {
    parseCart()
    const currentCart = api.getCart()
    setCart(currentCart)
    calculateTotal(currentCart);

  }, []);

  return (
    <div className={styles.cartPage}>
      {
        isModalOpen && order_ ? (
          <OrderModal order={order_} onClose={() => {
            setIsModalOpen(false)
          }} />

        ) : null
      }
      <h2>Seu Carrinho</h2>
      <br />
      <Link to='/' className='link'>Voltar</Link>
      <br />
      <div className={styles.cartItems}>
        {
          cart.length === 0 ?
            (
              <p>Seu carrinho está vazio</p>
            ) :
            cart.map((product: any) => (
              <div key={product.id} className={styles.cartItem}>
                <Link to={`/produtos/${product.id}`}>
                  <img src={import.meta.env.VITE_API_URL + product.banner} alt={product.title} className={styles.banner} />

                  <div>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <p>R$ {product.price}</p>
                    <Link to={`/usuarios/${product.seller.id}`} className='link'>
                      {product.seller.username}
                    </Link>

                  </div>
                </Link>
                <button className={styles.removeBtn} onClick={() => removeFromCart(product.id)}  ><FaTrash />  </button>
              </div>
            ))

        }
      </div>
      <div className={styles.total}>
        <h5>Total: R${parseFloat(total.toString()).toFixed(2)}</h5>
      </div>
      {cart.length > 0 && <button className={styles.checkoutBtn} onClick={handleOrder}>Finalizar Compra</button>}
    </div >
  );
};

export default Cart;
