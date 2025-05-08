import { Link } from "react-router-dom"
import Modal from "../Modal"
import styles from './OrderModal.module.scss'
import Swal from "sweetalert2"
import { Api, TLoader } from "../../skds/api"
import { useEffect, useState } from "react"
export const OrderModal = ({ onClose, order }: any) => {
    const [total, setTotal] = useState<number>(0)
    const [cart, setCart] = useState([])
    const orderApi = new Api('closed')

    const handlePay = () => {
        TLoader.tLoader(1)
        orderApi.createOrder(cart, 'wallet').then((data: any) => {
            TLoader.tLoader(0)
            console.log('data:')
            console.log(data)
            if (data.data.order && data.data.order.status == 1) {
                Swal.fire({
                    icon: 'success',
                    text: data.data.message
                }).then(() => {
                    document.location.href = '/minha-conta/compras'
                })
            } else if (data.data.error) {
                Swal.fire({
                    icon: 'error',
                    text: data.data.error,

                })
            }
            return
            if (data.order.includes('mercadopago')) {
                localStorage.setItem('cart', '[]');
                document.location.href = data.order
                Swal.fire({
                    icon: 'success',
                    text: 'Redirecionando você para a página de pagamento',
                    showConfirmButton: false
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    text: 'Erro inesperado, por favor contate o suporte'
                })
            }
            console.log(data)
        })
    }
    useEffect(() => {
        console.log('cart:')
        setCart(order.cart)
        let finalPrice = 0
        order.cart.map((item: any) => {
            finalPrice += parseFloat(item.price)
        })
        setTotal(finalPrice)
       
    }, [])


    return (
        <Modal onClose={onClose}>
            {
                <span className={(order.status == 0) ? styles.unpaid : styles.paid}>{['Não pago', 'Pago'][order.status]}</span>

            }
            {cart?.map((item: any) => (
                <Link to={`/produtos/${item.id}`} key={item.id}>
                    <div className={styles.item}>
                        <img className={styles.banner} src={import.meta.env.VITE_API_URL + item.banner} alt="" />
                        <div>
                            <h5>{item.title}</h5>
                            <span>R$ {item.price}</span>
                        </div>
                    </div>
                </Link>
            ))}
            <h3>Total: R$ {total}</h3>
            {order.status == 0 ? (
                <div className={styles.buttons} >
                    <button onClick={handlePay}>Pagar usando saldo</button>
                </div>) : null
            }
        </Modal >
    )
}