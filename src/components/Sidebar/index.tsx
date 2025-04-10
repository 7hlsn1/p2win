import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';

const Sidebar = () => (
    <aside className={styles.sidebar}>
        <nav>
            <ul>
                <NavLink
                    to="/minha-conta"
                    end
                    className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                >
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

                <NavLink to="/" className={styles.link}>
                    <li className={styles.logout}>Sair</li>
                </NavLink>
            </ul>
        </nav>
    </aside>
);

export default Sidebar;
