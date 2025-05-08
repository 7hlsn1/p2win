import styles from './Banner.module.scss';
import '../../pages/Usuario/MinhaConta.scss'

import GameCard from '../GameCard';
import ProductCard from '../ProductCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Api } from '../../skds/api';
import SellerCard from '../SellerCard';
import Slider from 'react-slick';
import '../../../node_modules/slick-carousel/slick/slick.css'
import '../../../node_modules/slick-carousel/slick/slick-theme.css'


const api = new Api('open')
function Banner(props: any) {
    const userProfile = props.userProfile
    const [categories, setCategories] = useState<any>([])
    const [products, setProducts] = useState<any>([])
    const [sellers, setSellers] = useState<any>([])

    const settings = {
        dots: true,
        buttons: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    useEffect(() => {

        api.getSellers().then(data => {
            setSellers(data)
            console.log(data)
        })
        api.getCategories('', 6).then((data) => {
            setCategories(data)
        })
        api.getProducts().then(data => {
            setProducts(data)

        })
    }, [])


    return (

        <section className={styles.banner} >
            <Slider {...settings} >
                <div className={styles.slide}>
                    <Link to='/produtos?category_id=78'>
                        <img src={'https://i.redd.it/gw4h3begfrc81.jpg'} />
                    </Link>
                </div>
                <div className={styles.slide}>
                    <Link to='/produtos?category_id=129'>
                        <img src={'/assets/banner02.png'} />
                    </Link>
                </div>
            </Slider>
            <h4>Vendedores em destaque</h4>
            <div className='sellers'>
                {sellers.map((seller_: any) => (
                    <SellerCard seller={seller_} key={seller_.id} />
                ))}
            </div>
            {products.length > 0 ? <>

                <h4>Produtos em destaque</h4>
                <br />
                <div className="products">

                    {
                        products.map((product_: any) => {
                            return (

                                <ProductCard product={product_} key={product_.id}
                                    buy={product_.user_id != userProfile?.id}
                                />


                            )
                        })
                    }
                </div>
            </> : <h4 style={{ color: 'red', opacity: .5, background: 'rgba(106, 106, 106, 0.13)', padding: '1em' }}>Infelizmente não temos nenhum anúncio disponível no momento </h4>}


            <h4>Categorias Populares</h4>
            <div className={styles.cards}>
                {
                    categories.map((category: any) =>
                        <GameCard key={category.id} id={category.id} title={category.name} image={category.image} count={category.products} />
                    )
                }

            </div>
        </section>
    );
}

export default Banner;
