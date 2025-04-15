import styles from './Banner.module.scss';
import GameCard from '../GameCard';

import { Api } from '../../skds/api';
Api.type = 'open'

interface Category {
    id: number,
    name: string,
    image: string
}

const cats = (await Api.getCategories());
const categories: Category[] = cats;

function Banner() {
    return (

        <section className={styles.banner}>
            <h1><span>comprar e vender</span></h1>
            <p>contas, jogos, gift cards, gold, itens digitais e mais!</p>
            <button>Como funciona?</button>''

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
