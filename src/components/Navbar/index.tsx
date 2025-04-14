import styles from './Navbar.module.scss';
import { FaBell, FaShoppingCart } from 'react-icons/fa';
import { SearchBar } from './Sub-components/SearchBar';
import { UserDropdown } from './Sub-components/UserDropdown';
import { NavLinks } from './Sub-components/NavLink';
import { IconButton } from './Sub-components/IconButton';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <header className={styles.navbar}>
<<<<<<< HEAD
            <Link to="/" className={styles.logo}>GGMAX</Link>
=======
            <Link to="/" className={styles.logo}>P2WIN</Link>
>>>>>>> e133fe0eb1cb9c15e8a0238cbb2b89cb79bdc71f
            <SearchBar />

            <div className={styles.rightArea}>
                <NavLinks />

                <div className={styles.iconGroup}>
                    <IconButton icon={FaBell} />
                    <IconButton icon={FaShoppingCart} />
                    <UserDropdown />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
