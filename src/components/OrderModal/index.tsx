import { Link } from "react-router-dom"
import Modal from "../Modal"
import styles from './OrderModal.module.scss'
import Swal from "sweetalert2"
import { Api } from "../../skds/api"
export const OrderModal = ({ onClose, order }: any) => {
    const orderApi = new Api('closed')

    const handlePay = () => {
        orderApi.createOrder(cart, 'wallet').then((data: any) => {

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
    console.log('cart:')
    const cart = order.cart
    console.log(order.cart)

    return (
        <Modal onClose={onClose}>
            {
                <span className={(order.status == 0) ? styles.unpaid : styles.paid}>{['Não pago', 'Pago'][order.status]}</span>

            }
            {cart.map((item: any) => (
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
            <div className={styles.buttons}>
                <button onClick={handlePay}>Pagar usando saldo</button>
            </div>
        </Modal >
    )
}