import styles from './GameCard.module.scss';

interface GameCardProps {
    title: string;
    image: string;
}

function GameCard({ title, image }: GameCardProps) {
    return (
        <div className={styles.card}>
            <img src={image} alt={title} />
            <span>{title}</span>
        </div>
    );
}

export default GameCard;
