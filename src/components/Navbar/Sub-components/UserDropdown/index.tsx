import { useState, useRef, useEffect } from 'react';
import { FaBars, FaUserCircle, FaMoon } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './UserDropdown.module.scss';

export function UserDropdown() {
    const [menuOpen, setMenuOpen] = useState(false);
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

    return (
        <div className={styles.profileArea} ref={dropdownRef}>
            <button onClick={toggleMenu} className={styles.menuIcon} aria-label="Abrir menu do usuário">
                <FaBars />
            </button>

            <div className={`${styles.dropdown} ${menuOpen ? styles.show : ''}`}>
                <div className={styles.user}>
                    <FaUserCircle size={24} />
                    <div>
                        <span>Olá, Gerente!</span>
                        <Link to="/minha-conta">Ver minha conta</Link>
                    </div>
                </div>
                <a href="#">Minhas Compras</a>
                <a href="#">Meus favoritos</a>
                <button className={styles.themeToggle}><FaMoon /> Tema claro</button>
            </div>
        </div>
    );
}
