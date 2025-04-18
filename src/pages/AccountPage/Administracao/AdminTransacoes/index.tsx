import { useState } from 'react';
import './AdminTransacoes.scss';

type Transacao = {
    id: number;
    descricao: string;
    valor: number;
    data: string;
    tipo: 'entrada' | 'saida';
};

const transacoesMock: Transacao[] = [
    { id: 1, descricao: 'Venda de produto', valor: 150.5, data: '2023-05-15', tipo: 'entrada' },
    { id: 2, descricao: 'Compra de materiais', valor: 89.9, data: '2023-05-16', tipo: 'saida' },
    { id: 3, descricao: 'Assinatura mensal', valor: 29.9, data: '2023-05-17', tipo: 'entrada' },
];

export default function AdminTransacoes() {
    const [transacoes, setTransacoes] = useState<Transacao[]>([]);
    const [listando, setListando] = useState(false);

    const listarTransacoes = () => {
        setTransacoes(transacoesMock);
        setListando(true);
    };

    const limparLista = () => {
        setTransacoes([]);
        setListando(false);
    };

    const excluirTransacao = (id: number) => {
        const novaLista = transacoes.filter(transacao => transacao.id !== id);
        setTransacoes(novaLista);
    };

    const formatarMoeda = (valor: number) => {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    };

    const formatarData = (data: string) => {
        return new Date(data).toLocaleDateString('pt-BR');
    };

    return (
        <div className='mob'>
            <div className="admin-container">
                <h1>Admin - Transações</h1>
                <div className="botoes">
                    <button onClick={listarTransacoes} className="botao botao-listar">
                        Listar Transações
                    </button>
                    <button onClick={limparLista} className="botao botao-limpar" disabled={!listando}>
                        Limpar Lista
                    </button>
                </div>

                {transacoes.length > 0 && (
                    <table className="tabela-transacoes">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Descrição</th>
                                <th>Valor</th>
                                <th>Data</th>
                                <th>Tipo</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transacoes.map((transacao) => (
                                <tr key={transacao.id}>
                                    <td>{transacao.id}</td>
                                    <td>{transacao.descricao}</td>
                                    <td className={transacao.tipo}>{formatarMoeda(transacao.valor)}</td>
                                    <td>{formatarData(transacao.data)}</td>
                                    <td>
                                        <span className={`badge-${transacao.tipo}`}>
                                            {transacao.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="botao-excluir"
                                            onClick={() => excluirTransacao(transacao.id)}
                                            title="Excluir transação"
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
