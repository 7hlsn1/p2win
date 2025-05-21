import { useState, useRef, useEffect, ReactNode } from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import styles from './UserDropdown.module.scss';
import { Api, TLoader } from '../../../../skds/api';
import { FaCartArrowDown } from 'react-icons/fa6';
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
        TLoader.tLoader(1)
        api.logout().then(() => {
            document.location.href = '/'
        })
    }
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const toggleMenu = () => setMenuOpen(prev => !prev);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // console.log('target')
            // console.log(event.target)
            // console.log('buttonRef')
            // console.log(buttonRef.current)
            // console.log('dropdownRef')
            // console.log(dropdownRef.current)
            
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

        <>
            <button onClick={() => {
                if (menuOpen) {
                    setMenuOpen(false)
                } else {
                    setMenuOpen(true)
                }
            }} ref={buttonRef} className={styles.menuIcon} aria-label="Abrir menu do usuário" aria-expanded={menuOpen}>
                <FaBars />
            </button>

            <div className={styles.profileArea} ref={dropdownRef}  >


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
                                    <Link to='/carrinho' >Carrinho</Link>

                                </>)
                    }
                    <a style={{ color: 'red' }} onClick={handleLogout}>Sair</a>
                    {children}

                </div >
            </div >
        </>
    ) : (
        <div className={styles.profileArea} ref={dropdownRef} >
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
