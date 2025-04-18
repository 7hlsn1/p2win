import { IconType } from 'react-icons';
import styles from './IconButton.module.scss';

interface IconButtonProps {
    icon: IconType;
    onClick?: () => void;
}

export function IconButton({ icon: Icon, onClick }: IconButtonProps) {
    return (
        <button className={styles.iconButton} onClick={onClick}>
            <Icon style={{ color: 'white' }} />
        </button>
    );
}