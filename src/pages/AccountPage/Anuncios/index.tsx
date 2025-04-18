import React, { useEffect, useState } from "react";
import "./Anuncios.scss";
import { Api,   } from "../../../skds/api";
const api = new Api('closed')

type Status = "Ativo" | "Em análise" | "Reprovado" | "Desativado" | "Suspenso";

// interface Anuncio {
//   id: number;
//   titulo: string;
//   status: Status;
//   tipo: string;
//   link: string;
// }



const Anuncios: React.FC = () => {

  const [statusFiltro, setStatusFiltro] = useState<Status | "Todos">("Ativo");
  const [anuncios, setAnuncios] = useState([]);

  useEffect(() => {

    api.getProducts().then((data: any) => {
      console.log(data)
      setAnuncios(data)
    })
  }, [])

  // const filtrar = () =>
  //   statusFiltro === "Todos"
  //     ? anuncios
  //     : anuncios.filter((a: any) => a.status === statusFiltro);

  return (
    <div className="aba-anuncios">
      <div className="filtro">
        <label>Status:</label>
        <select
          value={statusFiltro}
          onChange={(e) => setStatusFiltro(e.target.value as Status | "Todos")}
        >
          <option value="Todos">Todos</option>
          <option value="Ativo">Ativo</option>
          <option value="Em análise">Em análise</option>
          <option value="Reprovado">Reprovado</option>
          <option value="Desativado">Desativado</option>
          <option value="Suspenso">Suspenso</option>
        </select>
      </div>

      <div className="lista-anuncios">
        {anuncios.map((anuncio: any) => {
          console.log(anuncio)
          return (
            <div key={anuncio.id} className="card-anuncio">
              <div className="conteudo">
                <a href={anuncio.id.toString()} className="titulo">
                  {anuncio.title}
                </a>
                <div className="detalhes">
                  <span>{anuncio.type_id}</span>
                  <span className={`status status--${anuncio.status.toLowerCase().replace(" ", "-")}`}>
                    ● {anuncio.status}
                  </span>
                </div>
              </div>
              <div className="acoes">
                <button className="desativar">Desativar</button>
                <button className="editar">Editar</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Anuncios;
