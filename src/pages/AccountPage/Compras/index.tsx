import React, { useEffect, useState } from "react";
import "./Compras.scss";
import { Api, TLoader } from "../../../skds/api";
import moment from "moment";
import MD5 from "md5";
import { OrderModal } from "../../../components/OrderModal";
import { Link } from "react-router-dom";

const Compras: React.FC = () => {
  const [orders, setOrders] = useState<any>([])
  const [order, setOrder] = useState<any>()
  const [cart, setCart] = useState([])
  const [status, setStatus] = useState<any>(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const api = new Api('closed')

  const unused = { setCart, setOrder, cart }
  console.log(unused)

  const handleChangeStatus = (e: any) => {
    const newStatus = e.target.value
    setStatus(newStatus)
    TLoader.tLoader(1, 'Carregando pedidos...')

    api.getMyOrders(e.target.value).then((orders_: any) => {

      setOrders(orders_.orders)
      setCart(orders_.orders.cart)
      TLoader.tLoader(0)

    })

  }
  useEffect(() => {
    TLoader.tLoader(1, 'Carregando pedidos...')

    api.getMyOrders(status).then((orders_: any) => {
      console.log('status: ' + status)
      setOrders(orders_.orders)
      TLoader.tLoader(0)

    })
  }, [])

  return (
    <div className="aba-compras">
      {
        isModalOpen ? (
          <OrderModal order={order} onClose={() => {
            setIsModalOpen(false)
          }}>
          </OrderModal>
        ) : null
      }
      <div className="filtros">
        <div className="select-container">
          Filtro
          < div className="filters" >
            <select onChange={handleChangeStatus}>
              <option value="1">Aguardando confirmação do vendedor</option>
              <option value="2">Aguardando confirmação de recebimento</option>
              <option value="3">Concluído</option>

            </select>
          </div >
        </div>
      </div>

      <div className="lista-compras">
        {orders?.map((order: any) => (
          <div className="card-compra" key={order.id}>
            <div className="cabecalho">Pedido <span className="id">#{MD5(order.id).toString().substr(0, 5)}</span></div>
            {order.cart.map((item: any) => (
              <div key={item.id} className="produto">
                <span>1x</span>
                <span className="nome-produto">{item.title}</span>
                <span>R$ {item.price}</span>
              </div>
            ))}


            <div className="rodape">
              <span>{moment(order.created_at).format('DD/MM/Y - H:m:s\\h')}  | Total: <strong>R$ {order.price}</strong></span>
              <span className={`status ${![2, 4, 3].includes(order.status_) ? "verde" : "amarelo"}`}>
                {['', 'Aguardando confirmação do vendedor', 'Aguardando confirmação de recebimento', 'Concluído', 'Recebido', 'Recusado'][order.status]}
              </span>
              <Link className="ver-pedido" to={`/minha-conta/pedidos/${order.id}`} >Ver pedido</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Compras;
