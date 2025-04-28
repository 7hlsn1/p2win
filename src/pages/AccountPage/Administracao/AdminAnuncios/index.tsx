import { useEffect, useState } from 'react';
import './AdminAnuncios.scss';
import { Api } from '../../../../skds/api';
 
import moment from 'moment';
const api = new Api('closed')



export default function AdminAnuncios() {
    const [anuncios, setAnuncios] = useState<any>([]);
    useEffect(() => {
        api.getAllProducts().then((anuncios_: any) => {
            setAnuncios(anuncios_)
        })
    }, [])
    return (
        <div className="admin-container">
        

            {anuncios.length > 0 && (
                <table className="tabela-usuarios">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Usuário</th>
                            <th>Email</th>
                            <th>Carteira</th>
                            <th>Entrou em</th>
                         
                        </tr>
                    </thead>
                    <tbody>
                        {anuncios.map((usuario: any) => (
                            <tr key={usuario.id}>
                                <td>{usuario.name ?? (<span style={{opacity:.5, textDecoration:'line-through', color:'red'}}>sem nome</span>)}</td>
                                <td>{usuario.username}</td>
                                <td>{usuario.email}</td>
                                <td style={{color:'green'}}>R$ {usuario.wallet}</td>
                                <td style={{opacity:.5}}>{moment(usuario.created_at).format('DD/MM/YYYY H:mm\\h')}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
