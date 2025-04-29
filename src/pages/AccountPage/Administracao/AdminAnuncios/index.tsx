import { useEffect, useState } from 'react';
import './AdminAnuncios.scss';
import { Api } from '../../../../skds/api';
import CustomTable from '../../../../components/CustomTable';
import { FaEye } from 'react-icons/fa';
import moment from 'moment';
import { Link } from 'react-router-dom';
const api = new Api('closed')



export default function AdminAnuncios() {
    const [anuncios, setAnuncios] = useState<any>([]);
    useEffect(() => {
        api.getAllProducts().then((r: any) => {
            setAnuncios(r)
        })
    }, [])
    return (
        <div className="admin-container">


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
                                        <Link to={`/usuarios/${anuncio.user_id}`}>{anuncio.user}</Link>
                                        ,

                                        <Link to='/'><FaEye color='blue' /></Link>


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
