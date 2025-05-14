import { useEffect, useState } from 'react'
import styles from './Order.module.scss'
import { Api, TLoader } from '../../skds/api'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const api = new Api('closed')

const Order = () => {
    const [order, setOrder] = useState<any>({})
    const { id } = useParams<any>()
    alert(id)
    useEffect(() => {
        console.log('here 2')
        if (id) {
            TLoader.tLoader(1, 'Carregando pedido...')
            api.getOrder(parseInt(id.toString())).then((data: any) => {
                setOrder(data)
                console.log('order')
                console.log(data)
                TLoader.tLoader(0)
            }).catch(err => {
                alert(0)
                console.log(err)
            })
        } else {
            Swal.fire({
                icon: 'warning',
                text: 'Pedido não encontrado'
            })
        }
    }, [])

    return (

        order.items ?
            order.items.map((seller: any) => (
                < div className={styles.order} >
                    <div className={styles.seller}>
                        <img src={import.meta.env.VITE_API_URL + order.seller.avatar} alt="" />
                        <h4>{seller.username}</h4>
                    </div>
                    <div className={styles.items}>
                        {
                            order.items.map((item: any) => (
                                <div className={styles.item}>
                                    <img src={import.meta.env.VITE_API_URL + item.banner} alt="" />
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        Valor Final: {order.price}
                    </div>
                    {
                        [
                            <span className="badge green">Não pago</span>,
                            <span className="badge red">Pago</span>,
                        ]
                        [order.status]
                    }

                </div >
            ))
            : <></>)

}
export default Order