import { useState } from 'react';
import './Vendas.scss';

const vendasFake = [
    {
        codigo: '#6MM5OB2',
        statusPagamento: 'Pagamento Aprovado',
        statusEntrega: 'Entrega pendente',
        produto: 'SS Moby - R$7,99 / SSBM Phantom Megalodon / Fischl / O mais barato do mercado!',
        preco: 7.99,
        quantidade: 1,
        data: '26/03/25 12:27',
        comprador: 'Mael_king1'
    },
    {
        codigo: '#2OOK7QN',
        statusPagamento: 'Pagamento Aprovado',
        statusEntrega: 'Entregue',
        produto: 'SS Moby - R$7,99 / SSBM Phantom Megalodon / Fischl / O mais barato do mercado!',
        preco: 7.99,
        quantidade: 1,
        data: '26/03/25 12:27',
        comprador: 'ordeseeeeep'
    },
    {
        codigo: '#0RRKDXZ',
        statusPagamento: 'Pagamento Aprovado',
        statusEntrega: 'Entregue',
        produto: 'SS Moby - R$7,99 / SSBM Phantom Megalodon / Fischl / O mais barato do mercado!',
        preco: 7.99,
        quantidade: 1,
        data: '24/03/25 13:35',
        comprador: 'leocomputer'
    },
    {
        codigo: '#NKK6B8D',
        statusPagamento: 'Pagamento Aprovado',
        statusEntrega: 'Entregue',
        produto: 'SS Moby - R$7,99 / SSBM Phantom Megalodon / Fischl / O mais barato do mercado!',
        preco: 7.99,
        quantidade: 10,
        data: '24/03/25 13:14',
        comprador: 'Lillium'
    }
];

export default function Vendas() {
    const [filtroPagamento, setFiltroPagamento] = useState('Aprovados');
    const [filtroPedido, setFiltroPedido] = useState('Todos');
    const [filtroAvaliacao, setFiltroAvaliacao] = useState('Todas');
    const [ordenacao, setOrdenacao] = useState('Código da venda');

    return (
        <div className="vendas-container">
            <div className="selectcontainer">
                <div className="filtros">
                    <div className="filtro">
                        <label>Pagamento</label>
                        <select value={filtroPagamento} onChange={e => setFiltroPagamento(e.target.value)}>
                            <option>Aprovados</option>
                            <option>Pendentes</option>
                        </select>
                    </div>
                    <div className="filtro">
                        <label>Pedido</label>
                        <select value={filtroPedido} onChange={e => setFiltroPedido(e.target.value)}>
                            <option>Todos</option>
                            <option>Entregues</option>
                        </select>
                    </div>
                    <div className="filtro">
                        <label>Avaliação</label>
                        <select value={filtroAvaliacao} onChange={e => setFiltroAvaliacao(e.target.value)}>
                            <option>Todas</option>
                        </select>
                    </div>
                    <div className="filtro">
                        <label>Ordenar por</label>
                        <select value={ordenacao} onChange={e => setOrdenacao(e.target.value)}>
                            <option>Código da venda</option>
                        </select>
                    </div>
                </div>
            </div>



            <div className="vendas-lista">
                {vendasFake.map((venda, index) => (
                    <div key={index} className="venda-item">
                        <div className="topo">
                            <span className="codigo">Venda {venda.codigo}</span>
                            <span className="status-pagamento">- {venda.statusPagamento}</span>
                        </div>
                        <div className="produto">
                            {venda.quantidade}x <a href="#">{venda.produto}</a> | R${venda.preco.toFixed(2)}
                        </div>
                        <div className="detalhes">
                            <span>Data: {venda.data}</span>
                            <span>Comprador: <strong>{venda.comprador}</strong></span>
                            <span>Subtotal: <strong>R${(venda.quantidade * venda.preco).toFixed(2)}</strong></span>
                            <span>Status: <strong>{venda.statusEntrega}</strong></span>
                        </div>
                        <button className="ver-pedido">Ver pedido</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
