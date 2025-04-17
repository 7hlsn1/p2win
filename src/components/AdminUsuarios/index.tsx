import { useState } from 'react';
import './AdminUsuarios.scss';

type Usuario = {
    id: number;
    nome: string;
    email: string;
};

const usuariosMock: Usuario[] = [
    { id: 1, nome: 'João Silva', email: 'joao@email.com' },
    { id: 2, nome: 'Maria Oliveira', email: 'maria@email.com' },
    { id: 3, nome: 'Carlos Souza', email: 'carlos@email.com' },
];

export default function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [listando, setListando] = useState(false);

    const listarUsuarios = () => {
        setUsuarios(usuariosMock);
        setListando(true);
    };

    const limparLista = () => {
        setUsuarios([]);
        setListando(false);
    };

    const excluirUsuario = (id: number) => {
        const novaLista = usuarios.filter((usuario) => usuario.id !== id);
        setUsuarios(novaLista);
    };

    return (
        <div className="admin-container">
            <h1>Admin - Usuários</h1>
            <div className="botoes">
                <button onClick={listarUsuarios} className="botao botao-listar">
                    Listar Usuários
                </button>
                <button onClick={limparLista} className="botao botao-limpar" disabled={!listando}>
                    Limpar Lista
                </button>
            </div>

            {usuarios.length > 0 && (
                <table className="tabela-usuarios">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
                                <td>
                                    <button
                                        className="botao-excluir"
                                        onClick={() => excluirUsuario(usuario.id)}
                                        title="Excluir usuário"
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
    );
}
