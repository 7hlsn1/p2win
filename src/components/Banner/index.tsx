import styles from './Banner.module.scss';
import '../../pages/Usuario/MinhaConta.scss'

import GameCard from '../GameCard';
import ProductCard from '../ProductCard';
import { useEffect, useState } from 'react';

import { Api } from '../../skds/api';
import SellerCard from '../SellerCard';

const api = new Api('open')
function Banner() {
    const [categories, setCategories] = useState<any>([])
    const [products, setProducts] = useState<any>([])
    const [sellers, setSellers] = useState<any>([])

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

        <section className={styles.banner}>
            <img className={styles.banners} alt="" style={{ backgroundImage: `url('/assets/banner02.png')` }} />
            <h4>Vendedores em destaque</h4>
            <div className='products'>
                {sellers.map((seller_: any) => (
                    <SellerCard seller={seller_} />
                ))}
            </div>
            <h2>Produtos em destaque</h2>

            <br />
            <div className="products">

                {
                    products?.map((product: any) => {
                        return (

                            <ProductCard product={product} />


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
