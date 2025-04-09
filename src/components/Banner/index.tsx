import styles from './Banner.module.scss';
import GameCard from '../GameCard';

const games = [
    { title: 'ROBLOX', image: 'roblox.jpg' },
    { title: 'Throne and Liberty', image: 'throne.jpg' },
    { title: 'Genshin Impact', image: 'genshin.jpg' },
    { title: 'Fortnite', image: 'fortnite.jpg' },
    { title: 'League of Legends', image: 'lol.jpg' },
    { title: 'Valorant', image: 'valorant.jpg' },
    { title: 'Minecraft', image: 'minecraft.jpg' },
    { title: 'Free Fire', image: 'freefire.jpg' },
    { title: 'Clash of Clans', image: 'clash.jpg' },
];

function Banner() {
    return (
        <section className={styles.banner}>
            <h1><span>comprar e vender</span></h1>
            <p>contas, jogos, gift cards, gold, itens digitais e mais!</p>
            <button>Como funciona?</button>

            <h2>Categorias Populares</h2>
            <div className={styles.cards}>
                {games.map((game, i) => (
                    <GameCard key={i} title={game.title} image={`/assets/${game.image}`} />
                ))}
            </div>
        </section>
    );
}

export default Banner;
