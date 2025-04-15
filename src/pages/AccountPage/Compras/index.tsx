import React, { useState } from "react";
import "./Compras.scss";

interface Compra {
  id: string;
  produto: string;
  preco: number;
  data: string;
  hora: string;
  status: "Entregue" | "Entrega pendente";
  pagamento: "Pagamento aprovado";
}

const comprasMock: Compra[] = [
  {
    id: "#GMNMK8NJ",
    produto: "14x IMPULSOS | 1 MÊS | [PREÇO BAIXO] IMPULSO NO SEU SERVIDOR DISCORD - BOOST IMPULSO 1/3 MÊS",
    preco: 30,
    data: "12/03/25",
    hora: "1:27",
    status: "Entregue",
    pagamento: "Pagamento aprovado"
  },
  {
    id: "#D4K4K8I7",
    produto: "14x IMPULSOS | 1 MÊS | [PREÇO BAIXO] IMPULSO NO SEU SERVIDOR DISCORD - BOOST IMPULSO 1/3 MÊS",
    preco: 30,
    data: "12/03/25",
    hora: "1:25",
    status: "Entrega pendente",
    pagamento: "Pagamento aprovado"
  },
  {
    id: "#1LBB8W63",
    produto: "14x IMPULSOS | 1 MÊS | [PROMOÇÃO] IMPULSO NO SEU SERVIDOR DISCORD - BOOST IMPULSO 1/3 MÊS",
    preco: 25,
    data: "12/03/25",
    hora: "18:45",
    status: "Entregue",
    pagamento: "Pagamento aprovado"
  }
];

const Compras: React.FC = () => {
  const [filtro, setFiltro] = useState("Código do pedido");

  return (
    <div className="aba-compras">
      <div className="filtros">
        <select><option>Pagamento</option></select>
        <select><option>Pedido</option></select>
        <select><option>Avaliação</option></select>
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option>Código do pedido</option>
        </select>
      </div>

      <div className="lista-compras">
        {comprasMock.map((compra, idx) => (
          <div className="card-compra" key={idx}>
            <div className="cabecalho">Compra <span className="id">{compra.id}</span></div>
            <div className="produto">
              <span>1x</span>
              <span className="nome-produto">{compra.produto}</span>
              <span>R$ {compra.preco.toFixed(2)}</span>
            </div>
            <div className="pagamento">
              <img src="https://via.placeholder.com/30" alt="Produto" />
              <span>Saldo P2Win - R$ {compra.preco.toFixed(2)}</span>
              <span className="aprovado">{compra.pagamento}</span>
            </div>
            <div className="rodape">
              <span>{compra.data} {compra.hora} | Total: <strong>R$ {compra.preco.toFixed(2)}</strong></span>
              <span className={`status ${compra.status === "Entregue" ? "verde" : "amarelo"}`}>
                {compra.status}
              </span>
              <button className="ver-pedido">Ver pedido</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Compras;
