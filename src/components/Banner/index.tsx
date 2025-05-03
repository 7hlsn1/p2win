import styles from './Banner.module.scss';
import '../../pages/Usuario/MinhaConta.scss'

import GameCard from '../GameCard';
import ProductCard from '../ProductCard';
import { useEffect, useState } from 'react';

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
        dots: false,
        buttons: false,
        infinite: false,
        speed: 500,
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
                <div>
                    <img src={'/assets/banner02.png'} style={{ width: '100%' }} />
                </div>
                <div>
                    <img src={'/assets/banner02.png'} style={{ width: '100%' }} />
                </div>
            </Slider>
            <h4 style={{ marginTop: '1em' }}>Vendedores em destaque</h4>
            <div className='products'>
                {sellers.map((seller_: any) => (
                    <SellerCard seller={seller_} key={seller_.id} />
                ))}
            </div>
            <h2>Produtos em destaque</h2>

            <br />
            <div className="products">

                {
                    products?.map((product_: any) => {
                        return (

                            <ProductCard product={product_} key={product_.id}
                                buy={product_.user_id != userProfile?.id}
                            />


                        )
                    })
                }
            </div>

            <h2>Categorias Populares</h2>
            <div className={styles.cards}>
                {
                    categories.map((category: any) =>
                        <GameCard key={category.id} id={category.id} title={category.name} image={`${category.image}`} />
                    )
                }

            </div>
        </section>
    );
}

export default Banner;
