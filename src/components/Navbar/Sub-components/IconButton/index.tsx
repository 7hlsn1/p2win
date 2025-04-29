import { IconType } from 'react-icons';
import styles from './IconButton.module.scss';

interface IconButtonProps {
    icon: IconType;
    color: string;
    onClick?: () => void;
}

export function IconButton({ icon: Icon, onClick, color }: IconButtonProps) {
    return (
        <button className={styles.iconButton} onClick={onClick}>
            <Icon style={{ color: color }} />
        </button>
    );
}