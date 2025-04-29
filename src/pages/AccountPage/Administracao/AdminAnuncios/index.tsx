import { useEffect, useState } from 'react';
import './AdminAnuncios.scss';

import { Api, TLoader } from '../../../../skds/api';
import CustomTable from '../../../../components/CustomTable';
import { FaEye } from 'react-icons/fa';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Modal from '../../../../components/Modal';
const api = new Api('closed')



export default function AdminAnuncios() {
    const [anuncios, setAnuncios] = useState<any>([]);
    const [status, setStatus] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [anuncio, setAnuncio] = useState<any>({})
    const handleChangeStatus = (e: any) => {

        setStatus(e.target.value)
        getAnuncios(e.target.value)
    }
    const getAnuncios = (status_: any) => {
        api.getAllProducts('', '', 0, status_).then((r: any) => {
            setAnuncios(r)
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
    useEffect(() => {
        getAnuncios(status)
    }, [])
    return (
        <div className="admin-container">

            {
                isModalOpen ? (
                    <Modal onClose={() => {
                        setIsModalOpen(false)
                    }}>
                        <form action="">
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
                                <button type="submit" style={{ backgroundColor: 'rgb(221, 76, 76)' }}>Rejeitar</button>

                            </div>

                        </form>
                    </Modal>
                ) :
                    null
            }

            Status
            <div className="filters">
                <select name="" id="" onChange={handleChangeStatus}>
                    <option value="0">Aguardando aprovação</option>
                    <option value="1">Aprovado</option>
                    <option value="2">Vendido</option>

                </select>
            </div>
            {
                anuncios.length > 0 ? (
                    <CustomTable
                        columns={['Título', 'Valor', 'Publicado em', 'Status', 'Publicado por', '']}
                        rows=
                        {
                            anuncios.map(
                                (anuncio: any) => [
                                    [
                                        anuncio.title,
                                        `R$ ${anuncio.price}`,
                                        moment(anuncio.created_at).format('D/MM/yyyy - H:m\\h'),
                                        [
                                            <span>Aguardando aprovação</span>,
                                            <span style={{ color: 'green' }}>Aprovado</span>,
                                            <span>Vendido</span>
                                        ]
                                        [anuncio.status],
                                        <Link className='link' to={`/usuarios/${anuncio.user_id}`}>{anuncio.user}</Link>
                                        ,

                                        <FaEye color='blue' onClick={() => {
                                            handleOpenModal(anuncio.id)
                                        }} />


                                    ]
                                ]
                            )
                        }


                    />
                ) : <></>
            }
        </div>
    )
}
