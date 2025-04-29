import styles from './NavLinks.module.scss';
import { Link } from 'react-router-dom';

export function NavLinks(props: any) {
  return (
    <nav className={styles.navLinks}>
      <Link to="/categorias">Categorias</Link>
      {/* <a href="#">Blog</a> */}
      {props.admin == false ?
        <Link to={props.logged ? '/anunciar' : '/login'}>
          <button className={styles.button}>Anunciar</button>
        </Link>
        : <></>}

      {
        props.admin ?
          <Link to={'/admin/anuncios'}>
            <button className={styles.button}>Painel de administração</button>
          </Link> : <></>
      }
    </nav>
  );
}
