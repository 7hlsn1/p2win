import { useEffect, useState } from 'react'
import styles from './Order.module.scss'
import { Api, TLoader } from '../../skds/api'
import { useParams } from 'react-router-dom'
// import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
const api = new Api('closed')

const Order = function () {
    const [order, setOrder] = useState<any>({})
    const [user, setUser] = useState<any>({})
    const { id } = useParams<any>()

    const handlePay = () => {
        if (parseFloat(order.price) > parseFloat(user.wallet)) {
            return Swal.fire({
                icon: 'warning',
                text: 'Saldo insuficiente'
            })
        } else {
            TLoader.tLoader(1, 'Processando pagamento')
            api.payOrder(order.id).then((data: any) => {
                console.log(data)
            }).catch((err: any) => {
                console.log(err)
            })
        }
    }
    useEffect(() => {

        console.log('here 2 ' + id)

        TLoader.tLoader(1, 'Carregando pedido...')
        api.getOrder(parseInt(id ?? '')).then((data: any) => {
            api.getLoggedUser().then((user: any) => {

                setOrder(data)
                setUser(user)

                console.log('order')
                console.log(data)
                TLoader.tLoader(0)
            })

        }).catch(err => {
            alert(0)
            console.log(err)
        })

    }
        , [])

    return (

        order.cart ?
            (
                < div className={styles.order} key={order.id}>

                    <div className={styles.header}>
                        {
                            [
                                <span className={styles.unpaid}>Não pago</span>,
                                <span className={styles.paid}>Pago</span>,
                            ]
                            [order.status]
                        }
                    </div>


                    <div className={styles.items}>
                        <h3>Itens do pedido</h3>
                        {
                            order.cart.map((item: any) => (

                                <div className={styles.item} key={item.id}>
                                    <div>
                                        <Link to={`/produtos/${item.id}`}>
                                            <h4 className={styles.title}>{item.title}</h4>
                                        </Link>
                                    </div>
                                    <img src={import.meta.env.VITE_API_URL + item.banner} alt="" />
                                    <span className={styles.foot}>

                                        <span className={styles.price}>
                                            R$ <b>{item.price}</b>
                                        </span>

                                        <Link to={'/usuarios/' + item.user.id} className='link'>
                                            {item.user.username}
                                        </Link>
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.footer}>
                        <div>
                            Valor Final: R$ {order.price}<br />

                        </div>
                        <button className='success' onClick={handlePay}>Pagar agora</button>

                    </div>



                </div >
            )

            : <>a</>
    )

}
export default Order