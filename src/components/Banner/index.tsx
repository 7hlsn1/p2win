import styles from './Banner.module.scss';
import GameCard from '../GameCard';
import { useEffect, useState } from 'react';

import { Api, Category } from '../../skds/api';
const api = new Api('open')
function Banner() {
    const [categories, setCategories] = useState<Category | any>([])
    useEffect(() => {
        api.getCategories().then((data) => {
            setCategories(data)
        })
    }, [])


    return (

        <section className={styles.banner}>
            <h1><span>comprar e vender</span></h1>
            <p>contas, jogos, gift cards, gold, itens digitais e mais!</p>
            <button>Como funciona?</button>

            <h2>Categorias Populares</h2>
            <div className={styles.cards}>
                {
                    categories.map((category: Category) =>
                        <GameCard key={category.id} title={category.name} image={`${category.image}`} />
                    )
                }

            </div>
        </section>
    );
}

export default Banner;
