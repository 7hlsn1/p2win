import styles from './Navbar.module.scss';
import { FaBell, FaShoppingCart } from 'react-icons/fa';
import { SearchBar } from './Sub-components/SearchBar';
import { UserDropdown } from './Sub-components/UserDropdown';
 
import { IconButton } from './Sub-components/IconButton';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


interface Props {
    profile: boolean;
}

const Navbar: React.FC<Props> = ({ profile }: any) => {
    const [ext, setExt] = useState('png');

    return (
        <header className={styles.navbar}>
            <Link to="/" className={styles.logo} onMouseEnter={() => {
                setExt('gif')
                setTimeout(() => {
                    setExt('png')
                }, 1000)
            }} onMouseLeave={() => { setExt('png') }} >
                <img src={'/assets/logo.' + ext} alt="Logo" className={styles.logoImage} />
                <h1 style={{ color: '#cb2d2b' }}>P2WIN</h1>
            </Link>

            <SearchBar />
            {profile ? <b style={{ marginRight: '1em' }}>{profile.username} <span className="badge success" style={{color:'white'}}>R$ {profile.wallet}</span></b> : null}
            <div className={styles.rightArea}>
                <nav className={styles.navLinks}>


                    <Link to="/categorias">Categorias</Link>
                    {/* <a href="#">Blog</a> */}


                    {
                        profile?.role == 'admin' ?
                            <Link to={'/admin/anuncios'}>
                                <button className={styles.button}>Painel de administração</button>
                            </Link> :

                            <Link to={profile ? '/anunciar' : '/login'}>
                                <button className={styles.button}>Anunciar</button>
                            </Link>

                    }
                </nav>
                <div className={`${styles.iconGroup} ${styles.desktopOnly}`}>
                    <IconButton icon={FaBell} color='black' />
                    <Link to="/carrinho">
                        <IconButton color='black' icon={FaShoppingCart} />
                    </Link>
                    <UserDropdown />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
