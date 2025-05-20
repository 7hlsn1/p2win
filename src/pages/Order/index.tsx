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
        sender: String,
        created_at: String
    }

    const [order, setOrder] = useState<any>({})
    const [user, setUser] = useState<any>({})
    const [profile, setProfile] = useState<any>({})
    const [sellerChat, setSellerChat] = useState<any>(false)
    const [message, setMessage] = useState<any>(messageModel)
    const [messages, setMessages] = useState<any>([])
    const { id } = useParams<any>()


    const handleCancel = () => {
        Swal.fire({
            icon: 'success',
            text: 'Pedido cancelado com sucesso'
        })
    }
    const handleAccept = () => {
        TLoader.tLoader(1, 'Processando pagamento')
        api.acceptOrder(order.id).then((res: any) => {
            TLoader.tLoader(0)
            Swal.fire({
                icon: 'success',
                text: res.message
            }).then(() => {
                document.location.reload()
            })
        }).catch((err: any) => {
            console.log(err)
        })
    }

    const handleDelivered = () => {
        TLoader.tLoader(1)
        api.setDelivered(order.id).then((res: any) => {
            TLoader.tLoader(0)
            Swal.fire({
                icon: 'success',
                text: res.message
            })

        }).catch((err: any) => {
            console.log(err)
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
    const getMessages = (order: any) => {
        console.log('getMessages')
        const seller = order.seller
        const profile_ = order.customer

        if (seller.id && profile_.id) {
            api.getMessages(order.id).then((res: any) => {
                const newMessages: any = []
                res.messages.map((m: any) => {
                    newMessages.push({
                        content: m.content,
                        from: m.sender,
                        type: 'text',
                        created_at: moment(m.created_at).format('DD/MM/YY - H:mm:ss').toString()

                    })
                })
                setMessages(newMessages)
                console.log('OK')

            })
        } else {
            Swal.fire({
                icon: 'warning',
                text: 'Erro ao exibir mensagens'
            })
        }


    }
    const handleOpenChat = (id: any) => {
        console.log('handleOpenChat')

        TLoader.tLoader(1)
        api.getProfile(id).then((user_: any) => {
            setSellerChat(user_)

            setUser(user_)

            setInterval(() => {
                getMessages(order)
            }, 1000)
            TLoader.tLoader(0)

        }).catch(() => {
            alert(0)
        })

    }

    const handleSetMessage = (e: any) => {

        setMessage({
            content: e.target.value,
            type: 'text',
            from: profile.username,
            sender: profile.username
        })


    }
    const handleReject = () => {
        TLoader.tLoader(1)
        api.rejectOrder(order.id).then((res: any) => {
            Swal.fire({
                icon: 'success',
                text: res.message
            }).then(() => {
                document.location.reload()
            })
            TLoader.tLoader(0)
        })
    }
    const handleSendMessage = (e: any) => {
        e.preventDefault()

        if (message.content.length < 2) return;

        TLoader.tLoader(1)
        api.sendMessage(user.id, profile.username, message.content, 'text', order.id).then((data: any) => {
            console.log(data)
            const newMessage =
            {
                content: message.content,
                from: profile.username,
                sender: profile.username,
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
            let messageList = document.getElementById('messages')
            if (messageList) {
                const scrollHeight = messageList.scrollHeight;
                const height = messageList.clientHeight;
                const maxScrollTop = scrollHeight - height;
                messageList.scrollTop = maxScrollTop + 500
            }
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

            api.getLoggedUser().then((user_: any) => {
                setProfile(user_)

                TLoader.tLoader(0)


            })
        }).catch(err => {
            console.log(err)
        })

    }, [])

    return (

        order.cart ?
            (
                < div className={styles.order} key={order.id}>

                    <div className={styles.header}>
                        <h3>Pedido</h3>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.items}>
                            {
                                order.cart.map((item: any) => (
                                    <div className={styles.item} key={item.id}>
                                        {
                                            [
                                                <span className={styles.unpaid}>Não pago</span>,
                                                <span className={styles.paid}>Aguardando resposta do vendedor</span>,
                                                <span className={styles.paid}>Aguardando confirmação de recebimento</span>,
                                                <span className={styles.paid}>Pedido finalizado</span>,
                                                <span className={styles.unpaid}>Pedido rejeitado</span>

                                            ]
                                            [order.status]
                                        }
                                        <div>
                                            <Link to={`/produtos/${item.id}`}>
                                                <h4 className={styles.title}>{item.title}</h4>
                                            </Link>
                                        </div>
                                        <div className={styles.actions}>

                                            {order.seller.id != profile.id ?
                                                <>
                                                    {
                                                        order.status == 2 ?
                                                            <button className={styles.openChat}
                                                                onClick={handleDelivered}>
                                                                Confirmar recebimento
                                                            </button> : null
                                                    }

                                                </>
                                                :
                                                <>
                                                    {
                                                        order.status == 1 ?
                                                            <>
                                                                <button className={styles.cancel}
                                                                    onClick={handleReject}>Recusar pedido</button>

                                                                <button className={styles.openChat}
                                                                    onClick={handleAccept}>
                                                                    Aceitar pedido
                                                                </button>
                                                            </>
                                                            : null
                                                    }

                                                </>
                                            }



                                            <button className={styles.openChat}
                                                onClick={() => {
                                                    handleOpenChat(order.cart[0].user_id)
                                                }}>
                                                Abrir chat com {item.seller.id != profile.id ? 'vendedor' : 'comprador'}
                                            </button>

                                        </div>
                                        {/* <img src={import.meta.env.VITE_API_URL + item.banner} alt="" /> */}
                                        <span className={styles.foot}>

                                            <span className={styles.price}>
                                                R$ <b>{item.price}</b>
                                            </span>

                                            <Link to={`/usuarios/${(item.seller.id == item.id) ? item.customer.id : item.seller.id}`} className='link'>
                                                {item.seller.id == profile.id ? item.customer?.username : item.seller.username}
                                            </Link>
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                        {sellerChat ?
                            <div className={styles.chat}>
                                <h4>{order.seller.id == profile.id ? order.customer.username : order.seller.username}
                                </h4>
                                <div className={styles.messages} id="messages">

                                    {
                                        messages.map((message: any) => {

                                            return (
                                                <div key={message.id} className={styles.message}>
                                                    <span className={styles.time}>
                                                        {message.created_at}
                                                    </span>
                                                    <span style={{ color: message.from == profile.username ? 'red' : 'green' }}>
                                                        {message.from}
                                                    </span>
                                                    <br />
                                                    <span className={styles.messageContent}>{message.content}</span>
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