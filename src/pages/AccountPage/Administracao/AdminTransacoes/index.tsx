import { useEffect, useState } from 'react';
import './AdminTransacoes.scss';

import { Api, TLoader } from '../../../../skds/api';


import moment from 'moment';
import { Link } from 'react-router-dom';
// import Modal from '../../../../components/Modal';
// import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';
const api = new Api('closed')



export default function AdminAnuncios() {
    const [transactions, setTransactions] = useState<any>([])
    const [status, setStatus] = useState('deposit')
    // const [isModalOpen, setIsModalOpen] = useState(false)
    //  const [anuncio, setAnuncio] = useState<any>({})
    const cols: any = [
        {
            name: 'Tipo',
            selector: (row: any) => (row.type == 'deposit') ? 'Depósito' : (row.title == 'withdraw' ? 'Saque' : '?'),
            sortable: true,
        },
        {
            name: 'Valor',
            selector: (row: any) => `R$ ${row.amount}`,
            sortable: true,
        },
        {
            name: 'Criado em',
            selector: (row: any) => moment(row.created_at).format('DD/MM/YYYY'),
            sortable: true,
        },
        {
            name: 'Status',
            selector: (row: any) => (row.status == 0 ? <span style={{ color: 'red' }}>Não pago</span> : <span style={{ color: 'red' }}> Pago</span>),
            sortable: true,
        },
        {
            name: 'Usuário',
            selector: (row: any) => (
                <Link className='link' to={'/usuarios/' + row.user_id} target='_blank'>
                    {row.username}
                </Link>
            ),
            sortable: true,
        },
        // {
        //     name: ' ',
        //     selector: (row: any) => (


        //         <FaEye size={'20px'} cursor={'pointer'} color='blue' onClick={() => {
        //             handleOpenModal(row.id)
        //         }} />

        //     ),
        //     sortable: false,
        // },
    ]
    const handleChangeStatus = async (e: any) => {
        TLoader.tLoader(1)
        setStatus(e.target.value)
        getAnuncios(e.target.value)

    }
    const getAnuncios = (status_: any) => {
        TLoader.tLoader(1, 'Carregando anúncios...')
        api.getTransactions(status_).then((data: any) => {
            setTransactions(data)
            TLoader.tLoader(0)
        })


    }
    // const handleOpenModal = (id: any) => {
    //     TLoader.tLoader(1)
    //     api.getProduct(id).then(data => {
    //         setAnuncio(data)
    //         console.log(data)
    //         setIsModalOpen(true)
    //         TLoader.tLoader(0)
    //     })
    // }

    useEffect(() => {
        getAnuncios(status)
    }, [])
    return (
        <div className="admin-container">

            {/* {
                isModalOpen ? (
                    <Modal styles={{ width: '800px', maxWidth: 'unset' }} onClose={() => {
                        setIsModalOpen(false)
                    }}>
                        <form action="" onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1em' }}>
                                Publicado por: <Link className='link' to={`/usuarios/${anuncio.user_id}`}>{anuncio.user.username}</Link>

                            </div>
                            <div className='formGroup'>
                                <label htmlFor="">Anuncio</label>
                                <input type="text" value={anuncio.title} />
                            </div>
                            <div className='formGroup'>
                                <label htmlFor="">Valor</label>
                                <input type="number" value={anuncio.price} />
                            </div>
                            <div className='formGroup'>
                                <label htmlFor="">Descrição</label>
                                <input type="text" value={anuncio.description} />
                            </div>
                            <div className='formGroup'>
                                Banner
                                <div className='banner' style={{ backgroundImage: `url('${import.meta.env.VITE_API_URL + anuncio.banner}')` }}></div>
                                Imagens
                                <div className='images'>
                                    {anuncio.images.map((image: any) => (
                                        <div className='image' style={{ backgroundImage: `url('${import.meta.env.VITE_API_URL + image.file}')` }}>

                                        </div>

                                    ))}

                                </div>
                            </div>
                            <div className="buttons">
                                <button type="submit" style={{ backgroundColor: '#2ecc71' }}>Aprovar</button>
                                <button type="button" onClick={handleReject} style={{ backgroundColor: 'rgb(221, 76, 76)' }}>Rejeitar</button>

                            </div>

                        </form>
                    </Modal>
                ) :
                    null
            } */}

            Tipo
            < div className="filters" >
                <select name="" id="" onChange={handleChangeStatus}>
                    <option value="deposit">Depósito</option>
                    <option value="withdraw">Saque</option>

                </select>
            </div >
            {
                transactions.length > 0 ? (
                    <DataTable columns={cols} data={transactions} pagination title='Transações'>

                    </DataTable>

                ) : <></>
            }
        </div >
    )
}
