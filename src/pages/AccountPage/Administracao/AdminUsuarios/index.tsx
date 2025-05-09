import { useEffect, useState } from 'react';
import './AdminUsuarios.scss';
import { Api, TLoader } from '../../../../skds/api';
import DataTable from 'react-data-table-component';
import { UserModal } from '../../../../components/UserModal';
const api = new Api('closed')



export default function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState<any>([]);
    const [user, setUser] = useState<any>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleVerify = (id: any) => {
        TLoader.tLoader(1)
        api.getProfile(id).then((profile: any) => {
            setUser(profile)
            TLoader.tLoader(0)
            setIsModalOpen(true)
        })
    }
    const cols = [
        {
            name: 'Usuário',
            selector: (row: any) => row.username,
            sortable: true,
        },
        {
            name: 'Email',
            selector: (row: any) => row.email,
            sortable: true,
        },
        {
            name: 'Saldo',
            selector: (row: any) => `R$ ${row.wallet}`,
            sortable: true,
        },
        {
            name: 'Verificado',
            selector: (row: any) => (row.name ? <span style={{ color: 'green' }}>Sim</span> : <span style={{ color: 'red' }}>Não</span>),
            sortable: false,
        },
        {
            name: ' ',
            selector: (row: any) => <button onClick={() => {
                handleVerify(row.id)
            }}>Visualizar</button>,
            sortable: false,
        },
    ]
    useEffect(() => {
        TLoader.tLoader(1)
        api.getUsers(false).then((users: any) => {
            setUsuarios(users)
            TLoader.tLoader(0)
        })
    }, [])
    return (
        <div className="admin-container  ">
            {user && isModalOpen ?
                <UserModal user={user} onClose={() => {
                    setIsModalOpen(false)
                }} />
                : null}

            {usuarios.length > 0 && (

                <DataTable columns={cols} data={usuarios} title='Usuários' />

            )}
        </div>
    );
}
