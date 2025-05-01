import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import moment from 'moment';

function ProductCard(props: any) {
    const { id, title, banner, description, price, created_at, user, user_id, status, user_online = 0 } = props.product
    

    return (

        <div className={styles.card}>
            <Link to={`/produtos/${id}`}>
                <h4 className={styles.title}>{title}</h4>
            </Link>

            <img src={banner.startsWith('http') ? banner : import.meta.env.VITE_API_URL + banner} alt={'Carregando imagem...'} />
            <span>{description}</span>
            <span className="price">
                R$ {price}
            </span>
            <span className={styles.date}>{moment(created_at).format('DD/MM/Y')}</span>
            {/* <span>{['Aguardando aprovação', 'Aprovado', 'Vendido', 'Reprovado'][status]}</span> */}

            {
                user ?
                    <span className={styles.user}>
                        <span style={{ opacity: .8, marginRight: '4px', fontSize: 'small' }}>Por:</span>
                        <Link to={`/usuarios/${user_id}`} className={styles.link}>
                            {user}
                        </Link>
                        <span className={user_online == 1 ? styles.online : styles.offline}>

                            {/* {[<span>Offline</span >, <span>Online</span >][user_online]} */}

                        </span>
                    </span>
                    : <></>

            }
        </div>

    );
}

export default ProductCard;
