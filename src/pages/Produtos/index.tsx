import styles from './Produto.module.scss';
import { Api, TLoader } from '../../skds/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const api = new Api('closed')
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Slider from "react-slick";
import '../../../node_modules/slick-carousel/slick/slick.css'
import '../../../node_modules/slick-carousel/slick/slick-theme.css'

function Produto() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
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
        TLoader.tLoader(1)
        api.getProduct(parseInt(id.toString())).then((data: any) => {
            setProduct(data)
            TLoader.tLoader(0)
            // api.getLoggedUser().then(user => {
            //     setProfile(user)
            // })

        })
    }, [])

    const handleAddToCart = async () => {
        const currentCart = api.getCart()
        const ids = currentCart.map((i: any) => i.id)
        const sellerId = currentCart[0] 
        console.log('seller:')
         
        if (sellerId != currentCart[0].seller_id) {
            return Swal.fire({
                icon: 'warning',
                text: 'Você só pode adicionar produtos de um vendedor por pedido'
            })
        }
        if (ids.includes(product.id)) {
            return Swal.fire({
                icon: 'info',
                text: 'Produto já adicionado ao carrinho',
                showCancelButton: true,
                cancelButtonText: 'Ir para o carrinho',
                cancelButtonColor: 'green',
            }).then((res: any) => {
                if (res.dismiss == 'cancel') {
                    document.location.href = '/carrinho'
                }
            })
        } else {
            api.addToCart(product.id).then(() => {
                Swal.fire({
                    icon: 'success',
                    text: 'Adicionado ao carrinho',
                    showCancelButton: true,
                    cancelButtonText: 'Ir para o carrinho',
                    cancelButtonColor: 'green',
                }).then((res: any) => {
                    if (res.dismiss == 'cancel') {
                        document.location.href = '/carrinho'
                    }
                })
            })
        }
    }


    return (
        product.title ?
            (
                <div className={styles.productWrapper}>
                    <div className={styles.productContainer}>
                        <Link style={{ color: 'rgb(0, 134, 200)', display: 'inline' }} to='/categorias'>
                            Categorias <span>&gt;</span></Link>
                        <Link to={`/produtos?category_id=${product.category_id}`} style={{ color: '#0086c8' }}>
                            <h2>{product.category}</h2>

                        </Link>
                        <h3>{product.title}</h3>

                        <div className={styles.description}>
                            {product.description}
                        </div>
                        <div>
                            R$ <b>{product.price}</b>
                        </div>
                        <div className={styles.images}>
                            <Slider {...settings}  >
                                <div className={styles.imageWrapper}  >
                                    <div className={styles.image} style={{
                                        backgroundImage: `url('${product.banner.startsWith('http') ? product.banner : import.meta.env.VITE_API_URL + product.banner}')`
                                    }}>

                                    </div>


                                </div>
                                {product.images.length > 0 ? (product.images.map((image: any) => (
                                    <div className={styles.imageWrapper} key={image.id}>
                                        <div className={styles.image} key={image.id} style={{
                                            backgroundImage: `url('${import.meta.env.VITE_API_URL + image.file}')`
                                        }}>

                                        </div>


                                    </div>))) : <>Sem imagens</>}
                            </Slider>
                        </div>
                        <span style={{ fontSize: 'small' }}>Publicado em</span> <span style={{ opacity: 0.7 }}>{moment(product.created_at).locale('pt-br').format('ddd, D MMMM, Y - H:m\\h')}</span><br />
                        <span style={{ fontSize: 'small' }}>Por</span> <Link to={`/usuarios/${product.user_id}`}> <span style={{ opacity: 0.7 }}>{product.user.username}</span></Link>

                        <button onClick={handleAddToCart} className='success'>Adicionar ao carrinho</button>
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
                                            <div className={styles.rate} key={rate.id}>

                                                <span>
                                                    <div className={styles.avatar} style={{ backgroundImage: 'url("https://static.vecteezy.com/ti/vetor-gratis/p1/11483813-avatar-de-anime-de-cara-gratis-vetor.jpg")' }}>

                                                    </div>
                                                    <span className={styles.user}>{rate.user}</span><br />
                                                    <span><span style={{ opacity: 0.5, fontSize: 'small' }}>Produto:</span>
                                                        <br />
                                                        <span style={{ fontSize: 'small' }}>{rate.product}</span></span>
                                                    <span className={styles.avaliation}>{
                                                        [...Array(rate.avaliation)].map(() => (
                                                            <FaStar key={1} color='yellow' />
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
