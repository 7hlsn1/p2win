import styles from './Navbar.module.scss';
import { FaBell, FaShoppingCart } from 'react-icons/fa';
import { SearchBar } from './Sub-components/SearchBar';
import { UserDropdown } from './Sub-components/UserDropdown';
import { NavLinks } from './Sub-components/NavLink';
import { IconButton } from './Sub-components/IconButton';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


interface Props {
    logged: boolean;
    admin_: boolean;
}

const Navbar: React.FC<Props> = ({ logged, admin_ }: any) => {
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

            <div className={styles.rightArea}>
                <NavLinks logged={logged} admin={admin_} />
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
