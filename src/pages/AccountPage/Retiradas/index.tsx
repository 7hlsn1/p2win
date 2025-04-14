import React from 'react';
import './Retiradas.scss';

const retiradasFake = [
  {
    valor: 659.31,
    status: 'Aprovado',
    chave: '171.675.837-82',
    tipo: 'Pessoa Física (Pix)',
    data: '13/11/24 18:15'
  },
  {
    valor: 415.00,
    status: 'Aprovado',
    chave: '171.675.837-82',
    tipo: 'Pessoa Física (Pix)',
    data: '30/08/24 07:32'
  },
  {
    valor: 1000.00,
    status: 'Aprovado',
    chave: '171.675.837-82',
    tipo: 'Pessoa Física (Pix)',
    data: '18/08/24 23:45'
  },
  {
    valor: 1000.00,
    status: 'Aprovado',
    chave: '171.675.837-82',
    tipo: 'Pessoa Física (Pix)',
    data: '11/08/24 19:11'
  }
];

export default function Retiradas() {
  const saldoDisponivel = 122.91;

  return (
    <div className="retiradas-container">
      <div className="topo-retirada">
        <div className="sacar">
          <label>Retire seu saldo</label>
          <input type="text" placeholder="Sacar dinheiro" disabled />
        </div>
        <div className="saldo">
          <span>Saldo Disponível</span>
          <strong>R$ {saldoDisponivel.toFixed(2)}</strong>
        </div>
      </div>

      <div className="lista-retiradas">
        {retiradasFake.map((r, index) => (
          <div key={index} className="retirada-item">
            <div className="info-principal">
              <span>
                Retirada para <a href="#">Chave: {r.chave} | {r.tipo} ⚡</a>
              </span>
              <span className="status aprovado">✔ {r.status}</span>
            </div>
            <div className="valores">
              <span className="valor">R$ {r.valor.toFixed(2)}</span>
              <span className="data">Solicitado em: {r.data}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
