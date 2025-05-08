import { Link } from 'react-router-dom';
import styles from './GameCard.module.scss';

interface GameCardProps {
    id: number;
    title: string;
    image: string;
    count: number;
}

function GameCard({ id, title, image, count }: GameCardProps) {
    return (
        <Link to={`/produtos?category_id=${id}`}>
            <div className={styles.card}>
                <img src={image} alt={title} />
                <span>{title}</span><br />
                <span style={{ opacity: .5 }}><span style={{ color: 'blue' }}>{count}</span> anúncio{count > 0 ? '' : 's'}</span>
            </div>

        </Link>
    );
}

export default GameCard;
