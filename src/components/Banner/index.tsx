import styles from './Banner.module.scss';
import '../../pages/Usuario/MinhaConta.scss'

import GameCard from '../GameCard';
import ProductCard from '../ProductCard';
import { useEffect, useState } from 'react';

import { Api } from '../../skds/api';

const api = new Api('open')
function Banner() {
    const [categories, setCategories] = useState<any>([])
    const [products, setProducts] = useState<any>([])
    useEffect(() => {
        api.getCategories('', 8).then((data) => {
            setCategories(data)
        })
        api.getProducts().then(products_ => {
            setProducts(products_)

        })
    }, [])


    return (

        <section className={styles.banner}>
            <h2>Produtos em destaque</h2>

            <br />
            <div className="products">

                {
                    products?.map((product: any) => {
                        return (

                            <ProductCard image={product.banner} title={product.title} id={product.id} price={product.price} description={product.description} user={product.user} user_id={product.user_id} />


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
