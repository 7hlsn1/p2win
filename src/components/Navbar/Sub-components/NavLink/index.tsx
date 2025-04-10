import styles from './NavLinks.module.scss';

export function NavLinks() {
    return (
        <nav className={styles.navLinks}>
            <a href="#">Categorias</a>
            <a href="#">Blog</a>
            <button className={styles.button}>Anunciar</button>
        </nav>
    );
}