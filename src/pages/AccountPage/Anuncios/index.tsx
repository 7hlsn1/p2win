import React, { useState } from "react";
import "./Anuncios.scss";

type Status = "Ativo" | "Em análise" | "Reprovado" | "Desativado" | "Suspenso";

interface Anuncio {
  id: number;
  titulo: string;
  status: Status;
  tipo: string;
  link: string;
}

const anunciosMock: Anuncio[] = [
  {
    id: 1,
    titulo: "SSBM Phantom Megalodon / Fisch! / O mais barato do mercado!",
    status: "Ativo",
    tipo: "Anúncio dinâmico",
    link: "#",
  },
];

const Anuncios: React.FC = () => {
  const [statusFiltro, setStatusFiltro] = useState<Status | "Todos">("Ativo");
  const [anuncios] = useState(anunciosMock);

  const filtrar = () =>
    statusFiltro === "Todos"
      ? anuncios
      : anuncios.filter((a) => a.status === statusFiltro);

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
        {filtrar().map((anuncio) => (
          <div key={anuncio.id} className="card-anuncio">
            <div className="conteudo">
              <a href={anuncio.link} className="titulo">
                {anuncio.titulo}
              </a>
              <div className="detalhes">
                <span>{anuncio.tipo}</span>
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
        ))}
      </div>
    </div>
  );
};

export default Anuncios;
