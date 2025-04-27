import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import { Api } from '../../skds/api';

const Sidebar = () => {
    const [adminOpen, setAdminOpen] = useState(false);
    const [profile, setProfile] = useState<any>({})
    const api = new Api('closed');
    useEffect(() => {
        api.getLoggedUser().then(data => {
            setProfile(data)
            console.log(data)
        })
    }, [])
    const handleLogout = () => {
        api.logout().then(() => {
            document.location.href = '/';
        });
    };

    return (
        <aside className={styles.sidebar}>
            {
                profile.role == 'user' ?
                    (
                        <nav>
                            <ul>
                                <NavLink to="/minha-conta" end className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Resumo</li>
                                </NavLink>
                                <NavLink to="/minha-conta/transacoes" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Transações</li>
                                </NavLink>
                                <NavLink to="/minha-conta/anuncios" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Meus anúncios</li>
                                </NavLink>
                                <NavLink to="/minha-conta/compras" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Minhas compras</li>
                                </NavLink>
                                <NavLink to="/minha-conta/vendas" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Minhas vendas</li>
                                </NavLink>
                                <NavLink to="/minha-conta/minhas-perguntas" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Minhas perguntas</li>
                                </NavLink>
                                <NavLink to="/minha-conta/perguntas-recebidas" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Perguntas recebidas</li>
                                </NavLink>
                                <NavLink to="/minha-conta/retiradas" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Minhas retiradas</li>
                                </NavLink>
                                <NavLink to="/minha-conta/recargas" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Recargas</li>
                                </NavLink>

                                <li className={styles.sectionTitle}>CONFIGURAÇÕES</li>

                                <NavLink to="/minha-conta/minha-conta" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Minha conta</li>
                                </NavLink>
                                <NavLink to="/minha-conta/meus-dados" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Meus dados</li>
                                </NavLink>
                                <NavLink to="/minha-conta/verificacoes" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Verificações</li>
                                </NavLink>
                                <NavLink to="/minha-conta/seguranca" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Segurança</li>
                                </NavLink>
                                <NavLink to="/minha-conta/notificacoes" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Notificações</li>
                                </NavLink>

                                <div>
                                    <li
                                        className={`${styles.link} ${styles.dropdownToggle}`}
                                        onClick={() => setAdminOpen(!adminOpen)}
                                    >
                                        Administração ▾
                                    </li>
                                    {adminOpen && (
                                        <ul className={styles.dropdownMenu}>
                                            <NavLink
                                                to="/minha-conta/administracao/adminusuarios"
                                                className={({ isActive }) =>
                                                    `${styles.link} ${isActive ? styles.active : ''}`
                                                }
                                            >
                                                <li>Listar Usuários</li>
                                            </NavLink>
                                            <NavLink
                                                to="/minha-conta/administracao/admintransacoes"
                                                className={({ isActive }) =>
                                                    `${styles.link} ${isActive ? styles.active : ''}`
                                                }
                                            >
                                                <li>Listar Transações</li>
                                            </NavLink>
                                        </ul>
                                    )}
                                </div>

                                <NavLink to="/" className={styles.link}>
                                    <li className={styles.logout} onClick={handleLogout}>Sair</li>
                                </NavLink>
                            </ul>
                        </nav>
                    )
                    : profile.role == 'admin' ? (
                        <nav>
                            <ul>
                                <NavLink to="/minha-conta" end className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Resumo</li>
                                </NavLink>
                                <NavLink to="/minha-conta/transacoes" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Transações</li>
                                </NavLink>
                                
                                <li className={styles.sectionTitle}>CONFIGURAÇÕES</li>

                                <NavLink to="/minha-conta/minha-conta" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Minha conta</li>
                                </NavLink>
                                <NavLink to="/minha-conta/meus-dados" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Meus dados</li>
                                </NavLink>
                                <NavLink to="/minha-conta/verificacoes" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Verificações</li>
                                </NavLink>
                                <NavLink to="/minha-conta/seguranca" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Segurança</li>
                                </NavLink>
                                <NavLink to="/minha-conta/notificacoes" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Notificações</li>
                                </NavLink>

                              
                                <NavLink to="/" className={styles.link}>
                                    <li className={styles.logout} onClick={handleLogout}>Sair</li>
                                </NavLink>
                            </ul>
                        </nav>
                    ) : <>Tipo de usuário inválido: {profile.role}</>
            }

        </aside>
    );
};

export default Sidebar;
