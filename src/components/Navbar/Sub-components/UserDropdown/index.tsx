import { useState, useRef, useEffect, ReactNode } from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import styles from './UserDropdown.module.scss';
import { Api } from '../../../../skds/api';
import { FaCartArrowDown, FaCartPlus } from 'react-icons/fa6';
const api = new Api('closed')
interface UserDropdownProps {
    children?: ReactNode;
}

export function UserDropdown({ children }: UserDropdownProps) {
 
    const [menuOpen, setMenuOpen] = useState(false);
    const [profile, setProfile] = useState<any>({})

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

    console.log(profile)
    return (profile && profile.username) ? (


        <div className={styles.profileArea} ref={dropdownRef}>
            <button onClick={toggleMenu} className={styles.menuIcon} aria-label="Abrir menu do usuário" aria-expanded={menuOpen}>
                <FaBars />
            </button>

            <div className={`${styles.dropdown} ${menuOpen ? styles.show : ''}`}>
                <aside className={styles.sidebar}>
                    <nav>
                        <ul>
                            {profile?.role == 'user' ?
                                <>
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
                                </>
                                :
                                // <div>
                                //     <li
                                //         className={`${styles.link} ${styles.dropdownToggle}`}
                                //         onClick={() => setAdminOpen(!adminOpen)}
                                //     >
                                //         Administração ▾
                                //     </li>
                                //     {adminOpen && (
                                //         <ul className={styles.dropdownMenu}>
                                //             <NavLink
                                //                 to="/admin/usuarios"
                                //                 className={({ isActive }) =>
                                //                     `${styles.link} ${isActive ? styles.active : ''}`
                                //                 }
                                //             >
                                //                 <li>Listar Usuários</li>
                                //             </NavLink>
                                //             <NavLink
                                //                 to="/admin/anuncios"
                                //                 className={({ isActive }) =>
                                //                     `${styles.link} ${isActive ? styles.active : ''}`
                                //                 }
                                //             >
                                //                 <li>Listar Anúncios</li>
                                //             </NavLink>
                                //         </ul>
                                //     )}
                                // </div>
                                null
                            }
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
                                <Link to='/minha-conta/compras'>Meus pedidos</Link>
                                <Link to='/minha-conta/favoritos'>Vendedores favoritos</Link>

                            </>)
                }
                <a style={{ color: 'red' }} onClick={handleLogout}>Sair</a>
                {children}

                {/* 
                <button className={styles.themeToggle}>
                    <FaMoon /> Tema claro
                </button> */}
            </div >
        </div >
    ) : (
        <div className={styles.profileArea} ref={dropdownRef}>
            <button onClick={toggleMenu} className={styles.menuIcon} aria-label="Abrir menu do usuário">
                <FaBars />
            </button>

            <div className={`${styles.dropdown} ${menuOpen ? styles.show : ''}`}>

                <Link to="/login" className='link'> <FaUserCircle /> Entrar / Cadastrar</Link>
                <Link to="/carrinho" className='link'> <FaCartArrowDown /> Ver carrinho</Link>



                {/* <button className={styles.themeToggle}>
                    <FaMoon /> Tema claro
                </button> */}
            </div>
        </div>
    );
}
