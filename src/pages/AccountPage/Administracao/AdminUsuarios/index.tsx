import { useEffect, useState } from 'react';
import './AdminUsuarios.scss';
import { Api } from '../../../../skds/api';
import DataTable from 'react-data-table-component';
const api = new Api('closed')



export default function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState<any>([]);
    const handleVerify = (id: any) => {
        alert(id)
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
            selector: (row: any) => (row.name ? <span style={{color:'green'}}>Sim</span> : <span style={{color:'red'}}>Não</span>),
            sortable: true,
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
        api.getUsers(false).then((users: any) => {
            setUsuarios(users)
        })
    }, [])
    return (
        <div className="admin-container  ">


            {usuarios.length > 0 && (
                <>
                    <DataTable columns={cols} data={usuarios}  >




                    </DataTable>
                </>
            )}
        </div>
    );
}
