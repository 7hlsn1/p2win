import React, { useEffect, useState } from "react";
import "./Transacoes.scss";
import { Api, TLoader, } from "../../../skds/api";
import moment from "moment";
//import { Link } from "react-router-dom";
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

                            <div className="cabecalho">R$ {anuncio.amount} </div>

                            <div className="produto">

                                <span className="nome-produto">{anuncio.description}</span>

                            </div>
                            <div className="pagamento">

                                {[<span className="reprovado">Não pago</span>, <span className="aprovado"><b>Pago</b></span>][anuncio.status]}

                                <span>{moment(anuncio.created_at).format('DD/MM/YYYY - H:m:ss')}</span>
                            </div>
                        </div>

                    )

                }
                )}

        </div>


    )



}


export default Anuncios;
