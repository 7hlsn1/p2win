import styles from './NavLinks.module.scss';
import { Link } from 'react-router-dom';

export function NavLinks() {
  return (
    <nav className={styles.navLinks}>
      <a href="#">Categorias</a>
      {/* <a href="#">Blog</a> */}
      <Link to="/anunciar">
        <button className={styles.button}>Anunciar</button>
      </Link>
    </nav>
  );
}
