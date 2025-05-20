import { useEffect, useState } from 'react';
import './AdminAnuncios.scss';

import { Api, TLoader } from '../../../../skds/api';
 
import { FaEye } from 'react-icons/fa';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Modal from '../../../../components/Modal';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';
const api = new Api('closed')



export default function AdminAnuncios() {
    const [anuncios, setAnuncios] = useState<any>([]);
    const [status, setStatus] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [anuncio, setAnuncio] = useState<any>({})
    const columns = [
        {
            name: 'Título',
            selector: (row: any) => row.title,
            sortable: true,
        },
        {
            name: 'Valor',
            selector: (row: any) => row.price,
            sortable: true,
        },
        {
            name: 'Publicado em',
            selector: (row: any) => moment(row.created_at).format('DD/MM/YYYY'),
            sortable: true,
        },
        {
            name: 'Status',
            selector: (row: any) => [
                <span>Aguardando aprovação</span>,
                <span style={{ color: 'green' }}>Aprovado</span>,
                <span>Vendido</span>,
                <span style={{ color: 'red' }}>Rejeitado</span>
            ]
            [row.status],
            sortable: true,
        },
        {
            name: 'Banner',
            selector: (row: any) => (
                <Link to={import.meta.env.VITE_API_URL + row.banner} target='_blank'>
                    <img style={{ height: 100 }} src={import.meta.env.VITE_API_URL + row.banner} />
                </Link>
            ),
            sortable: true,
        },
        {
            name: ' ',
            selector: (row: any) => (


                <FaEye size={'20px'} cursor={'pointer'} color='blue' onClick={() => {
                    handleOpenModal(row.id)
                }} />

            ),
            sortable: false,
        },
    ]
    const handleChangeStatus = async (e: any) => {
        TLoader.tLoader(1)
        setStatus(e.target.value)
        getAnuncios(e.target.value)

    }
    const getAnuncios = (status_: any) => {
        TLoader.tLoader(1, 'Carregando anúncios...')
        api.getAllProducts('', '', 0, status_).then((r: any) => {
            setAnuncios(r)
            TLoader.tLoader(0)

        })
  
    }
    const handleOpenModal = (id: any) => {
        TLoader.tLoader(1)
        api.getProduct(id).then(data => {
            setAnuncio(data)
            console.log(data)
            setIsModalOpen(true)
            TLoader.tLoader(0)
        })
    }
    const handleReject = () => {
        TLoader.tLoader(1)
        alert(1)
        api.rejectProduct(anuncio.id).then((data: any) => {
          
            getAnuncios(status)
            setIsModalOpen(false)
            TLoader.tLoader(0)
            Swal.fire({
                icon: 'success',
                text: data.message
            }).then((r: any) => {
                console.log(r)
              
            })
        })
    }
    const handleSubmit = (e: any) => {
        e.preventDefault()
        api.approveProduct(anuncio.id).then((data: any) => {
            getAnuncios(status)
            Swal.fire({
                icon: 'success',
                text: data.message
            }).then((r: any) => {
                console.log(r)
                setIsModalOpen(false)
            })
        })
    }
    useEffect(() => {
        getAnuncios(status)
    }, [])
    return (
        <div className="admin-container">

            {
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
            }

            Status
            < div className="filters" >
                <select name="" id="" onChange={handleChangeStatus}>
                    <option value="0">Aguardando aprovação</option>
                    <option value="1">Aprovado</option>
                    <option value="2">Vendido</option>
                    <option value="3">Rejeitado</option>


                </select>
            </div >
            {
                anuncios.length > 0 ? (
                    <DataTable columns={columns} data={anuncios} pagination  >

                    </DataTable>
                    // <CustomTable
                    //     columns={['Título', 'Valor', 'Publicado em', 'Status', 'Publicado por', '']}
                    //     rows=
                    //     {
                    //         anuncios.map(
                    //             (anuncio: any) => [
                    //                 [
                    //                     anuncio.title,
                    //                     `R$ ${anuncio.price}`,
                    //                     moment(anuncio.created_at).format('D/MM/yyyy - H:m\\h'),
                    //                     [
                    //                         <span>Aguardando aprovação</span>,
                    //                         <span style={{ color: 'green' }}>Aprovado</span>,
                    //                         <span>Vendido</span>,
                    //                         <span style={{ color: 'red' }}>Rejeitado</span>
                    //                     ]
                    //                     [anuncio.status],
                    //                     <Link className='link' to={`/usuarios/${anuncio.user_id}`}>{anuncio.user}</Link>
                    //                     ,

                    //                     <FaEye size={'20px'} cursor={'pointer'} color='blue' onClick={() => {
                    //                         handleOpenModal(anuncio.id)
                    //                     }} />


                    //                 ]
                    //             ]
                    //         )
                    //     }


                    // />
                ) : <></>
            }
        </div >
    )
}
