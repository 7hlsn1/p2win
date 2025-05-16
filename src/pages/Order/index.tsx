import { useEffect, useState } from 'react'
import styles from './Order.module.scss'
import { Api, TLoader } from '../../skds/api'
import { useParams } from 'react-router-dom'
// import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import moment from 'moment'
const api = new Api('closed')

const Order = function () {
    const messageModel = {
        content: String,
        type: String,
        from: String,
        created_at: String
    }

    const [order, setOrder] = useState<any>({})
    const [user, setUser] = useState<any>({})
    const [profile, setProfile] = useState<any>({})
    const [sellerChat, setSellerChat] = useState<any>(false)
    const [message, setMessage] = useState<any>(messageModel)
    const [messages, setMessages] = useState<any>([messageModel])
    const { id } = useParams<any>()

    const handleCancel = () => {
        Swal.fire({
            icon: 'success',
            text: 'Pedido cancelado com sucesso'
        })
    }
    const handlePay = () => {
        if (parseFloat(order.price) > parseFloat(user.wallet)) {
            return Swal.fire({
                icon: 'warning',
                text: 'Saldo insuficiente'
            })
        } else {
            TLoader.tLoader(1, 'Processando pagamento')
            api.payOrder(order.id).then(() => {
                TLoader.tLoader(0)
                Swal.fire({
                    icon: 'success',
                    text: 'Pedido aprovado'
                })
                return document.location.reload()

            }).catch((err: any) => {
                console.log(err)
            })
        }
    }
    const getMessages = () => {

        if (user && profile) {
            api.getMessages(user.id, profile.id).then((res: any) => {
                setMessages(res.messages)
            })
        }


    }
    const handleOpenChat = (id: any) => {
        TLoader.tLoader(1)
        api.getProfile(id).then((user: any) => {
            setSellerChat(user)
            TLoader.tLoader(0)
            getMessages()

        })

    }

    const handleSetMessage = (e: any) => {

        setMessage({
            content: e.target.value,
            type: 'text',
            from: profile.username
        })


    }
    const handleSendMessage = (e: any) => {
        e.preventDefault()
        console.log(user)
        if (message.content.length < 2) return;

        TLoader.tLoader(1)
        api.sendMessage(user.id, profile.id, message.content).then((data: any) => {
            console.log(data)
            const newMessage =
            {
                content: message.content,
                from: profile.username,
                type: 'text',
                created_at: moment().format('DD/MM/YY - H:mm:ss').toString()

            };
            const newMessages = messages
            newMessages.push(newMessage)


            setMessages(newMessages)

            setMessage(
                {
                    content: '',
                    from: profile.id,
                    type: 'text',
                    created_at: ''
                }
            )
            TLoader.tLoader(0)
        }).catch((err: any) => {
            console.log(err)
            TLoader.tLoader(0)
            Swal.fire({
                icon: 'warning',
                text: 'Houve um erro ao enviar sua mensagem, verifique sua conexão'
            })
        })

    }
    useEffect(() => {


        console.log('here 2 ' + id)

        TLoader.tLoader(1, 'Carregando pedido...')
        api.getOrder(parseInt(id ?? '')).then((data: any) => {
            setOrder(data)
            setUser(data.user)

            api.getLoggedUser().then((user: any) => {
                setProfile(user)

                console.log('order')
                console.log(data)
                TLoader.tLoader(0)

                setInterval(() => {
                    getMessages()
                }, 1000)
            })

        }).catch(err => {

            console.log(err)
        })

    }
        , [])

    return (

        order.cart ?
            (
                < div className={styles.order} key={order.id}>

                    <div className={styles.header}>
                        <h3>Itens do pedido</h3>

                        {/* {
                            [
                                <span className={styles.unpaid}>Não pago</span>,
                                <span className={styles.paid}>Pago</span>,
                                <span className={styles.unpaid}>Aguardando entrega</span>,
                            ]
                            [order.status]
                        } */}
                    </div>
                    <div className={styles.content}>
                        <div className={styles.items}>
                            {
                                order.cart.map((item: any) => (



                                    <div className={styles.item} key={item.id}>
                                        {
                                            [
                                                <span className={styles.unpaid}>Não pago</span>,
                                                <span className={styles.paid}>Pago</span>,
                                                <span className={styles.unpaid}>Aguardando entrega</span>,
                                            ]
                                            [order.status]
                                        }
                                        <div>
                                            <Link to={`/produtos/${item.id}`}>
                                                <h4 className={styles.title}>{item.title}</h4>
                                            </Link>
                                        </div>
                                        <div className={styles.actions}>
                                            <button className={styles.cancel}>Cancelar item</button>

                                            <button className={styles.openChat}
                                                onClick={() => {
                                                    handleOpenChat(item.user_id)
                                                }}>
                                                Abrir chat com vendedor
                                            </button>

                                        </div>
                                        {/* <img src={import.meta.env.VITE_API_URL + item.banner} alt="" /> */}
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
                        {sellerChat ?
                            <div className={styles.chat}>
                                <h4>{sellerChat.username}</h4>
                                <div className={styles.messages}>
                                    {
                                        messages.map((message: any) => {
                                            if (message.from == profile.username)
                                                return (
                                                    <div key={message.created_at}>
                                                        <span></span>
                                                        <span style={{ opacity: .5, fontSize: '10pt' }}>{message.created_at} {message.from} - </span>
                                                        <span style={{ color: 'green' }}>{message.content}</span>
                                                    </div>
                                                )
                                        })
                                    }
                                </div>
                                <form onSubmit={handleSendMessage}>
                                    <input type="text" placeholder='Escreva aqui...' value={message.content} onChange={handleSetMessage} className={styles.messageBox} />
                                </form>
                            </div>
                            :
                            null
                        }
                    </div>
                    <div className={styles.footer}>
                        <div>
                            Valor Final: R$ {order.price}<br />

                        </div>
                        {order.status == 0 ? (<button className='success' onClick={handlePay}>Pagar agora</button>) : null}
                        {order.status == 2 ? (<button className='danger' onClick={handleCancel}>Cancelar pedido</button>) : null}

                    </div>



                </div >
            )

            : <>a</>
    )

}
export default Order