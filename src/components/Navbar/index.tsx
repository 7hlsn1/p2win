import styles from './Navbar.module.scss';

function Navbar() {
    return (
        <header className={styles.navbar}>
            <div className={styles.logo}>GGMAX</div>
            <input type="text" placeholder="🔍 Moby" className={styles.search} />
            <nav>
                <a href="#">Categorias</a>
                <a href="#">Blog</a>
                <button className={styles.button}>Anunciar</button>
            </nav>
        </header>
    );
}

export default Navbar;
