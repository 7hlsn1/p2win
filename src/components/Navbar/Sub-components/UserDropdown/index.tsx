import { useState, useRef, useEffect, ReactNode } from 'react';
import { FaBars, FaUserCircle, FaMoon } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import styles from './UserDropdown.module.scss';
import { Api, Profile } from '../../../../skds/api';
const api = new Api('closed')
interface UserDropdownProps {
    children?: ReactNode;
}

export function UserDropdown({ children }: UserDropdownProps) {
    const [adminOpen, setAdminOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [profile, setProfile] = useState<Profile | any>({})

    useEffect(() => {
        api.getLoggedUser().then((user: any) => {
            setProfile(user)
        })

    }, [])

    const handleLogout = () => {
        api.logout().then(() => {
            document.location.href = '/'
        })
    }
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setMenuOpen(prev => !prev);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    return profile.username ? (


        <div className={styles.profileArea} ref={dropdownRef}>
            <button onClick={toggleMenu} className={styles.menuIcon} aria-label="Abrir menu do usuário" aria-expanded={menuOpen}>
                <FaBars />
            </button>

            <div className={`${styles.dropdown} ${menuOpen ? styles.show : ''}`}>
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
                        </ul>
                    </nav>
                </aside>
                <div className={styles.user}>
                    <FaUserCircle size={24} />
                    <div>
                        <span>Olá, {profile.username}!</span>
                        <Link to={profile.role == 'admin' ? '/admin/usuarios' : '/minha-conta'}>{profile.role == 'admin' ? 'Painel de administração' : 'Ver minha conta'}</Link>
                    </div>
                </div>
                {
                    profile.role == 'admin' ?
                        (
                            <></>
                        ) :
                        (
                            <>
                                <a href="#">Minhas Compras</a>
                                <a href="#">Meus favoritos</a>

                            </>)
                }
                <a style={{ color: 'red' }} onClick={handleLogout}>Sair</a>
                {children}


                <button className={styles.themeToggle}>
                    <FaMoon /> Tema claro
                </button>
            </div >
        </div >
    ) : (
        <div className={styles.profileArea} ref={dropdownRef}>
            <button onClick={toggleMenu} className={styles.menuIcon} aria-label="Abrir menu do usuário">
                <FaBars />
            </button>

            <div className={`${styles.dropdown} ${menuOpen ? styles.show : ''}`}>

                <a href="/login">Entrar / Cadastrar</a>



                <button className={styles.themeToggle}>
                    <FaMoon /> Tema claro
                </button>
            </div>
        </div>
    );
}
