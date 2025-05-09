import { useEffect, useState } from 'react';
import './AdminVerificacoes.scss';
import { Api, TLoader } from '../../../../skds/api';
import DataTable from 'react-data-table-component';


import moment from 'moment';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
const api = new Api('closed')



export default function AdminVerificacoes() {
    const [usuarios, setUsuarios] = useState<any>([]);
    const handleVerify = (id: any) => {
        TLoader.tLoader(1)
        api.verifyUser(id).then((user: any) => {
            TLoader.tLoader(0)
            loadData()
            if (user.error) {
                return Swal.fire({
                    icon: 'error',
                    text: user.error
                })
            } else {
                return Swal.fire({
                    icon: 'success',
                    text: 'Usuário verificado com sucesso'
                })
            }
        }).catch((err) => {
            alert(err)
        })
    }
    const handleDeny = (id: any) => {
        console.log(id)

    }
    const loadData = () => {
        TLoader.tLoader(1)
        api.getVerifyRequests().then((users: any) => {
            setUsuarios(users)
            TLoader.tLoader(0)
        })
    }
    const cols = [
        {
            name: 'Nome',
            selector: (row: any) => row.name,
            sortable: true,
        },
        {
            name: 'Cpf',
            selector: (row: any) => row.cpf,
            sortable: true,
        },
        {
            name: 'Data de nascimento',
            selector: (row: any) => moment(row.birth_date).format('DD/MM/YYYY'),
            sortable: true,
        },
        {
            name: 'Documento (clique para abrir)',
            selector: (row: any) => (
                <Link to={import.meta.env.VITE_API_URL + row.document_front} target='_blank'>
                    <img style={{ height: 100 }} src={import.meta.env.VITE_API_URL + row.document_front} />
                </Link>
            ),
            sortable: true,
        },
        {
            name: ' ',
            selector: (row: any) => (
                <>
                    <button className='success' onClick={() => {
                        handleVerify(row.id)
                    }}>Aprovar</button>
                    <button className='danger' onClick={() => {
                        handleDeny(row.id)
                    }}>Negar</button>
                </>
            ),
            sortable: false,
        },
    ]
    useEffect(() => {
        loadData()
    }, [])
    return (
        <div className="admin-container  ">


            {usuarios.length > 0 && (
                <>
                    <DataTable columns={cols} data={usuarios} pagination>




                    </DataTable>
                </>
            )}
        </div>
    );
}
