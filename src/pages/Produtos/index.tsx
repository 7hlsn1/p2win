import styles from './Produto.module.scss';
import { Api } from '../../skds/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const api = new Api('closed')
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

function Produto() {
    const { id } = useParams();
    if (!id) {
        return (
            <div className={styles.container}>

                Produto não encontrado
            </div>
        );
    }
    const [product, setProduct] = useState<any>({})
    useEffect(() => {
        api.getProduct(parseInt(id.toString())).then((data: any) => {
            setProduct(data)
            console.log(data.user)
        })
    }, [])
    return (
        product.title ?
            (
                <div className={styles.productWrapper}>
                    <div className={styles.productContainer}>
                        Categorias &gt;
                        <Link to={`/produtos?category_id=${product.category_id}`} style={{color:'#0086c8'}}>
                            <h2>{product.category}</h2>

                        </Link>
                        <h3>{product.title}</h3>
                        <img src={import.meta.env.VITE_API_URL + product.banner}></img>
                        <div className={styles.description}>
                            {product.description}
                        </div>
                        {product.images ? (product.images.map((image: any) => { <img src={image.image} alt="" /> })) : <></>}
                        <span style={{ fontSize: 'small' }}>Publicado em</span> <span style={{ opacity: 0.7 }}>{moment(product.created_at).locale('pt-br').format('ddd, D MMMM, Y - H:m\\h')}</span><br />
                        <span style={{ fontSize: 'small' }}>Por</span> <Link to={`/usuarios/${product.user_id}`}> <span style={{ opacity: 0.7 }}>{product.user.username}</span></Link>
                        <button>Comprar</button>
                    </div>
                    <div className={styles.sellerContainer}>
                        <h3>Vendedor</h3>
                        <Link to={`/usuarios/${product.user_id}`}  >

                            <img className={styles.avatar} style={{ backgroundImage: 'url("https://static.vecteezy.com/ti/vetor-gratis/p1/11483813-avatar-de-anime-de-cara-gratis-vetor.jpg")' }} ></img>
                            <br />
                            <span>
                                {product.user.username}
                            </span>
                        </Link>
                        <span>
                            <span style={{ opacity: 0.5 }}>Registrado em</span><br />
                            <span>{moment(product.user.created_at).format('ddd, D MMMM, Y')}</span>
                        </span>
                        <h3>Avaliações</h3>
                        {
                            product.user.rates ? (
                                <div className={styles.rates}>
                                    {
                                        product.user.rates.map((rate: any) => (
                                            <div className={styles.rate}>

                                                <span>
                                                    <div className={styles.avatar} style={{ backgroundImage: 'url("https://static.vecteezy.com/ti/vetor-gratis/p1/11483813-avatar-de-anime-de-cara-gratis-vetor.jpg")' }}>

                                                    </div>
                                                    <span className={styles.user}>{rate.user}</span><br />
                                                    <span><span style={{ opacity: 0.5, fontSize: 'small' }}>Produto:</span>
                                                        <br />
                                                        <span style={{ fontSize: 'small' }}>{rate.product}</span></span>
                                                    <span className={styles.avaliation}>{
                                                        [...Array(rate.avaliation)].map(() => (
                                                            <FaStar color='yellow' />
                                                        ))
                                                    }</span>
                                                </span>

                                                <span className={styles.content}>
                                                    {rate.content}
                                                </span>
                                                <span className={styles.date}>{moment(rate.created_at).format('ddd, D MMMM, Y')}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : <></>

                        }

                    </div>
                </div>
            )
            : <></>

    );
}

export default Produto;
