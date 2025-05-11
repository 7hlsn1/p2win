import React, { useEffect, useState } from "react";
import "./Transacoes.scss";
import { Api, TLoader, } from "../../../skds/api";
import moment from "moment";
import { Link } from "react-router-dom";
const api = new Api('closed')
moment.locale('pt-br')
moment.localeData('pt-br')

// type Status = "Ativo" | "Em análise" | "Reprovado" | "Desativado" | "Suspenso";

// interface Anuncio {
//   id: number;
//   titulo: string;
//   status: Status;
//   tipo: string;
//   link: string;
// }



const Anuncios: React.FC = () => {

    const [typeFilter, setTypeFilter] = useState('deposit');
    const [anuncios, setAnuncios] = useState([]);

    useEffect(() => {
        TLoader.tLoader(1)
        api.getUserTransactions(typeFilter).then((data: any) => {
            setAnuncios(data)
            TLoader.tLoader(0)
        })
    }, [])

    const handleChangeFilter = (e: any) => {
        TLoader.tLoader(1)
        const status = e.target.value
        setTypeFilter(status)
        console.log(`statusFiltro = ${status}`)
        console.log(status)

        api.getUserTransactions(status).then((data: any) => {
            console.log(data)
            setAnuncios(data)
            TLoader.tLoader(0)

        }).catch(err => {
            console.log('err:')
            console.log(err)
        })

    }


    return (
        <div className="aba-anuncios">
            <div className="filtro">
                <label>Tipo:</label>
                <select
                    value={typeFilter}
                    onChange={handleChangeFilter}
                >
                    <option value='deposit'>Depósito</option>
                    <option value='withdraw'>Saque</option>


                </select>
            </div>

            {
                anuncios.map((anuncio: any) => {
                    return (
                        <div className="card-compra" key={anuncio.id}>
                            <Link to={`/produtos/${anuncio.id}`}>
                                <div className="cabecalho">{anuncio.title} <span className="id">#{anuncio.id}</span></div>
                            </Link>
                            <div className="produto">

                                <span className="nome-produto">{anuncio.description}</span>

                            </div>
                            <div className="pagamento">

                                {
                                    anuncio.status == 1 ? <>                <span>Saldo P2Win: +R$ {anuncio.amount}</span>
                                    </> : <></>
                                }
                                <span className="aprovado">{['Não pago', 'Pago'][anuncio.status]}</span>
                                <span>{moment(anuncio.created_at).format('DD/MM/YYYY')}</span>
                            </div>
                        </div>

                    )

                }
                )}

        </div>


    )



}


export default Anuncios;
