import { Link } from 'react-router-dom';
import styles from './GameCard.module.scss';

interface GameCardProps {
    id: number;
    title: string;
    image: string;
}

function GameCard({ id, title, image }: GameCardProps) {
    return (
        <Link to={`/produtos?category_id=${id}`}>
            <div className={styles.card}>
                <img src={image} alt={title} />
                <span>{title}</span>
            </div>
        </Link>
    );
}

export default GameCard;
