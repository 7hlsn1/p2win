import React, { useEffect, useState } from "react";
import "./Compras.scss";
import { Api, TLoader } from "../../../skds/api";
import moment from "moment";
import MD5 from "md5";
import { OrderModal } from "../../../components/OrderModal";
import { Link } from "react-router-dom";

const Vendas: React.FC = () => {
  const [orders, setOrders] = useState<any>([])
  const [order, setOrder] = useState<any>()
  //const [cart, setCart] = useState([])
  const [status, setStatus] = useState<any>(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [allOrders, setAllOrders] = useState([])
  const api = new Api('closed')

  const unused = { setOrder, allOrders }
  console.log(unused)

  const handleChangeStatus = (e: any) => {
    const newStatus = e.target.value
    setStatus(newStatus)
    loadOrders(e.target.value)
  }
  const loadOrders = (status: any) => {
    TLoader.tLoader(1, 'Carregando pedidos...')
    api.getOrders(status).then((orders_: any) => {
      setOrders(orders_.orders)
      api.getOrders(status).then((orders__: any) => {
        setAllOrders(orders_.orders.concat(orders__.orders))
        TLoader.tLoader(0)

      })

    })
  }
  useEffect(() => {
    loadOrders(status)
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
              <option value="1">Pendentes</option>
              <option value="2">Aguardando entrega</option>
              <option value="3">Concluido</option>
              <option value="4">Recusado</option>

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
              <span>{moment(order.created_at).format('DD/MM/Y - H:mm:s\\h')}  | Total: <strong>R$ {order.price}</strong></span>
              <span className={`status ${['', 'amarelo', 'amarelo', 'verde', '?', 'danger'][order.status]}`}>
                {['', 'Aguardando confirmação', 'Aguardando entrega', 'Concluído', 'Recusado', '?'][order.status]}
              </span>
              <Link className="ver-pedido" to={`/minha-conta/pedidos/${order.id}`} >Ver pedido</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vendas;
