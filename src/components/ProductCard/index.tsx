import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import moment from 'moment';

function ProductCard({ id, title, image, description, price, created_at, user, user_id, status }: any) {
    console.log(user)
    {/* <div className='product'>
                                    <Link to={`/produtos/${product.id}`}>
                                        <h4>{product.title}</h4>
                                    </Link>
                                    <div className="banner" style={{ backgroundImage: `url("${import.meta.env.VITE_API_URL}${product.banner}")` }}>
                                    </div>
                                    <span className='description'>
                                        {product.description}
                                    </span>
                                    <span className="price">
                                        R$ {product.price}
                                    </span>
                                    <span>{moment(product.created_at).format('DD/MM/Y')}</span>
                                    <span>{['Aguardando aprovação', 'Aprovado', 'Vendido', 'Reprovado'][product.status]}</span>
                                </div> */}

    return (

        <div className={styles.card}>
            <Link to={`/produtos/${id}`}>
                <h4 className={styles.title}>{title}</h4>
            </Link>

            <img src={image.startsWith('http') ? image : import.meta.env.VITE_API_URL + image} alt={'Carregando imagem...'} />
            <span>{description}</span>
            <span className="price">
                R$ {price}
            </span>
            <span className={styles.date}>{moment(created_at).format('DD/MM/Y')}</span>
            <span>{['Aguardando aprovação', 'Aprovado', 'Vendido', 'Reprovado'][status]}</span>

            {
                user ?
                    <span className={styles.user}>
                        <span style={{ opacity: .8, marginRight: '4px', fontSize: 'small' }}>Por:</span>
                        <Link to={`/usuarios/${user_id}`} className={styles.link}>
                            {user}
                        </Link>
                    </span>
                    : <></>
            }
        </div>

    );
}

export default ProductCard;
