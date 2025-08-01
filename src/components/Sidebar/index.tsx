import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import { Api, TLoader } from '../../skds/api';

const Sidebar = () => {

    const [profile, setProfile] = useState<any>({})
    const api = new Api('closed');
    useEffect(() => {
        TLoader.tLoader(1)
        api.getLoggedUser().then(data => {
            setProfile(data)

            TLoader.tLoader(0)
        })
    }, [])
    const handleLogout = () => {
        TLoader.tLoader(1)
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
                                    <li>Pedidos realizados</li>
                                </NavLink>
                                <NavLink to="/minha-conta/vendas" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Pedidos recebidos</li>
                                </NavLink>



                                {/* <li className={styles.sectionTitle}>CONFIGURAÇÕES</li>

                                <NavLink to="/minha-conta/minha-conta" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Minha conta</li>
                                </NavLink>
                                <NavLink to="/minha-conta/meus-dados" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Meus dados</li>
                                </NavLink> */}



                                <NavLink to="/" className={styles.link}>
                                    <li className={styles.logout} onClick={handleLogout}>Sair</li>
                                </NavLink>
                            </ul>
                        </nav>
                    )
                    : profile.role == 'admin' ? (
                        <nav>
                            <ul>

                                <li className={styles.sectionTitle}>Gerenciamento</li>

                                <NavLink to="/admin/usuarios" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Usuários</li>
                                </NavLink>
                                <NavLink to="/admin/verificacao" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Verificação de contas</li>
                                </NavLink>
                                <NavLink to="/admin/transacoes" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Transações</li>
                                </NavLink>
                                <NavLink to="/admin/anuncios" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Anúncios</li>
                                </NavLink>
                                <NavLink to="/admin/pedidos" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                                    <li>Pedidos</li>
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
