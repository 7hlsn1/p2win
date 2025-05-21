import { useEffect, useState } from 'react';
import './AdminPedidos.scss';

import { Api, TLoader } from '../../../../skds/api';


import moment from 'moment';
import { Link } from 'react-router-dom';
// import Modal from '../../../../components/Modal';
// import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';
const api = new Api('closed')



export default function AdminPedidos() {
    const [orders, setOrders] = useState<any>([])
    const [status, setStatus] = useState('deposit')
    // const [isModalOpen, setIsModalOpen] = useState(false)
    //  const [anuncio, setAnuncio] = useState<any>({})
    const cols: any = [
         
        {
            name: 'Valor',
            selector: (row: any) => `R$ ${row.price}`,
            sortable: true,
        },
        {
            name: 'Criado em',
            selector: (row: any) => moment(row.created_at).format('DD/MM/YYYY'),
            sortable: true,
        },
        {
            name: 'Status',
            selector: (row: any) => (['?', 'Aguardando confirmação', 'Aguardando entrega', '', 'Rejeitado'][row.status] ?? row.status),
            sortable: true,
        },
        {
            name: 'Usuário',
            selector: (row: any) => (
                <Link className='link' to={'/usuarios/' + row.user_id} target='_blank'>
                    {row.user.username}
                </Link>
            ),
            sortable: true,
        },

    ]
    const handleChangeStatus = async (e: any) => {
        TLoader.tLoader(1)
        setStatus(e.target.value)
        getOrders(e.target.value)

    }
    const getOrders = (status_: any) => {
        TLoader.tLoader(1, 'Carregando pedidos...')
        api.adminGetOrders(status_).then((data: any) => {
            setOrders(data.orders)
            TLoader.tLoader(0)
        })


    }


    useEffect(() => {
        getOrders(status)
    }, [])
    return (
        <div className="admin-container">



            < div className="filters" >
                <select name="" id="" onChange={handleChangeStatus}>
                    <option value="1">Aguardando confirmação do vendedor</option>
                    <option value="2">Aceito pelo vendedor</option>
                    <option value="3">Pedido entregue</option>
                    <option value="4">Pedido rejeitado</option>
                </select>
            </div >
            {
                orders.length > 0 ? (
                    <DataTable columns={cols} data={orders} pagination  >

                    </DataTable>

                ) : <></>
            }
        </div >
    )
}
