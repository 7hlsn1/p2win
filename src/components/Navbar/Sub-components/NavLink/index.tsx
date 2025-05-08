import styles from './NavLinks.module.scss';
import { Link } from 'react-router-dom';

export function NavLinks(props: any) {
  console.log('NavLinks')
  console.log(props)
  return (
    <nav className={styles.navLinks}>
      {props.profile ? <b>{props.profile.username}</b> : null}

      <Link to="/categorias">Categorias</Link>
      {/* <a href="#">Blog</a> */}


      {
        props.profile?.role == 'admin' ?
          <Link to={'/admin/anuncios'}>
            <button className={styles.button}>Painel de administração</button>
          </Link> :

          <Link to={props.profile ? '/anunciar' : '/login'}>
            <button className={styles.button}>Anunciar</button>
          </Link>

      }
    </nav>
  );
}
