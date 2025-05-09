import React, { useEffect, useState } from "react";
import "./Anuncios.scss";
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

  const [statusFiltro, setStatusFiltro] = useState(1);
  const [anuncios, setAnuncios] = useState([]);

  useEffect(() => {
    TLoader.tLoader(1)
    api.getMyProducts('', statusFiltro, '').then((data: any) => {
      setAnuncios(data)
      TLoader.tLoader(0)
    })
  }, [])

  const handleChangeFilter = (e: any) => {
    TLoader.tLoader(1)
    const status = parseInt(e.target.value)
    setStatusFiltro(status)
    console.log(`statusFiltro = ${status}`)
    console.log(status)


    api.getMyProducts('', status, '').then((data: any) => {
      console.log(data[0])
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
        <label>Status:</label>
        <select
          value={statusFiltro}
          onChange={handleChangeFilter}
        >
          <option value={'0'}>Em análise</option>
          <option value={1}>Ativo</option>
          <option value={2}>Vendido</option>
          <option value={3}>Reprovado</option>

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
                <span>R$ {anuncio.price}</span>
              </div>
              <div className="pagamento">
                <img src={import.meta.env.VITE_API_URL + anuncio.banner} />
                {
                  anuncio.status == 2 ? <>                <span>Saldo P2Win: +R$ {anuncio.price}</span>
                  </> : <></>
                }
                <span className="aprovado">{['Em análise', 'Aprovado', 'Vendido'][anuncio.status]}</span>
              </div>
            </div>

          )

        }
        )}

    </div>


  )



}


export default Anuncios;
